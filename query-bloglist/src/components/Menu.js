import { Link } from 'react-router-dom'

const Menu = ({ loginUser, handleLogout }) => {
  return (
    <div className='menu'>
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
      <span>{loginUser.username} logged in </span>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu
