const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv=require("dotenv");
const flash = require('connect-flash');

const session = require('express-session');



const app = express();
require('./config/passport')(passport);
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
     
    }));
app.use(passport.initialize());
app.use(passport.session());

  app.use(flash());
  app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users'));;




dotenv.config();
mongoose
.connect(process.env.MONGODB_URL)
.then (()=>console.log("DB connecion successful"))
.catch((err)=> {
    console.log(`database is not connected ${err}`);
});






app.listen(process.env.PORT  ||9000, () => {
    console.log("Backend server is running");
  });