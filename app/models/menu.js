const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    Pizza_id:{ type: String, required: true },
    Pizza_name:{ type: String, required: true },
    cost: { type: Number, required: true },
    description: { type: String, required: true },
    ratings: { type: String, required: true },
    image: { type: String, required: true }
    
},{collection: 'Menu'})

module.exports = mongoose.model('Menu', menuSchema)