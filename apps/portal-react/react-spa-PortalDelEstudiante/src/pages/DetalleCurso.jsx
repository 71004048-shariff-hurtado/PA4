import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCursos } from '../hooks/useCursos';
import { formatearPrecio, calcularCalificacionPromedio } from '../utils/formatters';
import '../styles/DetalleCurso.css';

export default function DetalleCurso() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cursos, estaInscrito, agregarInscripcion, eliminarInscripcion, inscripciones, loading } = useCursos();
  const [curso, setCurso] = useState(null);

  useEffect(() => {
    // Buscar el curso en la lista global cargada del backend
    if (cursos && cursos.length > 0) {
      // Comparar id como string u objectId (se manejan _id en MongoDB)
      const found = cursos.find(c => c._id === id || c.id?.toString() === id);
      setCurso(found || null);
    }
  }, [id, cursos]);

  if (loading && !curso) {
    return (
      <div className="detalle-cargando">
        <span className="spinner"></span>
        <p>Cargando detalles del curso...</p>
      </div>
    );
  }

  if (!curso) {
    return (
      <div className="detalle-error">
        <h2>⚠️ Curso no encontrado</h2>
        <p>El curso que buscas no existe o ha sido retirado.</p>
        <Link to="/catalogocursos" className="btn btn-primary">Volver al catálogo</Link>
      </div>
    );
  }

  const inscripto = estaInscrito(curso._id);
  const inscripcionActual = inscripciones.find(i => i.cursoId === curso._id);

  const handleInscribirse = async () => {
    await agregarInscripcion(curso._id);
  };

  const handleDesinscribirse = async () => {
    if (inscripcionActual) {
      await eliminarInscripcion(inscripcionActual.id);
    }
  };

  return (
    <div className="detalle-container">
      <nav className="breadcrumb" aria-label="Ruta de navegación">
        <Link to="/catalogocursos">Explorar Cursos</Link>
        <span className="separator">›</span>
        <span className="current">{curso.nombre}</span>
      </nav>

      <div className="detalle-layout">
        {/* Lado Izquierdo: Info Principal */}
        <main className="detalle-principal">
          <div className="detalle-card-header">
            <span className="detalle-imagen">{curso.imagen}</span>
            <div className="detalle-header-text">
              <span className="detalle-categoria">{curso.categoria}</span>
              <h1>{curso.nombre}</h1>
              <p className="detalle-docente">Profesor del curso: <strong>{curso.docente}</strong></p>
            </div>
          </div>

          <div className="detalle-descripcion">
            <h2>Acerca de este curso</h2>
            <p>{curso.descripcion}</p>
            <p className="desc-adicional">
              Este curso está diseñado para brindarte un aprendizaje práctico mediante sesiones interactivas, proyectos reales y material complementario disponible las 24 horas del día. Al finalizar, recibirás un certificado de aprobación que validará tus nuevas competencias técnicas en la industria.
            </p>
          </div>

          <div className="detalle-temario">
            <h2>Lo que aprenderás</h2>
            <ul className="temario-lista">
              <li>📌 Fundamentos clave y mejores prácticas de la tecnología.</li>
              <li>📌 Integración de herramientas modernas del ecosistema.</li>
              <li>📌 Arquitectura limpia y diseño de aplicaciones escalables.</li>
              <li>📌 Despliegue, optimización y publicación del producto final.</li>
            </ul>
          </div>
        </main>

        {/* Lado Derecho: Widget de Matrícula */}
        <aside className="detalle-sidebar">
          <div className="widget-matricula">
            <div className="widget-precio">
              <span className="precio-label">Inversión única</span>
              <span className="precio-valor">{formatearPrecio(curso.precio)}</span>
            </div>

            <div className="widget-caracteristicas">
              <div className="caract-item">
                <span className="caract-icon">⏱️</span>
                <span className="caract-text"><strong>Duración:</strong> {curso.duracion} horas</span>
              </div>
              <div className="caract-item">
                <span className="caract-icon">📶</span>
                <span className="caract-text"><strong>Modalidad:</strong> {curso.modalidad}</span>
              </div>
              <div className="caract-item">
                <span className="caract-icon">⭐</span>
                <span className="caract-text"><strong>Calificación:</strong> {calcularCalificacionPromedio(curso.calificacion)}</span>
              </div>
              <div className="caract-item">
                <span className="caract-icon">👥</span>
                <span className="caract-text"><strong>Matriculados:</strong> {curso.estudiantes} estudiantes</span>
              </div>
            </div>

            <div className="widget-acciones">
              {!inscripto ? (
                <button className="btn btn-primary btn-block" onClick={handleInscribirse}>
                  📝 Inscribirme Ahora
                </button>
              ) : (
                <div className="widget-inscrito-box">
                  <div className="inscrito-badge-box">
                    <span className="check-icon">✓</span> ¡Ya estás inscrito en este curso!
                  </div>
                  {inscripcionActual && (
                    <div className="progreso-widget">
                      <div className="progreso-widget-header">
                        <span>Tu progreso:</span>
                        <span>{inscripcionActual.progreso}%</span>
                      </div>
                      <div className="barra-progreso-widget">
                        <div 
                          className="progreso-fill-widget" 
                          style={{ width: `${inscripcionActual.progreso}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <button className="btn btn-outline btn-block btn-desinscribir" onClick={handleDesinscribirse}>
                    🗑️ Desinscribirse del curso
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
