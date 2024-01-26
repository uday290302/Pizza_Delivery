const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bSchema = new Schema({
    branch_id:{ type: String, required: true },
    branch_name:{ type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    timings: { type: String, required: true }
    
},{collection: 'Branch'})

module.exports = mongoose.model('Branch', bSchema)