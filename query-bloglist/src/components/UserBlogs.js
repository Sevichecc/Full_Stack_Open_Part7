import { useQuery } from 'react-query'
import { getUsers } from '../services/user'

const UserBlogs = () => {
  const result = useQuery('users', getUsers, {
    refetchOnWindowFocus: false,
  })

  const users = result.data
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
                <td>{user.username}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserBlogs
