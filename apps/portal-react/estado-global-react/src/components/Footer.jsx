export const Footer = () => {
  return (
    <footer className="footer" aria-label="Pie de página">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <div className="brand-icon" aria-hidden="true">🎓</div>
              EduTech Academy
            </div>
            <p className="footer-desc">
              Plataforma universitaria de gestión de cursos e inscripciones. Formación tecnológica de calidad para el siglo XXI.
            </p>
          </div>
          <div className="footer-col">
            <h4>Cursos</h4>
            <a href="#cursos">Frontend</a>
            <a href="#cursos">Backend</a>
            <a href="#cursos">Full Stack</a>
            <a href="#cursos">DevOps</a>
            <a href="#cursos">Seguridad</a>
          </div>
          <div className="footer-col">
            <h4>Plataforma</h4>
            <a href="#inicio">Inicio</a>
            <a href="#cursos">Catálogo de Cursos</a>
            <a href="#mis-inscripciones">Mis Inscripciones</a>
          </div>
          <div className="footer-col">
            <h4>Soporte</h4>
            <a href="#ayuda">Centro de ayuda</a>
            <a href="#faq">Preguntas frecuentes</a>
            <a href="#privacidad">Política de privacidad</a>
            <a href="#terminos">Términos de uso</a>
            <a href="#contacto">Contacto</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 EduTech Academy. Todos los derechos reservados.</span>
          <span>Construido para el curso de Ingeniería de Software</span>
        </div>
      </div>
    </footer>
  );
};
