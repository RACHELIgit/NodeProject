const express = require('express')

const router = express.Router();
const userController = require('./userController');
const validationFunctions = require('./validation')

const{
    getAll,
    create
}=require('./userController')

router.get('/', getAll)
router.post('/',validationFunctions.phone
 ,validationFunctions.email
, create)



module.exports = router;



// router.use('/', userController);
