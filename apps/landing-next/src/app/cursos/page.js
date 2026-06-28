import Link from "next/link";

const cursosFallback = [
  {
    _id: "1",
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
    _id: "2",
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
    _id: "3",
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
    _id: "4",
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
    _id: "5",
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
    _id: "6",
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

async function obtenerCursos() {
  const apiUrl = process.env.API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/cursos`, {
      cache: 'no-store', // Simula Server-Side Rendering desactivando caché
      next: { revalidate: 0 }
    });
    if (!res.ok) throw new Error('Error al obtener datos');
    return await res.json();
  } catch (error) {
    console.warn("Backend desconectado. Usando cursos estáticos de respaldo en catálogo para el build.");
    return cursosFallback;
  }
}

export default async function CursosPage() {
  const cursos = await obtenerCursos();

  return (
    <main className="page-container">
      <div className="section-header" style={{ textAlign: 'left', margin: '0 0 40px 0', maxWidth: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-h)', marginBottom: '8px' }}>Oferta Académica Vigente</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text)' }}>Explora nuestros programas y especialidades tecnológicas vigentes para este ciclo.</p>
      </div>

      {cursos.length > 0 ? (
        <div className="courses-grid">
          {cursos.map((curso) => (
            <article key={curso._id || curso.id} className="course-card">
              <div className="course-header">
                {curso.imagen}
                <span className="course-badge">{curso.categoria}</span>
              </div>
              <div className="course-body">
                <h3 className="course-title">{curso.nombre}</h3>
                <p className="course-docente">👨‍🏫 Docente: {curso.docente}</p>
                <p className="course-desc">{curso.descripcion}</p>
                <div className="course-meta">
                  <span>⏱️ {curso.duracion} horas</span>
                  <span>📶 {curso.modalidad}</span>
                </div>
                <div className="course-footer">
                  <span className="course-price">S/ {curso.precio}</span>
                  <Link href={`/cursos/${curso._id || curso.id}`} className="btn btn-outline btn-sm">
                    Ver Información
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-h)' }}>📭 No hay cursos registrados en el catálogo en este momento.</p>
        </div>
      )}
    </main>
  );
}
