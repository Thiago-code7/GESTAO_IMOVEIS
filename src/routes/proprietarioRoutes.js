const express = require('express');
const router = express.Router();
const ProprietarioController = require('../controllers/ProprietarioController');

// Lista todos os proprietários
router.get('/', ProprietarioController.index);

// Cadastra um novo proprietário
router.post('/', ProprietarioController.store);

module.exports = router;