import { useState } from "react";
import { CursoContext } from "./CursoContext";

export const CursoProvider = ({ children }) => {
  const [cursos] = useState([
    {
      id: 1,
      title: "Programación Web II",
      category: "Frontend",
      instructor: "Juan Pérez",
      rating: 4.8,
      hours: 40,
      format: "Virtual",
      students: 320,
      price: 120,
      badge: "Frontend",
      badgeClass: "badge-primary",
      icon: "⚛️",
      gradient: "linear-gradient(135deg, #1e3a5f, #2563eb)"
    },
    {
      id: 2,
      title: "Desarrollo Frontend con React",
      category: "Full Stack",
      instructor: "María Torres",
      rating: 4.9,
      hours: 60,
      format: "Híbrida",
      students: 510,
      price: 180,
      badge: "Full Stack",
      badgeClass: "badge-accent",
      icon: "⚡",
      gradient: "linear-gradient(135deg, #1a1a2e, #7c3aed)"
    },
    {
      id: 3,
      title: "Backend con Node.js",
      category: "Backend",
      instructor: "Luis Ramírez",
      rating: 4.7,
      hours: 55,
      format: "Virtual",
      students: 280,
      price: 150,
      badge: "Backend",
      badgeClass: "badge-success",
      icon: "🚀",
      gradient: "linear-gradient(135deg, #064e3b, #059669)"
    },
    {
      id: 4,
      title: "Seguridad en Aplicaciones Web",
      category: "Seguridad",
      instructor: "Juan Pérez",
      rating: 4.9,
      hours: 35,
      format: "Híbrida",
      students: 190,
      price: 200,
      badge: "Seguridad",
      badgeClass: "badge-warning",
      icon: "🔐",
      gradient: "linear-gradient(135deg, #431407, #ea580c)"
    },
    {
      id: 5,
      title: "Bases de Datos NoSQL",
      category: "Base de Datos",
      instructor: "María Torres",
      rating: 4.6,
      hours: 30,
      format: "Virtual",
      students: 145,
      price: 0,
      badge: "Base de Datos",
      badgeClass: "badge-primary",
      icon: "🗃️",
      gradient: "linear-gradient(135deg, #1e1b4b, #4338ca)"
    },
    {
      id: 6,
      title: "DevOps y CI/CD con GitHub Actions",
      category: "DevOps",
      instructor: "Luis Ramírez",
      rating: 4.8,
      hours: 45,
      format: "Virtual",
      students: 220,
      price: 160,
      badge: "DevOps",
      badgeClass: "badge-gray",
      icon: "🔧",
      gradient: "linear-gradient(135deg, #0c4a6e, #0891b2)"
    }
  ]);

  return (
    <CursoContext.Provider value={{ cursos }}>
      {children}
    </CursoContext.Provider>
  );
};