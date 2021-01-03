import React, { useRef, useState } from 'react'
import { Button, Form, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const SignUp = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const passwordConfirm = passwordConfirmRef.current.value
    if (password < 6 && passwordConfirm < 6) {
      setError('Paswoord Should be minimum 6 charachters')
    }
    if (password !== passwordConfirm) {
      return setError('Passwords Dont Match')
    } else {
      try {
        setError('')
        setLoading(true)
        await signup(email, password)
      } catch (err) {
        setError('Failed to Create user')
        console.log(err)
      }
      setLoading(false)
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>SignUP</h2>
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
        <Form.Group id='password-confirmation'>
          <Form.Label>Confirm Password: </Form.Label>
          <Form.Control
            type='password'
            ref={passwordConfirmRef}
            required
          ></Form.Control>
        </Form.Group>
        <Button type='submit' disabled={loading} className='w-100'>
          Submit
        </Button>
      </Form>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Login</Link>
      </div>
    </>
  )
}

export default SignUp
