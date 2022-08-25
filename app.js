const express = require('express');
const mongoose = require('mongoose');
const authroutes = require('./routes/auth_routes');
const mainroutes = require('./routes/main_pages_routes');
const cookieParser = require('cookie-parser');
const connection = require('./models/connection_InfluxDB');
const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.json());

// database connection
const dbURI = 'mongodb+srv://aimen:aimen1234@authjwt.pmuuteq.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// use routes and packages
app.use(mainroutes);
app.use(authroutes);
console.log('http://localhost:3000')