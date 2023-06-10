import React, { useState } from 'react'
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from '../../utils/consts'
import './Auth.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../store/reducers/ActionCreators'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [registerDate, setRegisterDate] = useState({
    email: '',
    password: '',
  })

  const [validError, setValidError] = useState()



  const onChange = (e, field) => {
    setRegisterDate({ ...registerDate, [field]: e.target.value })
  }

  const registerSubmit = (e) => {
    e.preventDefault()
    for (let key in registerDate) {
      if (registerDate[key] === '') {
        setValidError(`${key} Field isEmpty`)
        return
      }
    }
    dispatch(userLogin(registerDate))
    navigate(LOGIN_ROUTE)
  }

  return (
    <form className='Authentication' onSubmit={registerSubmit}>
      <div className='Auth'>
        <TextField label='Email' sx={{ width: 1, p: '10px 0' }} variant="outlined" value={registerDate.email} onChange={(e) => onChange(e, 'email')} placeholder='email' />
        <TextField label='Password' sx={{ width: 1, p: '10px 0' }} type='password' variant="outlined" value={registerDate.password} onChange={(e) => onChange(e, 'password')} />
        <Button variant="outlined" sx={{ p: '10px', m: '1px' }} type='submit'>submit</Button>
        <p style={{ color: 'red' }}>{validError}</p>
        <Button sx={{ p: '10px', m: '1px' }} onClick={() => {
          navigate(REGISTER_ROUTE)
        }}>To Register </Button>
      </div>
    </form>
  )
}

export default Login
