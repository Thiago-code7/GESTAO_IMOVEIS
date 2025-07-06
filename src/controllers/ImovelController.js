const { Imovel, Proprietario } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const imoveis = await Imovel.findAll({ include: [Proprietario] });
      res.json(imoveis);
    } catch (error) {
      console.error('Erro ao listar imóveis:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async show(req, res) {
    try {
      const imovel = await Imovel.findByPk(req.params.id, { include: [Proprietario] });
      if (!imovel) return res.status(404).json({ error: 'Imóvel não encontrado' });
      res.json(imovel);
    } catch (error) {
      console.error('Erro ao buscar imóvel:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async store(req, res) {
    try {
      const { endereco, tipo, valorAluguel, disponivel, fotos, proprietarioId } = req.body;
      const imovel = await Imovel.create({ endereco, tipo, valorAluguel, disponivel, fotos, proprietarioId });
      res.status(201).json(imovel);
    } catch (error) {
      console.error('Erro ao criar imóvel:', error);
      res.status(400).json({ error: error.message, details: error.parent?.message });
    }
  },

  async update(req, res) {
    try {
      const imovel = await Imovel.findByPk(req.params.id);
      if (!imovel) return res.status(404).json({ error: 'Imóvel não encontrado' });

      await imovel.update(req.body);
      res.json(imovel);
    } catch (error) {
      console.error('Erro ao atualizar imóvel:', error);
      res.status(400).json({ error: error.message, details: error.parent?.message });
    }
  },

  async delete(req, res) {
    try {
      const imovel = await Imovel.findByPk(req.params.id);
      if (!imovel) return res.status(404).json({ error: 'Imóvel não encontrado' });

      await imovel.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar imóvel:', error);
      res.status(400).json({ error: error.message, details: error.parent?.message });
    }
  },
};