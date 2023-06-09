import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../models/User.js'
import TelegramBot from 'node-telegram-bot-api';



export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })

        if (!user) {
            return res.status(404).json({
                message: 'Пользватель не найден'
            })

        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPass) {
            return res.status(400).json({
                message: 'не верный логин или пароль'
            })
        }
        const token = jwt.sign({
            _id: user._id,
        },
            'secret2004', {
            expiresIn: '30d'
        })


        const { passwordHash, ...userData } = user._doc
        res.json({ ...userData, token })
    } catch (err) {
        res.status().json({
            message: err
        })
    }

}


export const register = async (req, res) => {

    try {


        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            password: req.body.password,
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        })
        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id,
        },
            'secret2004', {
            expiresIn: '30d'
        })


        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
        const chatId = process.env.CHAT_ID
        console.log(chatId);
        bot.sendMessage(chatId, `${req.body.fullName} is Registered yay` + req)

        const { passwordHash, ...userData } = user._doc
        res.json({ ...userData, token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'не удалось', err })
    }

}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        console.log(user);
        if (!user) {
            res.status(404).json({
                message: "Пользватель не найден"
            })
        }

        const token = jwt.sign({
            _id: user._id,
        },
            'secret2004', {
            expiresIn: '30d'
        })


        const { passwordHash, ...userData } = user._doc
        res.json({ ...userData, token })
    } catch (err) {
        res.status(404).json({
            message: err
        })
    }
}



export const addToCart = async (req, res) => {
    try {
        console.log(req.body);
        await UserModel.findOneAndUpdate(
            { _id: req.userId },
            { $push: { orders: req.body } }
        )

        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
        const chatId = process.env.CHAT_ID
        bot.sendMessage(chatId, `${req.body.fullName} added product ${req.body.orderName} price ${req.body.price}`)

        res.json({
            success: true,
        })
    } catch (err) {
        res.status(404).json({
            message: 'errorororororor'
        })
    }
}



