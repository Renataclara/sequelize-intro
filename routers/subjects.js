var express = require('express')
var router = express.Router();
var Model = require('../models');

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
      res.render('subject', {data_subject: subject});
    })
    .catch(err => {
      console.log(err);
    })
  })
});


// router.get('/edit/:id', function(req, res){
//   Contact.edit(DBmodel.connection, req.params.id)
//   .then (function (rows){
//     res.render('edit', {data: rows});
//       })
//     });

// make them association together
// function satuData(){
//   db.Profile.create({
//     name:'adnin'
//   })
//   .then((profile) => {
//     db.Address.create ({
// streer: 'jalan',
// ProfileId: profile.id
//     })
//     .then (address => {
//       console.log('profile sudah di buat')
//     })
//   })
// };


// ambil data dri yang association result
// function satuData(){
//   db.Profile.findById({
//     .then(profile => {
//       profile.getAddress()
//       .then( address => {
//         console.log(profile.name, address.street);
//       })
//     })
//   })
//   .catch(err => {
//     console.log(err);
//   })
// };

// ambil data dri yang association result
// function satuData(){
//   db.Profile.findAll({
//     .then(arrprofile => {
//       let promiseProfile  = arrProfile.map(x =>
//     new Promise(function(resolve, reject) {
//       profile.getAddress()
//       .then(address => {
//         profile.street = address.street;
//         profile.city = address.city;
//         return resolve(profile)
//       })
//       .catch(err => reject(err));
//     });
// });
//
// Promise.all(promiseProfile)
// .then(profile => {
//   console.log(profile);
// })
// .catch (err => {
//   console.log(err);
// })
//
//   .catch(err => {
//     console.log(err);
//   })
// };

// let arr = [1,2,3].map( x=> { // for each di jadiin array baru
// console.log(x);
// return x*2
// })
//
// console.log(arr) ; // [2,4,6]

module.exports = router;
