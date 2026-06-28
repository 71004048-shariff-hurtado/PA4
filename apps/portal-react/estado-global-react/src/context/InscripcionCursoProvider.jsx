import { useState, useMemo } from "react";
import { InscripcionCursoContext } from "./InscripcionCursoContext";

export const InscripcionCursoProvider = ({ children }) => {
  const [inscripciones, setInscripciones] = useState([
    {
      id: 2,
      title: "Desarrollo Frontend con React",
      category: "Full Stack",
      instructor: "María Torres",
      hours: 60,
      price: 180,
      date: "15 feb 2024",
      format: "Virtual",
      progress: 72,
      status: "En progreso",
      icon: "⚡",
      gradient: "linear-gradient(135deg,#1a1a2e,#7c3aed)"
    },
    {
      id: 3,
      title: "Backend con Node.js",
      category: "Backend",
      instructor: "Luis Ramírez",
      hours: 55,
      price: 150,
      date: "01 mar 2024",
      format: "Virtual",
      progress: 38,
      status: "En progreso",
      icon: "🚀",
      gradient: "linear-gradient(135deg,#064e3b,#059669)"
    },
    {
      id: 1,
      title: "Programación Web II",
      category: "Frontend",
      instructor: "Juan Pérez",
      hours: 40,
      price: 120,
      date: "10 ene 2024",
      format: "Híbrida",
      progress: 100,
      status: "Completado",
      icon: "⚛️",
      gradient: "linear-gradient(135deg,#1e3a5f,#2563eb)"
    }
  ]);

  // Función para inscribir un nuevo curso
  const inscribirCurso = (curso) => {
    // Verificar si ya está inscrito
    if (inscripciones.some((ins) => ins.id === curso.id)) {
      return;
    }

    const hoy = new Date();
    const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    const fechaFormateada = `${hoy.getDate().toString().padStart(2, '0')} ${meses[hoy.getMonth()]} ${hoy.getFullYear()}`;

    const nuevaInscripcion = {
      id: curso.id,
      title: curso.title,
      category: curso.category,
      instructor: curso.instructor,
      hours: curso.hours,
      price: curso.price,
      date: fechaFormateada,
      format: curso.format || "Virtual",
      progress: 0,
      status: "En progreso",
      icon: curso.icon,
      gradient: curso.gradient
    };

    setInscripciones([...inscripciones, nuevaInscripcion]);
  };

  // Función para simular/actualizar el progreso
  const actualizarProgreso = (id, nuevoProgreso) => {
    setInscripciones((prev) =>
      prev.map((ins) => {
        if (ins.id === id) {
          const prog = Math.min(100, Math.max(0, nuevoProgreso));
          return {
            ...ins,
            progress: prog,
            status: prog === 100 ? "Completado" : "En progreso"
          };
        }
        return ins;
      })
    );
  };

  // Métricas calculadas
  const metricas = useMemo(() => {
    const totalInvertido = inscripciones.reduce((sum, ins) => sum + ins.price, 0);
    const totalHoras = inscripciones.reduce((sum, ins) => sum + ins.hours, 0);
    const promedioAvance = inscripciones.length > 0
      ? Math.round(inscripciones.reduce((sum, ins) => sum + ins.progress, 0) / inscripciones.length)
      : 0;

    return {
      totalInvertido,
      totalHoras,
      promedioAvance
    };
  }, [inscripciones]);

  return (
    <InscripcionCursoContext.Provider
      value={{
        inscripciones,
        inscribirCurso,
        actualizarProgreso,
        metricas
      }}
    >
      {children}
    </InscripcionCursoContext.Provider>
  );
};
