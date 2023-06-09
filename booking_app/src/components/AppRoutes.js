import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { authorizedRoutes, publicRoutes } from '../routes'
import { useSelector } from 'react-redux'
import Error from './Error'
import { LOGIN_ROUTE } from '../utils/consts'

const AppRoutes = () => {

    const { user } = useSelector(state => state.authReducer)

    const location = useLocation()
    const navigate = useNavigate()


    return (
        <Routes>
            {user.fullName && authorizedRoutes.map(({ path, Element }) =>
                <Route key={path} path={path} element={<Element />} />
            )}
            {publicRoutes.map(({ path, Element }) =>
                <Route key={path} path={path} element={<Element />} />
            )}
            <Route path='/' element={<Navigate to={LOGIN_ROUTE} />} />
            <Route path='*' element={<Error />} />
        </Routes>
    )
}

export default AppRoutes

