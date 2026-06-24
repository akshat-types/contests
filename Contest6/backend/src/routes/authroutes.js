const {Router} = require('express');
const router = Router();
const {SignUpController,SignInController} = require('../controllers/authcontroller')

router.post('/signup',SignUpController);
router.post('/signin',SignInController);

module.exports = {
    router,
}