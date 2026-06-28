const Enrollment = require('../models/Enrollment');
const Curso = require('../models/Curso');

// @desc    Inscribir un estudiante a un curso
// @route   POST /api/inscripciones
// @access  Private (Solo estudiantes)
exports.inscribirse = async (req, res) => {
  const { cursoId } = req.body;
  const estudianteId = req.user._id;
  
  try {
    // Validar que el curso existe
    const curso = await Curso.findById(cursoId);
    if (!curso) {
      return res.status(404).json({ error: 'El curso no existe' });
    }
    
    // Verificar si ya está inscrito
    const yaInscrito = await Enrollment.findOne({ estudianteId, cursoId });
    if (yaInscrito) {
      return res.status(400).json({ error: 'Ya estás inscrito en este curso' });
    }
    
    // Crear inscripción
    const inscripcion = await Enrollment.create({
      estudianteId,
      cursoId,
      fechaInscripcion: new Date(),
      progreso: 0,
      estado: 'En progreso'
    });
    
    // Opcional: Incrementar el contador de estudiantes del curso
    await Curso.findByIdAndUpdate(cursoId, { $inc: { estudiantes: 1 } });
    
    res.status(201).json(inscripcion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Desinscribir un estudiante de un curso
// @route   DELETE /api/inscripciones/:id
// @access  Private (Solo propietario de la inscripción)
exports.desinscribirse = async (req, res) => {
  const inscripcionId = req.params.id;
  const estudianteId = req.user._id;
  
  try {
    const inscripcion = await Enrollment.findById(inscripcionId);
    if (!inscripcion) {
      return res.status(404).json({ error: 'La inscripción no existe' });
    }
    
    // Verificar propiedad
    if (inscripcion.estudianteId.toString() !== estudianteId.toString()) {
      return res.status(403).json({ error: 'No tienes autorización para eliminar esta inscripción' });
    }
    
    const cursoId = inscripcion.cursoId;
    
    // Eliminar inscripción
    await Enrollment.findByIdAndDelete(inscripcionId);
    
    // Opcional: Decrementar el contador de estudiantes del curso
    await Curso.findByIdAndUpdate(cursoId, { $inc: { estudiantes: -1 } });
    
    res.json({ message: 'Desinscripción exitosa' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Obtener inscripciones del estudiante autenticado
// @route   GET /api/inscripciones/mis-inscripciones
// @access  Private (Estudiante)
exports.listarMisInscripciones = async (req, res) => {
  const estudianteId = req.user._id;
  
  try {
    const inscripciones = await Enrollment.find({ estudianteId })
      .populate('cursoId');
      
    // Formatear para que se asemeje a lo que el frontend espera
    const inscripcionesFormateadas = inscripciones.map(ins => {
      // Si por alguna razón el curso fue eliminado pero queda la inscripción
      if (!ins.cursoId) return null;
      
      return {
        id: ins._id,
        cursoId: ins.cursoId._id,
        nombreCurso: ins.cursoId.nombre,
        docente: ins.cursoId.docente,
        fechaInscripcion: ins.fechaInscripcion.toISOString().split('T')[0],
        modalidad: ins.cursoId.modalidad,
        progreso: ins.progreso,
        estado: ins.estado
      };
    }).filter(Boolean);
    
    res.json(inscripcionesFormateadas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
