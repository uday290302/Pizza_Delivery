const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
                },
    items: { type: Object, required: true },
    phone: { type: String, required: true},
    address: { type: String, required: true},
    Branch: { type: String,ref:'Branch'},
    status: { type: String, default: 'order_placed'},
    total_cost:{ type: Number, required: true}
}, { timestamps: true ,collection: 'orders'})

module.exports = mongoose.model('Order', orderSchema)