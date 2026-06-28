const mongoose = require('mongoose');
require('dotenv').config();

const Curso = require('./models/Curso');
const User = require('./models/User');
const Enrollment = require('./models/Enrollment');

const cursosMock = [
  {
    nombre: "React Avanzado",
    docente: "Juan Pérez",
    descripcion: "Aprende React profundamente con Hooks, Context API y gestión de estado avanzada.",
    modalidad: "Virtual",
    duracion: 40,
    categoria: "Frontend",
    precio: 49.99,
    calificacion: 4.8,
    estudiantes: 245,
    imagen: "🎓"
  },
  {
    nombre: "Node.js y Express",
    docente: "María Torres",
    descripcion: "Desarrolla aplicaciones backend escalables con Node.js y Express.js.",
    modalidad: "Presencial",
    duracion: 50,
    categoria: "Backend",
    precio: 59.99,
    calificacion: 4.7,
    estudiantes: 180,
    imagen: "🚀"
  },
  {
    nombre: "MongoDB y Bases de Datos",
    docente: "Luis Ramírez",
    descripcion: "Domina MongoDB, diseño de esquemas y consultas avanzadas para tus aplicaciones.",
    modalidad: "Híbrida",
    duracion: 35,
    categoria: "Base de Datos",
    precio: 39.99,
    calificacion: 4.5,
    estudiantes: 156,
    imagen: "📊"
  },
  {
    nombre: "Full Stack Development",
    docente: "Carlos Mendez",
    descripcion: "Conviértete en desarrollador Full Stack dominando Frontend y Backend.",
    modalidad: "Virtual",
    duracion: 80,
    categoria: "Full Stack",
    precio: 89.99,
    calificacion: 4.9,
    estudiantes: 420,
    imagen: "💻"
  },
  {
    nombre: "Seguridad Web",
    docente: "Ana García",
    descripcion: "Aprende a proteger tus aplicaciones web de vulnerabilidades y ataques.",
    modalidad: "Presencial",
    duracion: 45,
    categoria: "Seguridad",
    precio: 69.99,
    calificacion: 4.6,
    estudiantes: 98,
    imagen: "🔒"
  },
  {
    nombre: "Docker y DevOps",
    docente: "Roberto Silva",
    descripcion: "Domina contenedores Docker y prácticas de DevOps para deployment profesional.",
    modalidad: "Híbrida",
    duracion: 55,
    categoria: "DevOps",
    precio: 79.99,
    calificacion: 4.7,
    estudiantes: 134,
    imagen: "🐳"
  }
];

async function sembrarDatos() {
  try {
    console.log('Conectando a la base de datos...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bd_portal_estudiante');
    console.log('Conexión exitosa.');

    // Limpiar colecciones
    console.log('Limpiando colecciones antiguas...');
    await Curso.deleteMany({});
    await User.deleteMany({});
    await Enrollment.deleteMany({});
    console.log('Colecciones limpias.');

    // Crear cursos
    console.log('Creando cursos por defecto...');
    const cursosCreados = await Curso.create(cursosMock);
    console.log(`${cursosCreados.length} cursos creados exitosamente.`);

    // Crear usuario de pruebas
    console.log('Creando usuario de pruebas (Estudiante)...');
    const usuarioEstudiante = await User.create({
      nombre: "Carlos García",
      email: "carlos@example.com",
      password: "123456", // Será encriptado automáticamente por pre('save')
      rol: "Estudiante"
    });
    console.log(`Usuario creado: ${usuarioEstudiante.email} con contraseña: 123456`);

    // Inscribir al estudiante de prueba en 3 cursos de ejemplo
    console.log('Creando inscripciones de prueba...');
    
    // Inscribir en React Avanzado (curso 0)
    const ins1 = await Enrollment.create({
      estudianteId: usuarioEstudiante._id,
      cursoId: cursosCreados[0]._id,
      progreso: 65,
      estado: 'En progreso'
    });

    // Inscribir en Full Stack Development (curso 3)
    const ins2 = await Enrollment.create({
      estudianteId: usuarioEstudiante._id,
      cursoId: cursosCreados[3]._id,
      progreso: 30,
      estado: 'En progreso'
    });

    // Inscribir en MongoDB y Bases de Datos (curso 2)
    const ins3 = await Enrollment.create({
      estudianteId: usuarioEstudiante._id,
      cursoId: cursosCreados[2]._id,
      progreso: 100,
      estado: 'Completado'
    });

    console.log('Inscripciones creadas exitosamente.');
    console.log('Datos sembrados con éxito.');
    process.exit(0);
  } catch (error) {
    console.error('Error al sembrar datos:', error);
    process.exit(1);
  }
}

sembrarDatos();
