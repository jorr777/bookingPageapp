import ProductModel from "../models/Product.js"



export const createProduct = async (req, res) => {

    try {

        const doc = new ProductModel({
            price: req.body.price,
            day: req.body.day,
            productName: req.body.productName,
            user: req.userId,
        })

        console.log(doc)

        const order = await doc.save()
        console.log(order);
        res.json({ ...order })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }


}


export const getAllProducts = async (req, res) => {

    try {
        const products = await ProductModel.find()

        res.json([...products])
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }

}


export const getProductsByDay = async (req, res) => {

    try {
        const products = await ProductModel.find()

        const newProducts = products.filter(el => {
            const firstDate = new Date(el.day)
            const secondDate = new Date(req.body.day)
            console.log(secondDate + '' , firstDate + '');
            if (secondDate + '' === firstDate + '') return el

        })

        res.json([...newProducts])
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }

}


