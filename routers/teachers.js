var express = require('express')
var router = express.Router();

var Model = require('../models');

// router.get('/', function(req, res){
//   Model.Teacher.findAll()
//   .then (function (rows) {
//     res.render('teacher', {data_teacher: rows});
//   })
// });

router.use((req, res, next) => {
  if (req.session.user.role == 'headmaster') { // undefined
    next()
  } else {
    res.send("woi jd headmaster dlu yaaa...")
  }
});

router.get('/', function(req, res){
  Model.Teacher.findAll({order: [['first_name']]})
  .then (arrTeacher => {
    let promiseTeacher = arrTeacher.map( teacher => {
      return new Promise( function (resolve, reject) {
        teacher.getSubject()
        .then( subject => {
          if (teacher.SubjectId == null) {
            teacher.subject_name = 'unassigned';
          } else {
            teacher.subject_name = subject.subject_name;
          }
          return resolve(teacher);
        })
        .catch(err => reject (err));
      });
    });
    Promise.all(promiseTeacher)
    .then( teacher => {
      res.render('teacher', {data_teacher: teacher, title: 'Teachers', role: req.session.user.role});
    })
  })
});

router.get('/add', function(req, res){
  Model.Subject.findAll()
    .then (function (rows) {
      res.render('teacherAdd', {data_subject: rows, title: 'Add Teacher'});
})
});

//add new teacher req.body
router.post('/add', function(req, res){
  Model.Teacher.create({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, SubjectId: req.body.SubjectId })
  .then( function(){
    res.redirect('/teachers');
  })
});

//go to the teacher edit form
router.get('/edit/:id', function(req, res){
  Model.Teacher.findById(req.params.id)
  .then (function (rows){
    Model.Subject.findAll()
    .then (function (rows2){
    res.render('teacherEdit', {data_teacher: rows, data_subject: rows2, title: 'Edit Teacher Data'});
  })
   })
 });
//
router.post('/edit/:id', function(req, res) {
  Model.Teacher.update({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, SubjectId: req.body.SubjectId},
    {
      where: {id: req.params.id}
    }
  )
  .then( function(){
  res.redirect('/teachers');
  })
});
//
// //delete data from teacher
router.get('/delete/:id', function(req, res){
    Model.Teacher.destroy({where: {id : req.params.id}})
    .then( function(){
  res.redirect('/teachers');
  })
});

module.exports = router;
