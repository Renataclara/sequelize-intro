var express = require('express')
var router = express.Router();
var Model = require('../models');

router.get('/', function(req, res){
  Model.Subject.findAll()
  .then (function (rows) {
    res.render('subject', {data_subject: rows});
  })
});

// router.get('/edit/:id', function(req, res){
//   Contact.edit(DBmodel.connection, req.params.id)
//   .then (function (rows){
//     res.render('edit', {data: rows});
//       })
//     });

module.exports = router;
