module.exports = app =>{
    require('./auth.route')(app);
    require('./todo.routes')(app);
    require('./web.route')(app);
}