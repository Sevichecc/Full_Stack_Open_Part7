import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
  password,
  username,
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type='text'
            id='username'
            value={username}
            name='Username'
            onChange={handleUsername}
          />
        </div>
        <div>
          password:
          <input
            type='text'
            id='password'
            value={password}
            name='Password'
            onChange={handlePassword}
          />
        </div>
        <button type='submit' id='login-button'>
          login
        </button>
      </form>
    </div>
  )
}

LoginForm.PropTyps = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
}

export default LoginForm
