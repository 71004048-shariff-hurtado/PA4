import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "EduTech Academy | Cursos de Tecnología",
  description: "Sitio público de la academia EduTech. Explora nuestro catálogo de cursos de frontend, backend, bases de datos y seguridad.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header className="main-header">
          <div className="nav-container">
            <div className="brand">
              <Link href="/" className="brand" style={{ gap: '8px' }}>
                <span className="brand-icon">🎓</span>
                <span className="brand-text">Edu<em>Tech</em></span>
              </Link>
            </div>
            <nav className="nav-links">
              <Link href="/" className="nav-link">Inicio</Link>
              <Link href="/cursos" className="nav-link">Catálogo</Link>
            </nav>
            <div className="nav-actions">
              <a href="http://localhost:5173/login" className="btn btn-primary btn-sm">
                Ingresar al Portal →
              </a>
            </div>
          </div>
        </header>

        {children}

        <footer className="main-footer">
          <div className="footer-content">
            <div className="footer-info">
              <div className="brand" style={{ gap: '8px', color: '#fff', marginBottom: '12px' }}>
                <span className="brand-icon">🎓</span>
                <span className="brand-text">Edu<em>Tech</em></span>
              </div>
              <p style={{ fontSize: '14px' }}>Formación técnica y profesional de calidad universitaria para liderar el futuro tecnológico.</p>
            </div>
            <div className="footer-links-group">
              <div className="footer-links">
                <h4>Explorar</h4>
                <Link href="/">Inicio</Link>
                <Link href="/cursos">Catálogo Público</Link>
              </div>
              <div className="footer-links">
                <h4>Estudiantes</h4>
                <a href="http://localhost:5173/login">Portal Académico</a>
                <a href="http://localhost:5173/">Mis Inscripciones</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 EduTech Academy. Todos los derechos reservados.</p>
            <p>PA4 - Desarrollo Web Integrado</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
