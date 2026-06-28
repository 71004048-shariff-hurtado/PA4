import { useContext } from "react";
import { InscripcionCursoContext } from "../context/InscripcionCursoContext";

export const Curso = ({ curso }) => {
  const { inscripciones, inscribirCurso } = useContext(InscripcionCursoContext);

  const yaInscrito = inscripciones.some((ins) => ins.id === curso.id);

  return (
    <article className="course-card" role="listitem">
      <div className="course-card-image" style={{ background: curso.gradient }}>
        <div className="course-thumb-placeholder" aria-hidden="true">{curso.icon}</div>
        <span className={`course-card-badge badge ${curso.badgeClass || 'badge-primary'} no-dot`}>
          {curso.badge}
        </span>
      </div>
      <div className="course-card-body">
        <div className="course-category">{curso.category}</div>
        <h3 className="course-title">{curso.title}</h3>
        <p className="course-instructor">👨‍🏫 {curso.instructor} · <strong>{curso.rating} ★</strong></p>
        <div className="course-meta">
          <span className="course-meta-item">🕒 {curso.hours}h</span>
          <span className="course-meta-item">📱 {curso.format}</span>
          <span className="course-meta-item">👥 {curso.students}</span>
        </div>
      </div>
      <div className="course-card-footer">
        <div className="course-price">
          {curso.price === 0 ? (
            <span className="free">Gratuito</span>
          ) : (
            <>
              <span className="currency">S/</span> {curso.price}
            </>
          )}
        </div>
        {yaInscrito ? (
          <button 
            className="btn btn-success btn-sm" 
            disabled 
            style={{ opacity: 0.8, cursor: "not-allowed", backgroundColor: "var(--success-500)", color: "white" }}
          >
            ✓ Inscrito
          </button>
        ) : (
          <button
            onClick={() => inscribirCurso(curso)}
            className="btn btn-primary btn-sm"
          >
            Inscribirse
          </button>
        )}
      </div>
    </article>
  );
};