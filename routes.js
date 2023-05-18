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
router.get('/GetById/:id', getById)
router.post('/AddUser',validationFunctions.phone,validationFunctions.email, create)
router.patch('/UpdateUser',validationFunctions.phone,validationFunctions.email,update)
// router.post('/UpdateUser',validationFunctions.phone,update)





module.exports = router;

// router.use('/', userController);
