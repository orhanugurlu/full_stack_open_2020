import React from 'react'
import { Button, Jumbotron } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = ({ handleGoToBlogs }) => {

  return (
    <div className="content">
      <Jumbotron>
        <h1>Welcome to blog application!</h1>
        <p>
          This is an application to keep list of blog references. It is created in scope of exercises of <Link target="_blank" to="https://fullstackopen.com/en">Full Stack 2020</Link>.
        </p>
        <p>
          <Button variant="primary" onClick={handleGoToBlogs}>Click to see blogs</Button>
        </p>
      </Jumbotron>
    </div>
  )
}

export default Home