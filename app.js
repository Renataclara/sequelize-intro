const express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session')

var Teacher = require('./models/teacher');
var Subject = require('./models/subject');
var Student = require('./models/student');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(session({
  secret: 'hacktiv8',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const teacher = require('./routers/teachers')
const subject = require('./routers/subjects')
const student = require('./routers/students')
const home = require('./routers/home')
const signup = require('./routers/signup')

app.use('/', home);
app.use('/signup', signup);

app.use((req, res, next) => {
  if (req.session.user) { // undefined
    next()
  } else {
    res.render('home', {title:'login', msg: 'anda harus login'})
  }
});

app.use('/signup', signup);
app.use('/teachers', teacher);
app.use('/subjects', subject);
app.use('/students', student);



app.listen(process.env.PORT || 3000);
