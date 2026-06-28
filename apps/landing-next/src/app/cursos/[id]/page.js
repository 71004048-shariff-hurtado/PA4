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

async function obtenerCursoPorId(id) {
  const apiUrl = process.env.API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/cursos/${id}`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    if (!res.ok) throw new Error('Error al obtener datos del curso');
    return await res.json();
  } catch (error) {
    console.warn(`Error al consultar curso ${id} en backend. Buscando en fallback estático.`);
    const fallback = cursosFallback.find(c => c._id === id || c.id?.toString() === id);
    return fallback || null;
  }
}

export default async function CursoDetailPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const curso = await obtenerCursoPorId(id);

  if (!curso) {
    return (
      <main className="page-container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>⚠️ Curso no encontrado</h2>
        <p>El curso que buscas no existe o ha sido modificado.</p>
        <Link href="/cursos" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Volver al Catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="page-container">
      {/* BREADCRUMBS */}
      <nav className="breadcrumb" style={{ marginBottom: '24px' }}>
        <Link href="/cursos">Catálogo Público</Link>
        <span className="separator">›</span>
        <span className="current">{curso.nombre}</span>
      </nav>

      <div className="detail-layout">
        {/* DETALLE PRINCIPAL */}
        <section className="detail-main">
          <div className="detail-header">
            <span className="detail-icon" aria-hidden="true">{curso.imagen}</span>
            <div className="detail-meta-header">
              <span className="detalle-categoria" style={{ alignSelf: 'flex-start' }}>{curso.categoria}</span>
              <h1>{curso.nombre}</h1>
              <p>Profesor asignado: <strong>{curso.docente}</strong></p>
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-h)', marginBottom: '12px' }}>Descripción del Programa</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>{curso.descripcion}</p>
            <p style={{ fontSize: '15px', color: 'var(--gray-500)', fontStyle: 'italic' }}>
              Este curso está dictado por docentes de amplia trayectoria internacional y cuenta con clases dinámicas y asesoramiento personalizado. Al finalizar las horas curriculares y aprobar el proyecto integrador final, se emitirá una certificación con aval académico.
            </p>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-h)', marginBottom: '12px' }}>Temario de Aprendizaje</h2>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
              <li>🔹 <strong>Módulo 1:</strong> Fundamentos e introducción conceptual del ecosistema.</li>
              <li>🔹 <strong>Módulo 2:</strong> Arquitectura e integración práctica de componentes y módulos de datos.</li>
              <li>🔹 <strong>Módulo 3:</strong> Prácticas avanzadas, optimización de velocidad y buenas prácticas de seguridad.</li>
              <li>🔹 <strong>Módulo 4:</strong> Proyecto final aplicado y despliegue para producción.</li>
            </ul>
          </div>
        </section>

        {/* SIDEBAR DE MATRÍCULA */}
        <aside>
          <div className="detail-sidebar-box">
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '20px' }}>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 600, color: 'var(--secondary)' }}>Inversión</span>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>
                S/ {curso.precio}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div className="detail-feature">
                <span>⏱️</span>
                <span style={{ fontSize: '14px' }}><strong>Duración:</strong> {curso.duracion} horas</span>
              </div>
              <div className="detail-feature">
                <span>📶</span>
                <span style={{ fontSize: '14px' }}><strong>Modalidad:</strong> {curso.modalidad}</span>
              </div>
              <div className="detail-feature">
                <span>⭐</span>
                <span style={{ fontSize: '14px' }}><strong>Calificación:</strong> {curso.calificacion} / 5.0</span>
              </div>
              <div className="detail-feature">
                <span>👥</span>
                <span style={{ fontSize: '14px' }}><strong>Estudiantes:</strong> {curso.estudiantes} inscritos</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="http://localhost:5173/login" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', fontWeight: 700 }}>
                🔑 Inscribirse en el Portal
              </a>
              <Link href="/cursos" className="btn btn-outline btn-sm" style={{ textAlign: 'center' }}>
                ← Volver al Catálogo
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
