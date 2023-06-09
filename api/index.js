import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import UserAuth from './utils/checkAuth.js'
import { addToCart, getMe, login, register } from './controllers/UserController.js'
import { createProduct, getAllProducts, getProductsByDay } from './controllers/ProductsController.js'
import cors from 'cors'

dotenv.config()

const MONGO = process.env.MONGO
console.log(MONGO, 'MONGO');

mongoose
    .connect(MONGO)
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB ERROR', err))

const app = express()

app.use(cors())

const PORT = process.env.PORT

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/auth/me', UserAuth, getMe)

app.post('/auth/login', login)

app.post('/auth/register', register)

app.post('/products', UserAuth, createProduct)

app.get('/products', getAllProducts)

app.post('/productByDay', getProductsByDay)

app.patch('/me/cart', UserAuth, addToCart)


app.listen(PORT, () => {
    console.log('Connected ' + PORT)
})



