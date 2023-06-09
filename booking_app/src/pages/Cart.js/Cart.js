import React from 'react'
import { useSelector } from 'react-redux'
import './Cart.css'
const Cart = () => {
    const { user } = useSelector(state => state.authReducer)

    return (
        <div>
            <h1>User : {user.fullName}</h1>
            <div className='orders'>
                <p>Your Orders</p>
                {user?.orders.map(el =>
                    <div key={Math.random()} className='cartItem'>
                        <p>
                            Product Name : {el.orderName}
                        </p>
                        <p>Price : {el.price}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
