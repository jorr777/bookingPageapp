import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Register from '../../components/Authentication/Register';
import { HOME_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import Login from '../../components/Authentication/Login';
import { useSelector } from 'react-redux';

const Auth = () => {
  const location = useLocation()
  const { authReducer } = useSelector(state => state)
  const navigate = useNavigate()

  return (
    <div>
      {authReducer.user.email ? navigate(HOME_ROUTE) : location.pathname === LOGIN_ROUTE ? <Login /> : <Register />}
    </div>
  )
}

export default Auth
