import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      {users.map(user =>
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link> blogs: {user.blogs.length}
        </div>
      )}
    </div>
  )
}

export default Users
