const express = require('express');
const routes = require('./routes') ;
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(morgan("tiny")); // gerador de log de requisição 
app.use(cors());
app.use(express.json());
app.use(routes);



  app.listen(3333) 
    console.log('Backend na Localhost porta 3333');

    //Não esqueça de dar npm ou yarn install
  