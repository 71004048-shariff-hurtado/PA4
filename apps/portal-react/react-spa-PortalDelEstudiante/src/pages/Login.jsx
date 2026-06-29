import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCursos } from '../hooks/useCursos';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLocal, setErrorLocal] = useState('');
  const { login, usuarioActual, loading } = useCursos();
  const navigate = useNavigate();

  // Si el usuario ya está autenticado, redirigir al panel principal
  if (usuarioActual) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorLocal('');
    
    if (!email || !password) {
      setErrorLocal('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    try {
      const exitoso = await login(email, password);
      if (exitoso) {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setErrorLocal(err.response?.data?.error || 'Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">Edu<em>Tech</em></span>
          </div>
          <h1>¡Te damos la bienvenida!</h1>
          <p className="login-subtitle">Ingresa tus credenciales para acceder a tu portal de estudiante</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {errorLocal && (
            <div className="login-error" role="alert">
              ⚠️ {errorLocal}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <div className="input-with-icon">
              <input
                type="email"
                id="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-with-icon">
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`btn-login ${loading ? 'cargando' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>¿No tienes una cuenta? Contacta a administración para registrarte.</p>
          <div className="credenciales-demo">
            <p><strong>Usuario Demo:</strong> carlos@example.com</p>
            <p><strong>Contraseña:</strong> 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}
