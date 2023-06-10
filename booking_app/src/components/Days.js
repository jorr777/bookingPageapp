import React, { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addOnTheCart } from '../store/reducers/authReducer'
import { userProductsSlice } from '../store/reducers/userProductReducer'

const Days = () => {
    const [days, setDays] = useState([])
    const [products, setProducts] = useState([])
    const [selectedProducts, setSelecedProdcuts] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.authReducer)


    useEffect(() => {
        getTimeRemaining()
        getProduct(new Date())
    }, [])

    function getTimeRemaining() {
        const dateNow = new Date();
        const firstDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
        const lastDate = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0);

        const newDate = []

        for (let i = firstDate.getDate(); i <= lastDate.getDate(); i++) {
            const eachDayDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), i)
            const obj = { day: i, dateNow: eachDayDate }
            newDate.push({ ...obj })
        }
        setDays(newDate)

    }


    const getProduct = (date) => {
        console.log(date);
        axios.post('http://localhost:5000/productByDay', {
            day: date
        }).then(res => {
            setProducts(res.data);
        }).catch(err => {
            console.log(err);
        })

    }

    const selectUser = (select) => {

        const result = selectedProducts.filter(el => {
            if (el._id !== select._id) {
                return el
            }
        })

        if (result.length !== selectedProducts.length) {
            setSelecedProdcuts([...result])
        } else {
            setSelecedProdcuts((prev) => [...prev, { ...select }])
        }

    }

    const addToCart = () => {

        console.count();
        const config = {
            headers: { 'Authorization': 'Bearer ' + user.token }
        }
        selectedProducts.forEach((el, idx) => {
            const bodyParameters = {
                price: el.price,
                orderName: el.productName,
                fullName: user.fullName
            };
            axios.patch('http://localhost:5000/me/cart',
                bodyParameters,
                config
            ).then(res => {
                dispatch(addOnTheCart(bodyParameters))
                if (idx + 1 > selectedProducts - 1) {
                    setSelecedProdcuts([])
                }
            }).catch(err => {
                setError(err.message)
            })
        })
    }


    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div style={{ marginTop: '30px', width: '100%', scrollBehavior: 'true' }}>
            <p style={{ textAlign: 'center' }}>Current Month is Jun</p>
            <div className='days'>
                {days.map(el => {
                    return <p key={el.day} className='days_item' onClick={() => {
                        getProduct(el.dateNow);
                        setSelecedProdcuts([])
                    }}>{el.day}</p>
                }
                )}
            </div>
            <div className='products'>
                {products.map(el => {
                    return <div key={el.productName} className='product_item'>
                        <p>Name {el.productName}</p>
                        <p>Price is {el.price}</p>
                        <button type='text' onClick={(e) => {
                            if (e.target.innerHTML === 'Click to Select') {
                                e.target.innerHTML = 'Product Selected click to unselect'
                            } else {
                                e.target.innerHTML = 'Click to Select'
                            }
                            selectUser(el)
                        }} >Click to Select</button>
                    </div>
                })}
            </div>
            <button disabled={!selectedProducts.length ? true : false} onClick={() => {
                addToCart()
            }}>Continue</button>
        </div>
    )
}

export default Days
