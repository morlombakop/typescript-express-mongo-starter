import express from 'express';
import cors from 'cors';
import path from 'path';
import ejs from 'ejs';

const app = express();
app.set('views', path.join(__dirname, 'public/views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  // res.status(200).send({ h1: 'Hello world'});
  res.render('index.html');
});

app.listen(5000);
