/* eslint-disable linebreak-style */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import PropTypes from 'prop-types';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,

}) => {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
                username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
                password
          <input
            type="password"
            value={password}
            id="password"
            name="Password"
            onChange={handlePasswordChange}/>
        </div>
        <button type='submit' id='login-btn'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm