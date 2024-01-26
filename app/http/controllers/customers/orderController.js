const Order = require('../../../models/order')
const Branch = require('../../../models/driver')
const moment = require('moment')
function orderController () {
    return {
        store(req, res) {
            const { phone, address,Branch} = req.body
            if(phone=='' ||   address=='' || Branch=='') {
                return res.status(422).json({ message : 'All fields are required' });
            }
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                total_cost:req.session.cart.totalPrice ,
                Branch,
                phone,
                address,
            })
            order.save().then(result=> {
                req.flash('success',"order placed successfully")
                delete req.session.cart
                return res.redirect('/customers/orders')
            }).catch((err) => {
                req.flash('error',"something went wrong")
                return res.redirect('/cart')
            })
        },
        async index(req, res) {
             const orders = await Order.find({ customerId: req.user._id },
                null,
                { sort: { 'createdAt': -1 } } )
                res.header('Cache-Control', 'no-store')
            
            
            res.render('customers/orders', { orders: orders,moment: moment})
            
             
        },
        async show(req, res) {
            const order = await Order.findById(req.params.id)
            // Authorize user
            if(req.user._id.toString() === order.customerId.toString()) {
                return res.render('customers/singleOrder', { order })
            }
            return  res.redirect('/')
        }   
    }
}

module.exports = orderController