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
  }
];

async function obtenerCursosDestacados() {
  const apiUrl = process.env.API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/cursos`, {
      cache: 'no-store', // Deshabilita caché para simular SSR en tiempo real
      next: { revalidate: 0 }
    });
    if (!res.ok) throw new Error('Error al obtener datos');
    const data = await res.json();
    return data.slice(0, 3); // Obtener solo los primeros 3 destacados
  } catch (error) {
    console.warn("Backend desconectado. Usando cursos estáticos de respaldo para el build.");
    return cursosFallback;
  }
}

export default async function Home() {
  const cursosDestacados = await obtenerCursosDestacados();

  return (
    <main className="page-container" style={{ padding: '20px 20px 60px' }}>
      {/* HERO SECTION */}
      <section className="hero">
        <h1>Aprende, crece y<br /><span>lidera el futuro</span> tecnológico</h1>
        <p>Formación de calidad académica certificada en programación, desarrollo de software, backend, bases de datos y DevOps. Accede desde cualquier lugar.</p>
        <div className="hero-actions">
          <Link href="/cursos" className="btn btn-primary">
            Explorar Catálogo
          </Link>
          <a href="http://localhost:5173/login" className="btn btn-outline">
            Acceso Estudiantes
          </a>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-value">1,240+</div>
          <div className="stat-label">Estudiantes Activos</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">12+</div>
          <div className="stat-label">Docentes Expertos</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">100%</div>
          <div className="stat-label">Certificación Oficial</div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="benefits-section">
        <div className="section-header">
          <h2>¿Por qué estudiar en EduTech Academy?</h2>
          <p>Una plataforma educativa diseñada para potenciar tu desarrollo técnico a través de metodologías ágiles e instrucción práctica.</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <span className="benefit-icon" aria-hidden="true">📖</span>
            <h3>Cursos Estructurados</h3>
            <p>Contenido organizado paso a paso, diseñado por profesionales de la industria y docentes calificados.</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon" aria-hidden="true">💻</span>
            <h3>Enfoque 100% Práctico</h3>
            <p>Aprende haciendo con talleres guiados, laboratorios virtuales y proyectos integradores para tu portafolio.</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon" aria-hidden="true">🏅</span>
            <h3>Certificado Universitario</h3>
            <p>Obtén un aval académico por tus horas completadas que podrás compartir en LinkedIn y mejorar tu CV.</p>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="courses-section">
        <div className="section-header">
          <h2>Nuestros Cursos Destacados</h2>
          <p>Explora algunas de las especialidades más demandadas y empieza a aprender de inmediato.</p>
        </div>
        <div className="courses-grid">
          {cursosDestacados.map((curso) => (
            <article key={curso._id || curso.id} className="course-card">
              <div className="course-header">
                {curso.imagen}
                <span className="course-badge">{curso.categoria}</span>
              </div>
              <div className="course-body">
                <h3 className="course-title">{curso.nombre}</h3>
                <p className="course-docente">👨‍🏫 Profesor: {curso.docente}</p>
                <p className="course-desc">{curso.descripcion}</p>
                <div className="course-meta">
                  <span>⏱️ {curso.duracion} horas</span>
                  <span>📶 {curso.modalidad}</span>
                </div>
                <div className="course-footer">
                  <span className="course-price">S/ {curso.precio}</span>
                  <Link href={`/cursos/${curso._id || curso.id}`} className="btn btn-outline btn-sm">
                    Ver Más
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <Link href="/cursos" className="btn btn-primary">
            Ver Todos los Cursos
          </Link>
        </div>
      </section>
    </main>
  );
}
