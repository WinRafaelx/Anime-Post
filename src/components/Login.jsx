import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUserAuth } from '../context/AuthContext'
import Navbar from './Navbar'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const { logIn } = useUserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await logIn(email, password)
      navigate('/')
    } catch(err) {
      setError(err.message)
    }
  }

  return (
    <>
      <Navbar />
      <div style={{marginTop: "80px"}}>
        <span>Email</span>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <span>Password</span>
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  )
}

export default Login