import { Link } from 'react-router-dom';
import { useCursos } from '../hooks/useCursos';
import { formatearPrecio, calcularCalificacionPromedio } from '../utils/formatters';
import '../styles/TarjetaCurso.css';

export default function TarjetaCurso({ cursoId, variante = 'catalogo' }) {
  const { obtenerCurso, estaInscrito, agregarInscripcion, eliminarInscripcion, inscripciones } = useCursos();
  const curso = obtenerCurso(cursoId);

  if (!curso) {
    return <div className="tarjeta-error">Curso no encontrado</div>;
  }

  const inscripto = estaInscrito(cursoId);
  const inscripcionActual = inscripciones.find(i => i.cursoId === cursoId);

  const handleInscribirse = (e) => {
    e.preventDefault();
    agregarInscripcion(cursoId);
  };

  const handleDesinscribirse = (e) => {
    e.preventDefault();
    if (inscripcionActual) {
      eliminarInscripcion(inscripcionActual.id);
    }
  };

  // Variante para catálogo de cursos (con filtros)
  if (variante === 'catalogo') {
    return (
      <article className="tarjeta-curso catalogo">
        <div className="tarjeta-header">
          <div className="curso-imagen">{curso.imagen}</div>
          <span className="badge-categoria">{curso.categoria}</span>
        </div>

        <div className="tarjeta-body">
          <h3 className="curso-nombre">
            <Link to={`/cursos/${curso._id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="titulo-curso-link">
              {curso.nombre}
            </Link>
          </h3>
          <p className="curso-docente">👨‍🏫 {curso.docente}</p>
          <p className="curso-descripcion">{curso.descripcion}</p>

          <div className="curso-meta">
            <span className="meta-item">⏱️ {curso.duracion}h</span>
            <span className="meta-item">{curso.modalidad}</span>
            <span className="meta-item">{calcularCalificacionPromedio(curso.calificacion)}</span>
          </div>

          <div className="curso-footer">
            <span className="curso-precio">{formatearPrecio(curso.precio)}</span>
            <span className="curso-estudiantes">{curso.estudiantes} estudiantes</span>
          </div>
        </div>

        <div className="tarjeta-acciones" style={{ display: 'flex', gap: '8px', width: '100%' }}>
          <Link to={`/cursos/${curso._id}`} className="btn btn-outline" style={{ flex: 1, textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>
            ℹ️ Detalle
          </Link>
          {!inscripto ? (
            <button className="btn btn-primary" onClick={handleInscribirse} style={{ flex: 1 }}>
              ✓ Inscribirse
            </button>
          ) : (
            <button className="btn btn-success" disabled style={{ flex: 1, cursor: 'default' }}>
              ✓ Inscrito
            </button>
          )}
        </div>
      </article>
    );
  }

  // Variante para tabla de inscripciones
  if (variante === 'inscripcion') {
    return (
      <article className="tarjeta-curso inscripcion">
        <div className="inscripcion-header">
          <div className="inscripcion-info">
            <h4 className="inscripcion-nombre">
              <Link to={`/cursos/${curso._id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="titulo-curso-link">
                {inscripcionActual?.nombreCurso}
              </Link>
            </h4>
            <p className="inscripcion-docente">{inscripcionActual?.docente}</p>
          </div>
          <span className={`badge-estado ${inscripcionActual?.estado.toLowerCase()}`}>
            {inscripcionActual?.estado}
          </span>
        </div>

        <div className="progreso-barra">
          <div 
            className="progreso-fill" 
            style={{ width: `${inscripcionActual?.progreso}%` }}
          ></div>
        </div>
        <p className="progreso-texto">{inscripcionActual?.progreso}% completado</p>

        <div className="inscripcion-meta">
          <span>Modalidad: {inscripcionActual?.modalidad}</span>
          <span>Inscrito: {inscripcionActual?.fechaInscripcion}</span>
        </div>

        <div className="inscripcion-acciones">
          <button className="btn btn-outline" onClick={handleDesinscribirse}>
            🗑️ Desinscribirse
          </button>
          <Link to={`/cursos/${curso._id}`} className="btn btn-primary" style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            📖 Continuar
          </Link>
        </div>
      </article>
    );
  }

  // Variante simple (para detalles)
  return (
    <article className="tarjeta-curso simple">
      <div className="simple-header">
        <span className="simple-imagen">{curso.imagen}</span>
        <div className="simple-info">
          <h4>{curso.nombre}</h4>
          <p>{curso.docente}</p>
        </div>
      </div>
      <p className="simple-desc">{curso.descripcion}</p>
    </article>
  );
}
