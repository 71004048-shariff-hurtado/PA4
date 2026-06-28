import { useContext } from "react";
import { InscripcionCursoContext } from "../context/InscripcionCursoContext";

export const InscripcionCurso = ({ inscripcion }) => {
  const { actualizarProgreso } = useContext(InscripcionCursoContext);

  const handleAvanzar = () => {
    actualizarProgreso(inscripcion.id, inscripcion.progress + 10);
  };

  const isCompleted = inscripcion.progress >= 100;

  // Badge class based on status
  const statusBadgeClass =
    inscripcion.status === "Completado"
      ? "badge-success"
      : inscripcion.progress < 50
      ? "badge-warning"
      : "badge-primary";

  // Progress bar color
  const progressBarClass =
    inscripcion.status === "Completado"
      ? "success"
      : inscripcion.progress < 50
      ? "warning"
      : "";

  return (
    <tr>
      <td>
        <div className="user-cell">
          <div
            style={{
              width: "42px",
              height: "42px",
              background: inscripcion.gradient,
              borderRadius: "var(--border-radius)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
              flexShrink: 0
            }}
            aria-hidden="true"
          >
            {inscripcion.icon}
          </div>
          <div className="user-info">
            <div className="name" style={{ textAlign: "left" }}>{inscripcion.title}</div>
            <div className="sub" style={{ textAlign: "left" }}>
              {inscripcion.category} · {inscripcion.hours} horas
            </div>
          </div>
        </div>
      </td>
      <td>{inscripcion.instructor}</td>
      <td>{inscripcion.date}</td>
      <td>
        <span className="badge badge-primary no-dot">{inscripcion.format}</span>
      </td>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <div className="progress-bar-bg" style={{ width: "100px" }} aria-label={`${inscripcion.progress}% completado`}>
            <div className={`progress-bar ${progressBarClass}`} style={{ width: `${inscripcion.progress}%` }}></div>
          </div>
          <span style={{ fontSize: "var(--text-xs)", fontWeight: "700", color: isCompleted ? "var(--success-600)" : "var(--primary-600)" }}>
            {inscripcion.progress}%
          </span>
        </div>
      </td>
      <td>
        <span className={`badge ${statusBadgeClass}`}>{inscripcion.status}</span>
      </td>
      <td>
        <div className="td-actions">
          {isCompleted ? (
            <button
              className="btn btn-success btn-sm"
              onClick={() => alert(`¡Felicidades! Certificado generado para el curso de "${inscripcion.title}".`)}
              style={{ backgroundColor: "var(--success-500)", color: "white" }}
            >
              🏆 Certificado
            </button>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={handleAvanzar}
            >
              Avanzar +10%
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};