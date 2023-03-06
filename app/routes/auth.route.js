var router = require('express').Router();
const login = require('../controllers/auth/login.controller');
const register = require('../controllers/auth/resgiter.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const forgotPassword = require('../controllers/auth/forgotPassword.controller');

module.exports = app => {

    router.get('/', authMiddleware.isAuth, login.showLoginForm)
    .post('/login', login.login)

    .get('/register', authMiddleware.isAuth, register.create)
    .post('/register', register.register)

    .get('/logout', authMiddleware.loggedin, login.logout)
    
    .get('/verify',register.verify)
   
    //
    .get('/password/reset',forgotPassword.showForgotForm)
    .post('/password/email',forgotPassword.sendResetLinkEmail)

    //sau khi gui mail se hien form reset password
    .get('/password/reset/:email', forgotPassword.showResetForm)
    .post('/password/reset', forgotPassword.reset)

    app.use(router);

  
}