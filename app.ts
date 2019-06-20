import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.status(200).send({ h1: 'Hello world'});
});

app.listen(5000);
