const express = require('express')

const router = express.Router();
const userController = require('./userController');
const validationFunctions = require('./validation')

const{
    getAll,
    create,
    getById,
    update
}=require('./userController')

router.get('/GetUser', getAll)
// router.get('/GetById', getById)
router.post('/AddUser',validationFunctions.phone, create)
router.patch('/UpdateUser',validationFunctions.phone,update)
router.post('/UpdateUser',validationFunctions.phone,update)





module.exports = router;

// router.use('/', userController);
