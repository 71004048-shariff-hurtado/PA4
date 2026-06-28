import { useState } from "react";

export const Navbar = ({ vistaActiva, setVistaActiva }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (vista, e) => {
    e.preventDefault();
    setVistaActiva(vista);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className="navbar" role="navigation" aria-label="Navegación principal">
        <div className="container">
          <a
            href="#inicio"
            onClick={(e) => handleNavClick("inicio", e)}
            className="navbar-brand"
            aria-label="EduTech Academy inicio"
          >
            <div className="brand-icon" aria-hidden="true">🎓</div>
            <span>Edu<em>Tech</em></span>
          </a>

          <ul className="navbar-nav" role="list">
            <li>
              <a
                href="#inicio"
                onClick={(e) => handleNavClick("inicio", e)}
                className={vistaActiva === "inicio" ? "active" : ""}
                aria-current={vistaActiva === "inicio" ? "page" : undefined}
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#cursos"
                onClick={(e) => handleNavClick("cursos", e)}
                className={vistaActiva === "cursos" ? "active" : ""}
                aria-current={vistaActiva === "cursos" ? "page" : undefined}
              >
                Cursos
              </a>
            </li>
            <li>
              <a
                href="#mis-inscripciones"
                onClick={(e) => handleNavClick("mis-inscripciones", e)}
                className={vistaActiva === "mis-inscripciones" ? "active" : ""}
                aria-current={vistaActiva === "mis-inscripciones" ? "page" : undefined}
              >
                Mis Inscripciones
              </a>
            </li>
          </ul>

          <div className="navbar-actions">
            <div className="navbar-user" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="avatar" aria-hidden="true">CG</div>
              <span className="user-name" style={{ fontSize: "var(--text-sm)", fontWeight: "600", color: "var(--gray-700)" }}>Carlos G.</span>
            </div>
            <button
              className={`hamburger ${mobileOpen ? "open" : ""}`}
              id="hamburger"
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`} id="mobile-nav" role="navigation" aria-label="Menú móvil">
        <a href="#inicio" onClick={(e) => handleNavClick("inicio", e)}>🏠 Inicio</a>
        <a href="#cursos" onClick={(e) => handleNavClick("cursos", e)}>📚 Cursos</a>
        <a href="#mis-inscripciones" onClick={(e) => handleNavClick("mis-inscripciones", e)}>📋 Mis Inscripciones</a>
      </div>
    </>
  );
};
