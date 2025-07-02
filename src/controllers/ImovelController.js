const { Imovel, Proprietario } = require('../models');

module.exports = {
  async index(req, res) {
    const imoveis = await Imovel.findAll({ include: [Proprietario] });
    res.json(imoveis);
  },

  async show(req, res) {
    const imovel = await Imovel.findByPk(req.params.id, { include: [Proprietario] });
    if (!imovel) return res.status(404).json({ error: 'Imóvel não encontrado' });
    res.json(imovel);
  },

  async store(req, res) {
    const { endereco, tipo, valorAluguel, disponivel, fotos, proprietarioId } = req.body;
    const imovel = await Imovel.create({ endereco, tipo, valorAluguel, disponivel, fotos, proprietarioId });
    res.status(201).json(imovel);
  },

  async update(req, res) {
    const imovel = await Imovel.findByPk(req.params.id);
    if (!imovel) return res.status(404).json({ error: 'Imóvel não encontrado' });

    await imovel.update(req.body);
    res.json(imovel);
  },

  async delete(req, res) {
    const imovel = await Imovel.findByPk(req.params.id);
    if (!imovel) return res.status(404).json({ error: 'Imóvel não encontrado' });

    await imovel.destroy();
    res.status(204).send();
  },
};

