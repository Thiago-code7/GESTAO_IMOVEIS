const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const gerarToken = (usuario) =>
  jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

module.exports = {
  async register(req, res) {
    const { nome, email, senha } = req.body;
    const existente = await Usuario.findOne({ where: { email } });
    if (existente) return res.status(400).json({ error: 'E-mail já cadastrado' });

    const usuario = await Usuario.create({ nome, email, senha });
    return res.status(201).json({ usuario });
  },

  async login(req, res) {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario || !(await usuario.verificarSenha(senha))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = gerarToken(usuario);
    return res.json({ usuario: { id: usuario.id, nome: usuario.nome }, token });
  },
};

