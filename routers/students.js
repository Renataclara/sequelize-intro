var express = require('express')
var router = express.Router();

var Model = require('../models');

router.use((req, res, next) => {
  console.log(req.session)
  if (req.session.user.role == 'academic' || req.session.user.role == 'headmaster' || req.session.user.role == 'teacher') { // undefined
    next()
  } else {
    res.send("woi jd academic, teacher, headmaster dlu yaaa...")
  }
});


router.get('/', function(req, res){
  Model.Student.findAll({order: [['first_name']]})
  .then (function (rows) {
    res.render('student', {data_student: rows, title: 'Student', role: req.session.user.role});
  })
});

router.get('/add', function(req, res){
  res.render('studentAdd', {err: '', title: 'Add Student'}); // error message catch
});

//add new student req.body
router.post('/add', function(req, res){
  Model.Student.create({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, jurusan: req.body.jurusan })
  .then( function(){
    res.redirect('/students');
  })
  .catch( function(err){
    res.render('studentAdd', {err: err.message, title: 'Add Student'}); // error message catch
  })
});

//go to the student edit form
router.get('/edit/:id', function(req, res){
  Model.Student.findById(req.params.id)
  .then (function (rows){
    res.render('studentEdit', {data_student: rows, err: '', title: 'Edit Student Data'});
  })
   });

router.post('/edit/:id', function(req, res) {
  Model.Student.update({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, jurusan: req.body.jurusan, updatedAt: new Date()}
    ,{
      where: {id: req.params.id}
    })
  .then( function(){
  res.redirect('/students');
  })
});

//go to the student edit form
router.get('/addsubject/:id', function(req, res){
  Model.Student.findById(req.params.id)
  .then (function (rows){
    Model.Subject.findAll()
    .then (function (rows2){
    res.render('studentAddSub', {data_student: rows, data_subject: rows2, title: 'Add Subject to Student'});
  })
   })
 });

router.post('/addsubject/:id', function(req, res) {
  Model.StudentSubject.create({ StudentId: req.params.id, SubjectId: req.body.SubjectId})
  .then( function(){
  res.redirect('/students');
  })
});

//delete data from student
router.get('/delete/:id', function(req, res){
    Model.Student.destroy({where: {id : req.params.id}}) // dan yg di studentsubject
    .then( function(){
      Model.StudentSubject.destroy({where: {StudentId: req.params.id}})
      .then( function(){
  res.redirect('/students');
      })
    })
});

module.exports = router;
