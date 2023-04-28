const BlogDetail = ({ blog }) => {
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        <span>{blog.likes} likes</span>
        <button>like</button>
      </p>
      <p>added by {blog.author}</p>
    </div>
  )
}

export default BlogDetail
