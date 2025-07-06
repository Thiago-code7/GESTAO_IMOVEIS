const express = require('express');
const router = express.Router();
const ImovelController = require('../controllers/ImovelController');
const auth = require('../middlewares/authMiddleware');

router.get('/', ImovelController.index);
router.get('/:id', ImovelController.show);

router.post('/', auth, ImovelController.store);
router.put('/:id', auth, ImovelController.update);
router.delete('/:id', auth, ImovelController.delete);

module.exports = router;


