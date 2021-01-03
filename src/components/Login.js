import React, { useRef, useState } from 'react'
import { Button, Form, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    try {
      setError('')
      setLoading(true)
      await login(email, password)
    } catch (err) {
      setError('Failed to Create user')
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Login</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
        </Card.Body>
      </Card>
      <Form onSubmit={handleSubmit}>
        <Form.Group id='email'>
          <Form.Label>Email: </Form.Label>
          <Form.Control type='email' ref={emailRef} required></Form.Control>
        </Form.Group>
        <Form.Group id='password'>
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type='password'
            ref={passwordRef}
            required
          ></Form.Control>
        </Form.Group>

        <Button type='submit' disabled={loading} className='w-100'>
          Submit
        </Button>
      </Form>
      <div className='w-100 text-center mt-2'>
        Want to create New one? <Link to='/signup'>Login</Link>
      </div>
    </>
  )
}

export default Login
