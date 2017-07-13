var express = require('express')
var router = express.Router();

var Model = require('../models');

router.get('/', function(req, res){
  Model.Student.findAll()
  .then (function (rows) {
    res.render('student', {data_student: rows});
  })
});

router.get('/add', function(req, res){
  res.render('studentAdd');
});

//add new student req.body
router.post('/add', function(req, res){
  Model.Student.create({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, jurusan: req.body.jurusan })
  .then( function(){
    res.redirect('/students');
  })
});

//go to the student edit form
router.get('/edit/:id', function(req, res){
  Model.Student.findById(req.params.id)
  .then (function (rows){
    res.render('studentEdit', {data_student: rows});
  })
   });

router.post('/edit/:id', function(req, res) {
  Model.Student.update({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, jurusan: req.body.jurusan},
    {
      where: {id: req.params.id}
    }
  )
  .then( function(){
  res.redirect('/students');
  })
});

//delete data from student
router.get('/delete/:id', function(req, res){
    Model.Student.destroy({where: {id : req.params.id}})
    .then( function(){
  res.redirect('/students');
  })
});

module.exports = router;
