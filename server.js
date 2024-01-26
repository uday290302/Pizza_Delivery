require('dotenv').config()
const express =require('express')
const app =express()
const ejs =require('ejs')
const expressLayout=require('express-ejs-layouts')
const path = require('path/win32')
const flash = require('express-flash')
const session = require('express-session')
const MongoDbStore = require('connect-mongo')
// const { flash2 } = require('express-flash-message');
const Emitter = require('events')
const PORT=process.env.PORT ||3000
const mongoose = require('mongoose')
const passport = require('passport')




//database connections
const url ='mongodb+srv://bkcrcb:Chaithanyabk10@cluster0.hkgesiy.mongodb.net/PDS';
mongoose.set('strictQuery', true)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}
,(err => {
    if(err){
        console.log(err)
    }
    else{
        console.log("successfully connected")
    }
}))

// Session config
app.use(session({
    secret: "process.env.COOKIE_SECRET",
    resave: false,
    store:  MongoDbStore.create({mongoUrl:url,collectionName:'sessions'}),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))
app.use(flash())

// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

//assets
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')


//session store
// let mongoStore =new MongoDbStore({ mongooseConnection: mongoose.connection,collection:"sessions"})



// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

require('./routes/web')(app)

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})
