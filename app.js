const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
//יצרנו מחלקה וייבאנו אותה
const Student = require('./student')

//יצירת שרת express
const app = express()

// const userRouter = require('./api/routes/user')
// const categoryRouter = require('./api/routes/category')

//יצירת מידלוור שיפעיל את המורגן - כתיבת הערות על הבקשות שנשלחו מהלקוח בקונסול לוג
app.use(morgan('dev'))

app.use(bodyParser.json())

//middleware
app.use('/Welcome', (req, res, next) => {
    console.log("succeed");
    next()
})

//פוטרת את בעית ה cors
//מאפשרת גישה לשרת מפורט אחר
app.use((req, res, next) => {
    //origin, headers, methods
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        res.status(200).send()
    }
    next()
})

// //routes
// app.use('/user', userRouter)
// app.use('/category', categoryRouter)

app.use((req, res, next) => {
    const error = new Error("ROUTE NOT FOUND!")
    error.status = 404
    // next(error)
    res.status(error.status).send({ 'error': error.message })
})

// app.use((error, req, res, next) => {
//     res.status(error.status).send({ 'error': error.message })
// })

//יצירת מאזין לשרת עם הפורט הרצוי
app.listen(3000, () => {
    console.log(':)');
})