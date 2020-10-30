require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
let JWT_SECRET = process.env.JWT_SECRET
let PASSWORD = process.env.PASSWORD

module.exports = {
  MONGODB_URI,
  JWT_SECRET,
  PASSWORD
}