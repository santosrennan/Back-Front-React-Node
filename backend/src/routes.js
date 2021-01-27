const express = require('express');
const FuncionarioController = require('./controllers/FuncionarioController');

const routes = express.Router();

routes.get('/funcionario', FuncionarioController.index);
routes.post('/funcionario', FuncionarioController.create);
routes.put('/funcionario/:id', FuncionarioController.update);
routes.delete('/funcionario/:id', FuncionarioController.delete);

  module.exports = routes;