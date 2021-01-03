import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useIsMounted } from '../context/UseIsMounted'
import axios from 'axios'

const Dashboard = () => {
  const { currentUser, logout } = useAuth()
  const [error, setError] = useState('')
  const [joke, setJoke] = useState('')

  const isMounted = useIsMounted()
  const history = useHistory()
  const handleLogout = async () => {
    setError('')
    try {
      await logout().then((data) => {
        if (isMounted.current) {
          history.push('/login')
        }
      })
    } catch (e) {
      setError('Failed to logout')
    }
  }
  const handleJoke = (e) => {
    e.preventDefault()
    setJoke('')

    axios({
      method: 'get',
      url: 'https://icanhazdadjoke.com/',

      headers: { Accept: 'text/plain' },
    }).then((response) => {
      console.log(response.data)
      setJoke(response.data)
    })
  }

  return (
    <>
      <Card>
        <h2>Profile</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <strong>Email: {currentUser.email}</strong>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link
          to='/update-profile'
          className='btn btn-primary w-100 text-center mt-2 '
        >
          Update
        </Link>
        <Button variant='link' onClick={handleLogout}>
          Logout
        </Button>
        <br />
        <br />
        <br />
        <Button variant='warning' onClick={handleJoke}>
          Click here for a joke!
        </Button>
        <br />
        <br />
        {joke ? (
          <Card>
            <Card.Title>Joke for you!</Card.Title>
            <Card.Body>{joke}</Card.Body>
          </Card>
        ) : null}
      </div>
    </>
  )
}

export default Dashboard
