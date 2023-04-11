import express from 'express'
import ejs from 'ejs'
import fs from 'fs'
import mongoose from 'mongoose'
// import fileUpload from 'express-fileupload'
import session from 'express-session'
import flash from 'connect-flash'
import MongoStore from 'connect-mongo' // Sessionlarin database'de tutulmasi ucun
import pageRoute from './routes/pageRoute.js'
import courseRoute from './routes/courseRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import userRoute from './routes/userRoute.js'

const app = express()

const uploadDir = 'public/uploads'

if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

// Connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.set('view engine', 'ejs')

// Global variables
global.userLoggedIn = null

// Middlewares
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: 'mongodb://127.0.0.1:27017/smartedu-db'})
}))
app.use(flash())
app.use((req,res,next) => {
    res.locals.flashMessages = req.flash()
    next()
})

// Sessionun globalda istifadesi ucundur
app.use('*',(req,res,next) => {
    userLoggedIn = req.session.userID
    next()
})

// Routes
app.use('/', pageRoute)
app.use('/courses', courseRoute)
app.use('/category', categoryRoute)
app.use('/auth', userRoute)


app.listen(3000)