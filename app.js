import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import filepath from './config/filepath.js';
import logger from 'morgan';

import  hbsHelpers from './helper/handlebars.js';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import { AxiosError } from 'axios';
import connect from './database/connection.js';


connect()

global.config = filepath;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
const hbs = exphbs.create(hbsHelpers);


app.engine('hbs', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(flash());
app.use(express.static(path.join(__dirname, '/public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use((req, res, next) => {
  next(createError(404));
});


app.use((err, req, res, next) => {
  for (let error in AxiosError) {
    
    console.log(error);
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
