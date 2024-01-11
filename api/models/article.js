const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    // _id:{
    //     type:mongoose.Schema.Types.ObjectId
    // },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    content: {
        type: String,
        require: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    }
})

module.exports = mongoose.model('Article', articleSchema)