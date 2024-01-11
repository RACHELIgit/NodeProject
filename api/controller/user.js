const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const User = require('../models/user')

module.exports = {

    //בלבד jwt פונקציות עם שימוש ב
    //בהרשמה למערכת קבלנו צופן שנשמר לוקאלית במחשב
    //בכניסה למערכת הוצרכנו לשמלוח את הצופן ע"מ לוודא שהמשתמש רשום למערכת

    //sign in - כניסה
    login: (req, res) => {
        const { email, password } = req.body
        //authorization - אימות
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET)
        console.log(decoded);
        res.send('login')
    },
    //sign up - הרשמה
    register: (req, res) => {
        const { email, password } = req.body
        const token = jwt.sign(password, process.env.SECRET)
        const user = new User({
            email,
            password
        })
        user.save()
            .then((user) => {
                res.status(200).json({ user, token })
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    },

    //bcrypt, jwt פונקציות עם שימוש ב
    //בעת רישום למערכת נשמור את הסיסמה בצורה מוצפנת במסד
    //בכל כניסה למערכת נבדוק שהסיסמה שהכניס מתאימה לסיסמה השמורה במסד - הסיסמה נוצרה באמצעות המערכת
    //אם הסיסמאות תואמות נשלח לו צופן  שיהיה שמור לוקאלית במחשב
    //הצופן ישלח בכל קריאה לשרת בכותרות
    //ויתן אפשרות לגשת לכל פונקציה שמוגדרת כניתנת לגישה רק בזמן שהלקוח מחובר

    signup: (req, res) => {
        const { email, password } = req.body
        //כל אובייקט json
        //שהמפתח והערך הם בעלי אותו שם
        //מספיק לכתוב פעם אחת בלבד
        User.find({ email })
            .then((users) => {
                console.log(users);
                if (users.length >= 1) {
                    return res.status(409).send({ message: 'Email is already exists' })
                }

                bcrypt.hash(password, 10, (error, hash) => {
                    if (error) {
                        return res.status(500).send({ message: error.message })
                    }
                    const user = new User({
                        email,
                        password: hash
                    })
                    user.save()
                        .then(() => {
                            res.status(200).send('user created!')
                        })
                        .catch((error) => {
                            res.status(500).send({ error: error.message })
                        })
                })
            })
            .catch((error) => {
                res.status(500).send({ error: error.message })
            })
    },

    signin: ((req, res) => {
        const { email, password } = req.body
        User.find({ email })
            .then((users) => {
                if (users.length === 0) {
                    return res.status(401).send({ message: 'Auth failed' })
                }
                const [user] = users
                //const user = users[0]
                bcrypt.compare(password, user.password, (error, result) => {
                    if (error || !result) {
                        return res.status(401).send({ message: 'Auth failed' })
                    }
                    if (result) {
                        const token = jwt.sign(
                            //לפי אילו פרמטרים תתבצע ההצפנה
                            { email },
                            //מזהה יחודי של המערכת השמור בקובץ ההגדרות
                            process.env.SECRET,
                            //אפשרויות להגדרת התוקן
                            {
                                //התוקן יהיה תקף רק במשך שעה
                                expiresIn: '1H'
                            })

                        return res.status(200).send({ message: 'Auth succeed', token })
                    }
                })
            })
            .catch(() => {
                return res.status(401).send({ message: 'Auth failed' })
            })
    }),

    getAll: (req, res) => {
        User.find()
            .then((list) => {
                console.log(list);
                res.status(200).send(list)
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    }
}