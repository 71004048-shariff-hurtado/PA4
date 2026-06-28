const Curso = require('../models/Curso');

// @desc    Crear un curso nuevo
// @route   POST /api/cursos
// @access  Private/Admin
exports.createCurso = async (req, res) => {
  try {
    const nuevoCurso = await Curso.create(req.body);
    res.status(201).json(nuevoCurso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Obtener todos los cursos
// @route   GET /api/cursos
// @access  Public
exports.listarCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Obtener un curso por ID
// @route   GET /api/cursos/:id
// @access  Public
exports.obtenerCursoPorId = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Actualizar un curso por ID
// @route   PUT /api/cursos/:id
// @access  Private/Admin
exports.actualizarCurso = async (req, res) => {
  try {
    const actualizado = await Curso.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!actualizado) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Eliminar un curso por ID
// @route   DELETE /api/cursos/:id
// @access  Private/Admin
exports.eliminarCurso = async (req, res) => {
  try {
    const eliminado = await Curso.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json({ message: "Curso eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
