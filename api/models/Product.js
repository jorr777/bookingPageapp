import mongoose from 'mongoose'


const ProductSchema = new mongoose.Schema({
    price: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
})



export default mongoose.model('Products', ProductSchema)