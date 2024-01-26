const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcrypt')
function authController() {
    const _getRedirectUrl = (req) => {
    
        return req.user.role === 'admin' ? '/admin/orders' : '/'
    }
    return {
        login(req, res) {
            return res.render('auth/login')
        },
        postLogin(req, res, next){
            passport.authenticate('local', (err, user, info) => {
                const {email,password}=req.body
                if (email=='' ||   password=='') {
                    req.flash('error','All fields are required')
                   
                    req.flash('email',email)
                
                    
                    return res.redirect('/login')
                    
                }
                if(err) {
                    req.flash('error', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('error', info.message ) 
                        return next(err)
                    }

                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)

        },
        register(req, res) {
            return res.render('auth/register')
        },
        async postRegister(req, res) {
            const {name,email,phone,address,password,role}=req.body
            if (name=='' || email=='' || phone=='' || address=='' ||  password=='') {
                req.flash('error','All fields are required')
                req.flash('name',name)
                req.flash('email',email)
                req.flash('phone',phone)
                req.flash('address',address)
                
                return res.redirect('/register')
                
            }
            User.exists({ email: email }, (err, result) => {
                if(result) {
                   req.flash('error', 'Email already taken')
                   req.flash('name', name)
                   req.flash('email', email) 
                   req.flash('phone',phone)
                   req.flash('address',address)
                   return res.redirect('/register')
                }
            })
             // Hash password 
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({
                name,
                email,
                phone,
                address,
                role,
                password: hashedPassword
            })
            

            user.save().then((user) => {
                // Login
                return res.redirect('/')
             }).catch(err => {
                req.flash('error', 'Something went wrong')
                    return res.redirect('/register')
             })
            
        },
        logout(req, res, next) {
            req.logout(function(err) {
              if (err) {
                return next(err);
              }
              return res.redirect('/')
            })
    }   }
}

module.exports = authController