import React, { useState } from 'react'
import './Auth.css'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../utils/consts'
import { Button, TextField } from '@mui/material'

const Register = () => {
    const navigate = useNavigate()
    const [registerDate, setRegisterDate] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: ''
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
        axios.post('http://localhost:5000/auth/register', {
            ...registerDate
        }).then(res => {
            console.log(LOGIN_ROUTE);
            navigate(LOGIN_ROUTE)
        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <form className='Authentication' onSubmit={registerSubmit}>
            <div className='Auth'>
                <TextField label='Full Name' sx={{ width: 1, p: '10px 0' }} variant="outlined" value={registerDate.fullName} onChange={(e) => onChange(e, 'fullName')} placeholder='full name' />
                <TextField label='Email' sx={{ width: 1, p: '10px 0' }} variant="outlined" value={registerDate.email} onChange={(e) => onChange(e, 'email')} placeholder='email' />
                <TextField label='password' sx={{ width: 1, p: '10px 0' }} type="password" value={registerDate.password} onChange={(e) => onChange(e, 'password')} placeholder={'Create Password'} />
                <TextField label='number' sx={{ width: 1, p: '10px 0' }} type="number" value={registerDate.phoneNumber} onChange={(e) => onChange(e, 'phoneNumber')} placeholder='Enter your Phone Number' />
                <p style={{color:'red'}}>{validError}</p>
                {/* {submited ? } */}
                <Button variant="outlined" sx={{ p: '10px', mt:'10px' }} type='submit'>submit</Button>
            </div>
        </form>
    )
}

export default Register

