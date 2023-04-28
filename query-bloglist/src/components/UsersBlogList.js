import { Link } from 'react-router-dom'

const UserBlogs = ({ users }) => {
  return (
    <div>
      <h2>User</h2>
      <table>
        <thead>
          <tr>
            <td>&nbsp;</td>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserBlogs
