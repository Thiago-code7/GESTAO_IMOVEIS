const express = require('express');
const router = express.Router();
const ImovelController = require('../controllers/ImovelController');
const auth = require('../middlewares/authMiddleware');

router.get('/imoveis', ImovelController.index);
router.get('/imoveis/:id', ImovelController.show);

router.post('/imoveis', auth, ImovelController.store);
router.put('/imoveis/:id', auth, ImovelController.update);
router.delete('/imoveis/:id', auth, ImovelController.delete);

module.exports = router;

