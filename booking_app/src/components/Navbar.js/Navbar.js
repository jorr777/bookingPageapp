import React from 'react'
import './Navbar.css'
import { CART_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from '../../utils/consts'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../store/reducers/authReducer'



const Navbar = () => {

  const navigate = useNavigate()
  const { user } = useSelector(state => state.authReducer)
  const dispatch = useDispatch()


  const toNavigate = (to) => {
    navigate(to)
  }

  return (
    <div className='nav'>
      <ul>
        {user.fullName && <>
          <li> <a onClick={() => toNavigate(CART_ROUTE)} >CART</a></li>
          <li> <a onClick={() => toNavigate(HOME_ROUTE)} >HOME</a></li>
        </>}
      </ul>
      <div>
        {!user.fullName ? <>
          <a onClick={() => toNavigate(LOGIN_ROUTE)}>Sign In</a>
          <a onClick={() => toNavigate(REGISTER_ROUTE)}>Sign Up</a>
        </> : <a onClick={() => {
          dispatch(signOut())
          navigate(LOGIN_ROUTE)
        }}>Sign Out</a>}
      </div>

    </div>
  )
}

export default Navbar
