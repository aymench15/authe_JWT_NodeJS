const {Router} = require('express');
const auth_controller = require('../controllers/auth_controller');

const authroutes = Router();

authroutes.get('/signup',auth_controller.getSignUpPage);
authroutes.get('/signin',auth_controller.getSignInPage);
authroutes.post('/signup' , auth_controller.postSignUpPage);
authroutes.post('/signin' ,auth_controller.postSignInPage);


module.exports = authroutes;