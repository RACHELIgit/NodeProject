const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
//npm i cors
const cors = require('cors')

const mongoose = require('mongoose')
const dotenv = require('dotenv')

const jwt = require('jsonwebtoken')

const ArticleRouter = require('./api/routes/article')
const CategoryRouter = require('./api/routes/category')
const UserRouter = require('./api/routes/user')

const { checkAuth } = require('./api/middlewares')

const app = express()
const port = 3000

dotenv.config()

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB_CONNECTION, connectionParams)
    .then(() => {
        console.log('connect to mongoDB');
    })
    .catch((error) => {
        console.log(error.message);
    })

//middlewares
//המרה של מה שנשלח מהקליינט בbody
//לאובייקט json
app.use(bodyParser.json())
//תיעוד של קריאות שרת בטרמינל
app.use(morgan('dev'))
//פתרון לבעית הגישה לפליקציות צד לקוח שרצות על פורטים שונים
app.use(cors())

//endpoint
app.get('/', (req, res) => {
    res.status(200).send('HELLO 😂😊😁')
})

//שימוש בראוטר עי הניתוב המצוין
app.use('/article', ArticleRouter)
app.use('/category', checkAuth, CategoryRouter)
app.use('/user', UserRouter)

//יצירת מאזין בפורט שבחרנו
app.listen(port, () => {
    console.log(`my app is listening on http://localhost:${port}`);
})