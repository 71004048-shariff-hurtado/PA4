const express = require('express');
const router = express.Router();

const {
    createCurso, listarCursos, obtenerCursoPorId, actualizarCurso, eliminarCurso
} = require('../controllers/cursoController');

router.post('/cursos', createCurso);
router.get('/cursos', listarCursos);
router.get('/cursos/:id', obtenerCursoPorId);
router.put('/cursos/:id', actualizarCurso);
router.delete('/cursos/:id', eliminarCurso);

module.exports = router;
