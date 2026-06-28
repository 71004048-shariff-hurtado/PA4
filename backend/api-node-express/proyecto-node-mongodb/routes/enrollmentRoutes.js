const express = require('express');
const router = express.Router();
const { inscribirse, desinscribirse, listarMisInscripciones } = require('../controllers/enrollmentController');
const { protegerRuta } = require('../middleware/authMiddleware');

// Proteger todas las rutas de inscripciones
router.use(protegerRuta);

router.post('/', inscribirse);
router.get('/mis-inscripciones', listarMisInscripciones);
router.delete('/:id', desinscribirse);

module.exports = router;
