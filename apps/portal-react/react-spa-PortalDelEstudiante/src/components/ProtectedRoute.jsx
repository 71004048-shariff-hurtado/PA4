import { Navigate } from 'react-router-dom';
import { useCursos } from '../hooks/useCursos';

export default function ProtectedRoute({ children }) {
  const { usuarioActual, loading } = useCursos();
  const token = localStorage.getItem('token');

  // Si está cargando los datos iniciales y el token existe, mostrar cargando
  if (loading && token && !usuarioActual) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '16px' }}>
        <span className="spinner" style={{ borderColor: 'rgba(79, 70, 229, 0.3)', borderTopColor: '#4f46e5', width: '40px', height: '40px', borderWidth: '4px' }}></span>
        <p style={{ fontFamily: 'sans-serif', color: '#64748b' }}>Verificando autenticación...</p>
      </div>
    );
  }

  // Si no hay token en el almacenamiento ni usuario en el estado, redirigir al login
  if (!token && !usuarioActual) {
    return <Navigate to="/login" replace />;
  }

  // Si todo es válido, renderizar la página protegida
  return children;
}
