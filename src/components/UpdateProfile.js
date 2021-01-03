import React, { useRef, useState } from 'react'
import { Button, Form, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useIsMounted } from '../context/UseIsMounted'

const SignUp = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const passwordConfirm = passwordConfirmRef.current.value
    const promises = []

    if (password !== passwordConfirm) {
      return setError('Passwords Dont Match')
    } else {
      if (email !== currentUser.email) {
        promises.push(updateEmail(email))
      }
      if (password) {
        promises.push(updatePassword(password))
      }
      Promise.all(promises)
        .then(() => {
          if (isMounted.current) {
            history.push('/')
          }
        })
        .catch((err) => {
          setError('Cant Update the Profile')
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
        </Card.Body>
      </Card>
      <Form onSubmit={handleSubmit}>
        <Form.Group id='email'>
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type='email'
            ref={emailRef}
            required
            defaultValue={currentUser.email}
          ></Form.Control>
        </Form.Group>
        <Form.Group id='password'>
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type='password'
            ref={passwordRef}
            placeholder='Leave blank to keep the same'
          ></Form.Control>
        </Form.Group>
        <Form.Group id='password-confirmation'>
          <Form.Label>Confirm Password: </Form.Label>
          <Form.Control
            type='password'
            ref={passwordConfirmRef}
            placeholder='Leave blank to keep the same'
          ></Form.Control>
        </Form.Group>
        <Button type='submit' disabled={loading} className='w-100'>
          Submit
        </Button>
        <div className='w-100 text-center mt-2'>
          <Link to='/'>Cancel</Link>
        </div>
      </Form>
    </>
  )
}

export default SignUp
