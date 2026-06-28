const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  estudianteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El estudiante es obligatorio']
  },
  cursoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso',
    required: [true, 'El curso es obligatorio']
  },
  fechaInscripcion: {
    type: Date,
    default: Date.now
  },
  progreso: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  estado: {
    type: String,
    enum: ['En progreso', 'Completado'],
    default: 'En progreso'
  }
}, {
  timestamps: true
});

// Asegurar que un estudiante no se inscriba dos veces al mismo curso
enrollmentSchema.index({ estudianteId: 1, cursoId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
