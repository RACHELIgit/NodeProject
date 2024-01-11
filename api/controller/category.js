const Category = require('../models/category')

module.exports = {
    getAll: (req, res) => {
        Category.find()
            .then((list) => {
                res.status(200).send(list)
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    },
    getAllTitles: (req, res) => {
        // Category.find().select('title')
        Category.find().select({ title: 1 })
            .then((list) => {
                res.status(200).send(list)
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    },
    getById: (req, res) => {
        Category.findById(req.params.id)
            .then((category) => {
                res.status(200).send(category)
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    },
    create: (req, res) => {
        const { title, description, content } = req.body
        const category = new Category({
            title,
            description,
            content
        })
        category.save()
            .then(() => {
                res.status(200).send(`create category ${category._id} succeed`)
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    },
    update: (req, res) => {
        const id = req.params.id
        //1. url עדכון האובייקט בעל הקוד שנשלח בשורת ה 
        //2. json הנתונים החדשים לעדכון בצורת אובייקט
        //3. החזרת האובייקט החדש
        Category.findByIdAndUpdate(id, req.body, { new: true })
            .then((category) => {
                res.status(200).send(category)
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    },
    remove: (req, res) => {
        Category.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).send(`delete category ${req.params.id} succeed`)
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    }
}