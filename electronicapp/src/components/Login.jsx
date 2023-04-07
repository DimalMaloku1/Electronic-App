import React from 'react'
import "./Login.css"

const Login = () => {
  return (
    
    <form>
        <h1>Login</h1>
        <input type="email" name="email" id="email" placeholder='Email...' />
        <input type="password" name="password" id="pw" placeholder='Password...'/>
        <button type="submit">Submit</button>

    </form>
  )
}

export default Login