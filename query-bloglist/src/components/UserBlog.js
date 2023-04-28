const UserBlog = ({ user }) => {

  return (
    <div>
      <h2>{user.username}</h2>
      <strong>added blogs</strong>
      {user.blogs.map((blog) => (
        <ul key={blog.id}>
          <li>{blog.title}</li>
        </ul>
      ))}
    </div>
  )
}

export default UserBlog
