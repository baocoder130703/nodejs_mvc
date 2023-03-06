const todo =require('../controllers/todo.controller');
var router = require('express').Router();
module.exports = app => {
    //rou
    router.get('/',todo.findAll);

    router.get('/create',todo.create);
    router.post('/',todo.store);
    
    router.get('/edit/:id',todo.edit);
    router.put('/:id',todo.update);
    
    router.get('/delete/:id',todo.delete);
    router.post('/delete',todo.delete);

    router.get("/published",todo.findAllPublished);
    
    
    app.use('/todo', router);
    app.get('/500', (req, res) => {
        res.render('err')
    });
    app.get('/404', (req, res) => {
        res.render('404')
    });
}