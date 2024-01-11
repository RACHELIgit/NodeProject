const express = require('express')

const router = express.Router()

const {
    getAll,
    getById,
    create,
    update,
    remove
} = require('../controller/article')

const { checkAuth } = require('../middlewares')

router.get('/', getAll)
router.get('/:id', getById)

// router.use('/', checkAuth)
router.post('/', checkAuth, create)
router.patch('/:id', checkAuth, update)
router.delete('/:id', checkAuth, remove)

module.exports = router