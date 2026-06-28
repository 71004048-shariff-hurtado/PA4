import { createContext, useState, useCallback, useEffect } from 'react';
import api from '../services/api';

// Crear el contexto
export const CursosContext = createContext();

// Proveedor del contexto
export function CursosProvider({ children }) {
  const [cursos, setCursos] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos generales
  const cargarDatos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Obtener todos los cursos del backend
      const resCursos = await api.get('/cursos');
      setCursos(resCursos.data);

      // 2. Si hay token guardado, obtener perfil e inscripciones
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const resMe = await api.get('/auth/me');
          setUsuarioActual(resMe.data);
          localStorage.setItem('usuario', JSON.stringify(resMe.data));

          const resIns = await api.get('/inscripciones/mis-inscripciones');
          setInscripciones(resIns.data);
        } catch (authError) {
          console.error("Token no válido o expirado:", authError);
          // Limpieza de datos si el token no es válido
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          setUsuarioActual(null);
          setInscripciones([]);
        }
      }
    } catch (err) {
      console.error("Error al conectar con la API REST:", err);
      setError("No se pudo conectar con el servidor de la academia.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar datos al montar la aplicación
  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  // Iniciar Sesión (Login)
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, ...userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(userData));
      
      setUsuarioActual(userData);
      
      // Recargar todas las inscripciones del estudiante recién logueado
      const resIns = await api.get('/inscripciones/mis-inscripciones');
      setInscripciones(resIns.data);
      
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Cerrar Sesión (Logout)
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuarioActual(null);
    setInscripciones([]);
  }, []);

  // Obtener un curso por ID
  const obtenerCurso = useCallback((id) => {
    return cursos.find(curso => curso._id === id || curso.id?.toString() === id);
  }, [cursos]);

  // Obtener todos los cursos
  const obtenerTodosCursos = useCallback(() => {
    return cursos;
  }, [cursos]);

  // Obtener inscripciones del estudiante
  const obtenerInscripciones = useCallback(() => {
    return inscripciones;
  }, [inscripciones]);

  // Verificar si el estudiante está inscrito en un curso
  const estaInscrito = useCallback((cursoId) => {
    return inscripciones.some(inscripcion => inscripcion.cursoId === cursoId);
  }, [inscripciones]);

  // Agregar nueva inscripción
  const agregarInscripcion = useCallback(async (cursoId) => {
    setLoading(true);
    try {
      await api.post('/inscripciones', { cursoId });
      
      // Refrescar inscripciones y cursos del backend
      const resIns = await api.get('/inscripciones/mis-inscripciones');
      setInscripciones(resIns.data);

      const resCursos = await api.get('/cursos');
      setCursos(resCursos.data);
      
      return true;
    } catch (err) {
      console.error("Error al inscribirse:", err);
      alert(err.response?.data?.error || "Error al matricularse en el curso.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar inscripción
  const eliminarInscripcion = useCallback(async (inscripcionId) => {
    setLoading(true);
    try {
      await api.delete(`/inscripciones/${inscripcionId}`);
      
      // Refrescar inscripciones y cursos del backend
      const resIns = await api.get('/inscripciones/mis-inscripciones');
      setInscripciones(resIns.data);

      const resCursos = await api.get('/cursos');
      setCursos(resCursos.data);

      return true;
    } catch (err) {
      console.error("Error al desinscribirse:", err);
      alert(err.response?.data?.error || "Error al cancelar la inscripción.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtrar cursos por categoría
  const filtrarPorCategoria = useCallback((categoria) => {
    if (categoria === "Todos") return cursos;
    return cursos.filter(curso => curso.categoria === categoria);
  }, [cursos]);

  // Filtrar cursos por modalidad
  const filtrarPorModalidad = useCallback((modalidad) => {
    if (modalidad === "Todas") return cursos;
    return cursos.filter(curso => curso.modalidad === modalidad);
  }, [cursos]);

  // Buscar cursos por texto
  const buscarCursos = useCallback((termino) => {
    const termino_lower = termino.toLowerCase();
    return cursos.filter(curso =>
      curso.nombre.toLowerCase().includes(termino_lower) ||
      curso.docente.toLowerCase().includes(termino_lower) ||
      curso.descripcion.toLowerCase().includes(termino_lower)
    );
  }, [cursos]);

  const valor = {
    cursos,
    inscripciones,
    usuarioActual,
    loading,
    error,
    login,
    logout,
    obtenerCurso,
    obtenerTodosCursos,
    obtenerInscripciones,
    estaInscrito,
    agregarInscripcion,
    eliminarInscripcion,
    filtrarPorCategoria,
    filtrarPorModalidad,
    buscarCursos
  };

  return (
    <CursosContext.Provider value={valor}>
      {children}
    </CursosContext.Provider>
  );
}
