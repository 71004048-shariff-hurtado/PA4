import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCursos } from '../hooks/useCursos';
import '../styles/Navbar.css';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const ubicacion = useLocation();
  const { usuarioActual, inscripciones, logout } = useCursos();

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const esActivo = (ruta) => {
    return ubicacion.pathname === ruta ? 'active' : '';
  };

  // Si no hay un usuario autenticado (estamos en el Login), renderizar un Navbar simple
  if (!usuarioActual) {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <div className="brand-link">
              <span className="brand-icon">🎓</span>
              <span className="brand-text">Edu<em>Tech</em></span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Marca */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">🎓</span>
            <span className="brand-text">Edu<em>Tech</em></span>
          </Link>
        </div>

        {/* Menú de navegación */}
        <div className={`navbar-menu ${menuAbierto ? 'abierto' : ''}`}>
          <div className="navbar-nav">
            <Link 
              to="/" 
              className={`nav-link ${esActivo('/')}`}
              onClick={() => setMenuAbierto(false)}
            >
              📚 Mis Inscripciones
            </Link>
            <Link 
              to="/catalogocursos" 
              className={`nav-link ${esActivo('/catalogocursos')}`}
              onClick={() => setMenuAbierto(false)}
            >
              🔍 Explorar Cursos
            </Link>
            <Link 
              to="/usuario" 
              className={`nav-link ${esActivo('/usuario')}`}
              onClick={() => setMenuAbierto(false)}
            >
              👤 Mi Perfil
            </Link>
          </div>
        </div>

        {/* Sección de usuario */}
        <div className="navbar-user-section">
          <div className="navbar-badge">
            {inscripciones.length}
          </div>
          <div className="navbar-user-info">
            <span className="user-name">{usuarioActual.nombre}</span>
            <span className="user-role">{usuarioActual.rol}</span>
          </div>
          <button 
            onClick={logout} 
            className="btn-nav-logout"
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              marginLeft: '12px',
              padding: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            🚪
          </button>
        </div>

        {/* Botón hamburguesa */}
        <button 
          className={`navbar-toggle ${menuAbierto ? 'activo' : ''}`}
          onClick={toggleMenu}
          aria-label="Alternar menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
