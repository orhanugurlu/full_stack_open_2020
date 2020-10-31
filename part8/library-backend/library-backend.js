const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const config = require('./utils/config')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

console.log('Connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }  

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author : String, genre : String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    editUser(
      setFavoriteGenreTo: String
    ): User
    login(
      username: String!
      password: String!
    ): Token    
  }  

`
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      if (args.genre) {
        filter['genres'] = { $in: [args.genre] }
      }
      const books = await Book.find(filter).populate('author')
      return books
    },
    allAuthors: () => Author.find(),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author, bookCount: 1 })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } else {
        author.bookCount += 1
        await author.save()
      }

      let book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author
      })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    editUser: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated")
      }

      const user = await User.findOne({ username: currentUser.username })
      if (!user) {
        return null
      }

      user.favoriteGenre = args.setFavoriteGenreTo
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return user
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== config.PASSWORD) {
        throw new UserInputError("Wrong credentials")
      }

      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
