const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del curso es obligatorio']
  },
  docente: {
    type: String,
    required: [true, 'El docente es obligatorio']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  modalidad: {
    type: String,
    required: [true, 'La modalidad es obligatoria'],
    enum: ['Virtual', 'Presencial', 'Híbrida']
  },
  duracion: {
    type: Number,
    required: [true, 'La duración en horas es obligatoria']
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es obligatoria']
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    default: 0
  },
  calificacion: {
    type: Number,
    default: 5.0
  },
  estudiantes: {
    type: Number,
    default: 0
  },
  imagen: {
    type: String,
    default: '🎓'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Curso', cursoSchema);
