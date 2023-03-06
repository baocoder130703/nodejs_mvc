const Todo = require("../models/todo.model");

// Show form create Todo
exports.create = (req, res) => {
    res.locals.status = req.query.status;
    res.render('todo/create');
}
// Create and Save a new Todo
exports.store = (req, res) => {
    // Validate request
    if (!req.body) {
        res.redirect('/todo/create?status=error')
    }
    // else
    // {
    //     res.redirect('/todo/create?status=success')
    // }
    
    // Create a Todo
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        published: !req.body.published ? false : true
    });
    // Save Todo in the database
    Todo.create(todo, (err, data) => {
        if (err)
        {
            res.redirect('/todo/create?status=error')
        }
        else{
             res.redirect('/todo/index')
        }
        });
};
// Retrieve all Todo from the database (with condition).
exports.findAll = (req, res) => {
    res.locals.deleted = req.query.deleted;
    const title = req.query.title;
    Todo.getAll(title, (err, data) => {
        if (err)
        {
            res.redirect('/500')
        }
            
        else 
        {
            res.render('todo/index', {todo: data});
        }
    });
};
exports.edit = (req,res)=>{
    res.locals.status = req.query.status;
    Todo.findById(req.params.id,(err,data) =>{
        if(err)
        {
            if(err.kind==="not found")
            {
                res.redirect('/404');
            }
            else
            {
                res.redirect('/500');
            }
        }
        else
        {
            res.render('todo/edit',{todo:data});
        }
    });
};
exports.update = (req,res)=>{
    if(!req.body)
    {
        res.redirect('/todo/edit/' + req.params.id + "?status = err");
    }
    if(req.body.published == 'on')
    {
        req.body.published = true;
    }
    else
    {
        req.body.published = false;
    }
    Todo.updateById(
        req.params.id,
        new Todo(req.body),
        (err,data)=>{
            if(err)
            {
                if(err.kind=== "not found"){
                    res.redirect('/404');
                }    
                else
                {
                    res.redirect('/500');
                }
            }
            else
            {
                res.redirect('/todo/index/');
            }
            
        }
    );
};

exports.delete = (req,res) =>{
    Todo.remove(req.params.id,(err,data)=>{
        if(err)
        {
            if(err.kind === "not_found")
            {
                res.redirect('/404')
            }
            else
            {
                res.redirect('/500');
            }
        }
        else
        {
            res.redirect('/todo/index/');
        }
    })
}
exports.deleteAll = (req,res) =>{
    Todo.removeAll((err,res)=>{
        if(err)
        {
            res.redirect('/500');
        }
        else
        {
            res.redirect('/todo?deleted=true')
        }
    });
};

exports.findAllPublished = (req,res) =>{
    Todo.getAllPublished((err,data) =>{
        if(err)
        {
            res.redirect("/500")
        }
        else
        {
            res.render('todo/index',{todo:data})
        }
    });
};