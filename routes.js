const express = require('express')

const router = express.Router();
const userController = require('./userController');

const{
    getAll,
    create
}=require('./userController')

router.get('/', getAll)
router.post('/',create)



module.exports = router;



// router.use('/', userController);
