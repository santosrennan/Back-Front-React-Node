
const connection = require('../database/connection');
const crypto = require('crypto'); //chave aleatoria em hex

module.exports = {
//GET
    async index(req, res) {
        const response = await connection('funcionario').select('*');

        return res.json(response);
    },

//POST
    async create(req, res) {

        const { name, age, role } = req.body;

        const id = crypto.randomBytes(4).toString('HEX'); // gera o id automatico cryptografado em na base hex

        await connection('funcionario').insert({
            id,
            name,
            role,
            age,

        })

        return res.json({ id });
    },

//DELETE
    async delete(req, res) {
        const { id } = req.params;

        await connection('funcionario').where('id', id).delete()
        return res.status(204).send();
    },
//PUT
    async update(req, res) {
        const { id } = req.params 

        const { name, age, role } = req.body;
         await connection('funcionario').where('id', id).update({
            name,
            age,
            role,


        })
        return res.status(204).send();
    },



};