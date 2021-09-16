import './database';
import 'express-async-errors';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import express from 'express';
import routes from './routes';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(routes);
app.use(errorMiddleware);

app.listen(3333, () => {
  console.log('App is running... 🚀');
});
