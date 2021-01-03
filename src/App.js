import React from 'react'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Private } from './components/Private'

function App() {
  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route path='/signup' component={SignUp} />
              <Private exact path='/' component={Dashboard} />
              <Route path='/login' component={Login} />
              <Route path='/forgot' component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
