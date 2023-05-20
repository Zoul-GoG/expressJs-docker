const express = require('express')
const router = express.Router()

const userController = require('../controllers/usersController')
const { auth } = require('../middlewares/auth')

router.post('/login', userController.login)
router.post('/register', userController.store)
router.get('/', auth, userController.index)
router.get('/:id', userController.show)
router.delete('/:id', auth, userController.delete)
router.put('/:id', userController.update)




module.exports = router