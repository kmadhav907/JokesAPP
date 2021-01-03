import React, { useRef, useState } from 'react'
import { Button, Form, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useIsMounted } from '../context/UseIsMounted'

const ForgotPassword = () => {
  const emailRef = useRef()

  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const isMounted = useIsMounted()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value

    try {
      setError('')
      setMessage('')
      setLoading(true)
      await resetPassword(email).then((data) => {
        if (isMounted.current) {
          setMessage('Checkout your inbox for further instruction')
        }
      })
    } catch (err) {
      setError('Failed to send email')
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Password Reset</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
        </Card.Body>
      </Card>
      <Form onSubmit={handleSubmit}>
        <Form.Group id='email'>
          <Form.Label>Email: </Form.Label>
          <Form.Control type='email' ref={emailRef} required></Form.Control>
        </Form.Group>

        <Button type='submit' disabled={loading} className='w-100'>
          Submit
        </Button>
      </Form>
      <div className='w-100 text-center mt-2'>
        <Link to='/login'>Login</Link>
      </div>
      <div className='w-100 text-center mt-2'>
        Want to create New one? <Link to='/signup'>SignUP</Link>
      </div>
    </>
  )
}

export default ForgotPassword
