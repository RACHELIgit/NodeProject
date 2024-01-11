// const mongoose = require('mongoose')
const Article = require('../models/article')
const Category = require('../models/category')

module.exports = {
    getAll: (req, res) => {
        //מאפשר לשלוף ערכים שהם קשר גומלין בשלמות ולא רק את הקוד
        Article.find().populate('categoryId')
            .then((list) => {
                res.status(200).send(list)
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    },
    getById: (req, res) => {
        Article.findById({ _id: req.params.id })
            .then((article) => {
                res.status(200).send(article)
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    },
    getByCategoryId: (req, res) => {
        const category = req.params.id
        Article.find({ categoryId: { $eq: { category } } })
            .then((article) => {
                res.status(200).send(article)
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    },
    create: (req, res) => {
        const { title, description, content, categoryId } = req.body

        Category.findById(categoryId)
            .then((category) => {
                if (!category) {
                    //return - יציאה מהפונקציה
                    return res.status(404).send(`category not found!`)
                }
                const article = new Article({
                    title,
                    description,
                    content,
                    categoryId
                })

                return article.save();
            })
            .then((article) => {
                res.status(200).send(`create article ${article._id} succeed`)
            })
            .catch((error) => {
                res.status(500).send({ error: error.message })
            })

    },
    update: (req, res) => {
        const id = req.params.id
        //1. url עדכון האובייקט בעל הקוד שנשלח בשורת ה 
        //2. json הנתונים החדשים לעדכון בצורת אובייקט
        //3. החזרת האובייקט החדש

        const { categoryId } = req.body

        if (categoryId) {
            return Category.findById({ _id: categoryId })
                .then((category) => {
                    if (!category) {
                        //return - יציאה מהפונקציה
                        return res.status(404).send(`category not found!`)
                    }
                    return Article.findByIdAndUpdate({ _id: id }, req.body, { new: true })
                })
                .then((article) => {
                    res.status(200).send(`update article ${article._id} succeed`)
                })
                .catch((error) => {
                    res.status(404).send({ error: error.message })
                })
        }

        Article.findByIdAndUpdate(id, req.body, { new: true })
            .then((article) => {
                res.status(200).send(article)
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    },
    remove: (req, res) => {
        Article.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).send(`delete article ${req.params.id} succeed`)
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    }
}