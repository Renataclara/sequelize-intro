const express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var Teacher = require('./models/teacher');
var Subject = require('./models/subject');
var Student = require('./models/student');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const teacher = require('./routers/teachers')
const subject = require('./routers/subjects')
const student = require('./routers/students')

app.use('/teachers', teacher);
app.use('/subjects', subject);
app.use('/students', student);


app.listen(3000);
