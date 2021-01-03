import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useIsMounted } from '../context/UseIsMounted'

const Dashboard = () => {
  const { currentUser, logout } = useAuth()
  const [error, setError] = useState('')
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
      </div>
    </>
  )
}

export default Dashboard
