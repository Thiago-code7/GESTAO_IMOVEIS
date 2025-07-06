const { Proprietario } = require('../models');

module.exports = {
  // Cadastra um novo proprietário
  async store(req, res) {
    try {
      const { nome, cpf, telefone } = req.body;
      const proprietario = await Proprietario.create({ nome, cpf, telefone });
      return res.status(201).json(proprietario);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Lista todos os proprietários
  async index(req, res) {
    try {
      const proprietarios = await Proprietario.findAll();
      return res.json(proprietarios);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};