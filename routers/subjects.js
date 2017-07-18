var express = require('express')
var router = express.Router();
var Model = require('../models');
const giveLetter = require('../helpers/score')

router.use((req, res, next) => {
  if (req.session.user.role == 'academic' || req.session.user.role == 'headmaster') { // undefined
    next()
  } else {
    res.send("woi jd academic atau headmaster dlu yaaa...")
  }
});

router.get('/', function(req, res){
  Model.Subject.findAll()
  .then (arrSubject => {
    let promiseSubject = arrSubject.map( subject => {
      return new Promise( function (resolve, reject) {
        subject.getTeachers()
        .then( teacher => {
          subject.first_name =[];
          teacher.forEach(teacher => {
            subject.first_name.push(teacher.dataValues.first_name+' '+teacher.dataValues.last_name)
          })
          return resolve(subject);
        })
        .catch(err => reject (err));
      });
    });

    Promise.all(promiseSubject)
    .then( subject => {
      console.log(subject);
      res.render('subject', {data_subject: subject, title: 'Subject', role: req.session.user.role});
    })
    .catch(err => {
      console.log(err);
    })
  })
});

router.get('/enrolledstudents/:id', function(req, res){
  Model.StudentSubject.findAll({ order: [['Student', 'first_name']],
    where: {
      SubjectId: req.params.id
    },
    include: [{all:true}]
  })
  .then(function (rows){
    let letter = giveLetter(rows);
    res.render('enrolledStudent', {data_subjectstudent:rows, title: 'Enrolled Student Data', scoreLetter: letter})
  })
});

 router.get('/givescore/:id/:ids', function(req, res){
   Model.StudentSubject.findAll({
     where: {
       StudentId: req.params.id,
       $and: {
         SubjectId: req.params.ids
       }
     },
     include: [{all:true}]
   })
   .then(function (rows){
     res.render('givescore', {data:rows, title: 'Give Score to Student'})
   })
 });

 router.post('/givescore/:id/:ids', function(req, res){
   Model.StudentSubject.update({ Score: req.body.score}, {
     where: {
       StudentId: req.params.id,
       $and: {
         SubjectId: req.params.ids
       }
     }
   })
   .then(function (rows){
     res.redirect(`/subjects/enrolledstudents/${req.params.ids}`);
   })
 });



module.exports = router;
