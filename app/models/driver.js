const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dSchema = new Schema({
    Driver_id:{ type: String, required: true },
    name:{ type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    rating: { type: String, required: true }
    
},{collection: 'driver'})

module.exports = mongoose.model('driver', dSchema)