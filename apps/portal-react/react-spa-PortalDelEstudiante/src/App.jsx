import { Routes, Route } from "react-router-dom";
import { CursosProvider } from "./context/CursosContext";
import CursosDelEstudiante from "./pages/CursosDelEstudiante";
import CatalogoCursos from "./pages/CatalogoCursos";
import DetalleCurso from "./pages/DetalleCurso";
import Login from "./pages/Login";
import Usuario from "./components/Usuario";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

export default function App() {
  return (
    <CursosProvider>
      <Navbar />
      <Routes>
        {/* Ruta Pública de Autenticación */}
        <Route path="/login" element={<Login />} />

        {/* Rutas Protegidas del Estudiante */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <CursosDelEstudiante />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/catalogocursos" 
          element={
            <ProtectedRoute>
              <CatalogoCursos />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cursos/:id" 
          element={
            <ProtectedRoute>
              <DetalleCurso />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/usuario" 
          element={
            <ProtectedRoute>
              <Usuario />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </CursosProvider>
  );
}
