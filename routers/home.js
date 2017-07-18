var express = require('express')
var router = express.Router();
var Model = require('../models');
const hash = require('../helpers/hash');

// router.get('/', function(req, res){
//     res.render('home', {title: 'Home'});
//   });

router.get('/', function(req,res){
    if(req.session.user){
      res.redirect('/students')
    }else {
      res.render('home', {title: 'Home', msg: '', role: ''})
    }
})

router.post('/', function(req,res){
  if(!req.body.username || !req.body.password)
  {
    res.send('please enter username and password')
  }
  else
  {
    Model.User.findOne({
      where: {
        username:req.body.username
      }
    })
    .then(function(row){
      console.log('---'+row.Secret);
      let key = hash(row.Secret, req.body.password);
      if(row.password == key)
      {
          req.session.user = {
            username: req.body.username,
            role: row.role
          }
          if(row.role == 'teacher'){
            res.redirect('/students')
          }else if (row.role == 'academic') {
            res.redirect('/subjects')
          }else {
            res.redirect('/students')
          }
          console.log(req.session.user.role);
      }else
      {
          res.send('password salah')
      }
    })
    .catch(function(err){
      res.send('user not found')
    })
  }
});

router.get('/logout', function(req,res){
  req.session.destroy( err => {
    res.redirect('/');
  })
})

module.exports = router;
