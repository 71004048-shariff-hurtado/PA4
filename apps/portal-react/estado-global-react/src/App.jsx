import { useState, useContext } from "react";
import { CursoProvider, InscripcionCursoProvider, CursoContext, InscripcionCursoContext } from "./context";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Curso } from "./components/Curso";
import { InscripcionCurso } from "./components/InscripcionCurso";

function MainApp() {
  const [vistaActiva, setVistaActiva] = useState("inicio");

  // Contextos
  const { cursos } = useContext(CursoContext);
  const { inscripciones, metricas } = useContext(InscripcionCursoContext);

  // Estados de Filtros para Catálogo
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("Más populares");
  const [nivelTab, setNivelTab] = useState("Todos");

  // Estados de Filtros para Inscripciones
  const [inscripcionTab, setInscripcionTab] = useState("Todos");

  // --- FILTRADO Y ORDENACIÓN DE CURSOS ---
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const limpiarFiltros = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSortBy("Más populares");
    setNivelTab("Todos");
  };

  const filteredCursos = cursos.filter((curso) => {
    // Búsqueda por texto
    const matchesSearch =
      curso.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      curso.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      curso.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtro por categoría (vacío significa todas)
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(curso.category);

    // Filtro por nivel (simulado con la categoría o nivel correspondiente)
    let matchesNivel = true;
    if (nivelTab !== "Todos") {
      if (nivelTab === "Básico") {
        matchesNivel = curso.price === 0 || curso.hours <= 35; // Gratuito o corto
      } else if (nivelTab === "Intermedio") {
        matchesNivel = curso.hours > 35 && curso.hours <= 50;
      } else if (nivelTab === "Avanzado") {
        matchesNivel = curso.hours > 50;
      }
    }

    return matchesSearch && matchesCategory && matchesNivel;
  });

  const sortedCursos = [...filteredCursos].sort((a, b) => {
    if (sortBy === "Mejor valorados") {
      return b.rating - a.rating;
    }
    if (sortBy === "Precio: menor a mayor") {
      return a.price - b.price;
    }
    if (sortBy === "Más recientes") {
      return a.id - b.id; // Simulado
    }
    // "Más populares" (por número de alumnos)
    return b.students - a.students;
  });

  // --- FILTRADO DE INSCRIPCIONES ---
  const filteredInscripciones = inscripciones.filter((ins) => {
    if (inscripcionTab === "En progreso") {
      return ins.status === "En progreso";
    }
    if (inscripcionTab === "Completados") {
      return ins.status === "Completado";
    }
    return true; // "Todos"
  });

  return (
    <div id="root-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar vistaActiva={vistaActiva} setVistaActiva={setVistaActiva} />

      <main className="page-content" style={{ flexGrow: 1 }}>
        {/* ================================================================= */}
        {/* VISTA: INICIO                                                     */}
        {/* ================================================================= */}
        {vistaActiva === "inicio" && (
          <>
            {/* HERO */}
            <section className="hero" aria-labelledby="hero-heading">
              <div className="container">
                <div className="hero-content">
                  <div className="hero-eyebrow" aria-label="Certificados por universidades">
                    ✦ Plataforma académica certificada
                  </div>
                  <h1 id="hero-heading" className="hero-title">
                    Aprende, crece y<br />
                    <span className="highlight">lidera el futuro</span><br />
                    tecnológico
                  </h1>
                  <p className="hero-subtitle">
                    Formación de calidad universitaria en programación, desarrollo web, backend, bases de datos y más. Accede desde cualquier dispositivo.
                  </p>
                  <div className="hero-actions">
                    <button onClick={() => setVistaActiva("cursos")} className="btn btn-primary btn-lg">
                      Explorar cursos
                    </button>
                    <button
                      onClick={() => setVistaActiva("mis-inscripciones")}
                      className="btn btn-secondary btn-lg"
                      style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,.4)", marginLeft: "10px" }}
                    >
                      Ver mi panel
                    </button>
                  </div>
                  <div className="hero-stats" role="list" aria-label="Estadísticas de la plataforma">
                    <div className="hero-stat" role="listitem">
                      <div className="value">1,240+</div>
                      <div className="label">Estudiantes activos</div>
                    </div>
                    <div className="hero-stat" role="listitem">
                      <div className="value">{cursos.length}</div>
                      <div className="label">Cursos disponibles</div>
                    </div>
                    <div className="hero-stat" role="listitem">
                      <div className="value">12</div>
                      <div className="label">Docentes expertos</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* BENEFICIOS */}
            <section className="section bg-gray" id="beneficios" aria-labelledby="beneficios-heading">
              <div className="container">
                <div className="section-header">
                  <span className="section-label">¿Por qué EduTech?</span>
                  <h2 id="beneficios-heading" className="section-title">Todo lo que necesitas para aprender</h2>
                  <p className="section-subtitle">Una plataforma pensada para estudiantes universitarios y profesionales que buscan crecer en tecnología.</p>
                </div>
                <div className="grid grid-3">
                  <article className="benefit-card">
                    <div className="benefit-icon" style={{ background: "var(--primary-100)" }} aria-hidden="true">📖</div>
                    <h3>Cursos estructurados</h3>
                    <p>Contenido organizado por módulos, sesiones y actividades prácticas, diseñados por docentes universitarios con experiencia real en la industria.</p>
                  </article>
                  <article className="benefit-card">
                    <div className="benefit-icon" style={{ background: "var(--accent-100)" }} aria-hidden="true">🖥️</div>
                    <h3>Acceso multiplataforma</h3>
                    <p>Estudia desde tu computador, tablet o celular. Tu progreso se sincroniza automáticamente en todos tus dispositivos.</p>
                  </article>
                  <article className="benefit-card">
                    <div className="benefit-icon" style={{ background: "var(--success-100)" }} aria-hidden="true">🏆</div>
                    <h3>Certificados reconocidos</h3>
                    <p>Al completar cada curso obtienes un certificado de finalización con aval académico, útil para tu portafolio profesional.</p>
                  </article>
                  <article className="benefit-card">
                    <div className="benefit-icon" style={{ background: "var(--warning-100)" }} aria-hidden="true">⚡</div>
                    <h3>Aprendizaje activo</h3>
                    <p>Ejercicios prácticos, proyectos reales y evaluaciones formativas que refuerzan cada concepto aprendido.</p>
                  </article>
                  <article className="benefit-card">
                    <div className="benefit-icon" style={{ background: "var(--danger-100)" }} aria-hidden="true">👥</div>
                    <h3>Comunidad de aprendizaje</h3>
                    <p>Conecta con compañeros y docentes a través de foros, sesiones en vivo y grupos de estudio colaborativo.</p>
                  </article>
                  <article className="benefit-card">
                    <div className="benefit-icon" style={{ background: "var(--primary-100)" }} aria-hidden="true">📊</div>
                    <h3>Seguimiento de avance</h3>
                    <p>Visualiza tu progreso en tiempo real con métricas claras sobre tu rendimiento, asistencia y finalización de actividades.</p>
                  </article>
                </div>
              </div>
            </section>

            {/* CURSOS DESTACADOS */}
            <section className="section" aria-labelledby="cursos-destacados-heading">
              <div className="container">
                <div className="section-header">
                  <span className="section-label">Cursos destacados</span>
                  <h2 id="cursos-destacados-heading" className="section-title">Los más populares este semestre</h2>
                  <p className="section-subtitle">Seleccionados por nuestros docentes y calificados por estudiantes activos.</p>
                </div>
                <div className="grid grid-3">
                  {cursos.slice(0, 3).map((curso) => (
                    <Curso key={curso.id} curso={curso} />
                  ))}
                </div>
                <div style={{ textAlign: "center", marginTop: "var(--space-10)" }}>
                  <button onClick={() => setVistaActiva("cursos")} className="btn btn-secondary btn-lg">
                    Ver todos los cursos →
                  </button>
                </div>
              </div>
            </section>

            {/* DOCENTES */}
            <section className="section bg-gray" aria-labelledby="docentes-heading">
              <div className="container">
                <div className="section-header">
                  <span className="section-label">Nuestro equipo</span>
                  <h2 id="docentes-heading" className="section-title">Docentes expertos en tecnología</h2>
                  <p className="section-subtitle">Profesionales activos en la industria que comparten su experiencia real.</p>
                </div>
                <div className="grid grid-3">
                  <div className="card" style={{ textAlign: "center" }}>
                    <div className="avatar xl" style={{ margin: "0 auto var(--space-4)" }} aria-label="Foto de Juan Pérez">JP</div>
                    <h4>Juan Pérez</h4>
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--primary-600)", fontWeight: 600, marginBottom: "var(--space-2)" }}>Especialista Frontend</p>
                    <p style={{ fontSize: "var(--text-sm)" }}>10 años de experiencia en React, Vue y Angular. Ex-developer en startups de Lima.</p>
                    <div style={{ marginTop: "var(--space-4)", display: "flex", justifyContent: "center", gap: "var(--space-2)" }}>
                      <span className="badge badge-primary no-dot">React</span>
                      <span className="badge badge-accent no-dot">Vue</span>
                      <span className="badge badge-gray no-dot">TypeScript</span>
                    </div>
                  </div>
                  <div className="card" style={{ textAlign: "center" }}>
                    <div className="avatar xl" style={{ margin: "0 auto var(--space-4)", background: "linear-gradient(135deg,#7c3aed,#ec4899)" }} aria-label="Foto de María Torres">MT</div>
                    <h4>María Torres</h4>
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--accent-600)", fontWeight: 600, marginBottom: "var(--space-2)" }}>Arquitecta Full Stack</p>
                    <p style={{ fontSize: "var(--text-sm)" }}>Arquitecta de software con enfoque en sistemas distribuidos, MongoDB y microservicios.</p>
                    <div style={{ marginTop: "var(--space-4)", display: "flex", justifyContent: "center", gap: "var(--space-2)" }}>
                      <span className="badge badge-success no-dot">Node.js</span>
                      <span className="badge badge-primary no-dot">MongoDB</span>
                      <span className="badge badge-gray no-dot">Docker</span>
                    </div>
                  </div>
                  <div className="card" style={{ textAlign: "center" }}>
                    <div className="avatar xl" style={{ margin: "0 auto var(--space-4)", background: "linear-gradient(135deg,#059669,#0891b2)" }} aria-label="Foto de Luis Ramírez">LR</div>
                    <h4>Luis Ramírez</h4>
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--success-600)", fontWeight: 600, marginBottom: "var(--space-2)" }}>Ingeniero DevOps</p>
                    <p style={{ fontSize: "var(--text-sm)" }}>DevOps engineer con experiencia en AWS, CI/CD pipelines y automatización de infraestructura.</p>
                    <div style={{ marginTop: "var(--space-4)", display: "flex", justifyContent: "center", gap: "var(--space-2)" }}>
                      <span className="badge badge-warning no-dot">AWS</span>
                      <span className="badge badge-gray no-dot">Kubernetes</span>
                      <span className="badge badge-success no-dot">Terraform</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="cta-section" aria-labelledby="cta-heading">
              <div className="container">
                <h2 id="cta-heading">¿Listo para comenzar tu formación?</h2>
                <p>Únete a más de 1,200 estudiantes que ya están construyendo su futuro en tecnología con EduTech Academy.</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
                  <button onClick={() => setVistaActiva("cursos")} className="btn btn-lg" style={{ background: "var(--white)", color: "var(--primary-600)", fontWeight: 700 }}>
                    Explorar Catálogo
                  </button>
                  <button onClick={() => setVistaActiva("mis-inscripciones")} className="btn btn-lg" style={{ background: "transparent", color: "var(--white)", border: "2px solid rgba(255,255,255,.5)" }}>
                    Ver Mis Cursos →
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ================================================================= */}
        {/* VISTA: CURSOS (CATÁLOGO)                                          */}
        {/* ================================================================= */}
        {vistaActiva === "cursos" && (
          <>
            {/* PAGE HEADER */}
            <section style={{ background: "linear-gradient(135deg,var(--gray-900),#1e1b4b)", padding: "var(--space-12) 0" }} aria-labelledby="catalog-heading">
              <div className="container">
                <nav className="breadcrumb" aria-label="Ruta de navegación">
                  <a href="#inicio" onClick={(e) => { e.preventDefault(); setVistaActiva("inicio"); }}>Inicio</a>
                  <span className="separator" aria-hidden="true">›</span>
                  <span className="current">Cursos</span>
                </nav>
                <h1 id="catalog-heading" style={{ color: "var(--white)", marginBottom: "var(--space-3)", textAlign: "left" }}>Catálogo de cursos</h1>
                <p style={{ color: "var(--gray-400)", fontSize: "var(--text-lg)", textAlign: "left" }}>Explora nuestra oferta académica y encuentra el curso ideal para tu carrera.</p>
              </div>
            </section>

            <section className="section-sm">
              <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "var(--space-8)", alignItems: "start" }} id="catalog-layout">
                  {/* FILTROS LATERALES */}
                  <aside aria-label="Filtros de búsqueda" style={{ position: "sticky", top: "calc(var(--navbar-height) + var(--space-4))" }}>
                    <div className="card">
                      <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 className="card-title" style={{ fontSize: "var(--text-base)", margin: 0 }}>🔍 Filtros</h3>
                        <button className="btn btn-ghost btn-sm" type="button" onClick={limpiarFiltros} aria-label="Limpiar filtros">
                          Limpiar
                        </button>
                      </div>

                      {/* Buscador */}
                      <div style={{ marginBottom: "var(--space-5)" }}>
                        <div className="form-label" style={{ marginBottom: "var(--space-3)" }}>Buscar curso</div>
                        <div className="search-bar" style={{ display: "flex", alignItems: "center", background: "#f4f3ec", borderRadius: "6px", padding: "0 10px" }}>
                          <span aria-hidden="true" style={{ marginRight: "8px" }}>🔍</span>
                          <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Nombre o docente..."
                            aria-label="Buscar curso"
                            style={{ border: "none", background: "transparent", outline: "none", width: "100%", padding: "8px 0" }}
                          />
                        </div>
                      </div>

                      {/* Categorías */}
                      <div style={{ marginBottom: "var(--space-5)" }}>
                        <div className="form-label" style={{ marginBottom: "var(--space-3)" }}>Categoría</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                          {["Frontend", "Backend", "Full Stack", "Seguridad", "Base de Datos", "DevOps"].map((cat) => {
                            const count = cursos.filter((c) => c.category === cat).length;
                            return (
                              <label className="checkbox-group" key={cat} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                                <input
                                  type="checkbox"
                                  checked={selectedCategories.includes(cat)}
                                  onChange={() => handleCategoryChange(cat)}
                                  aria-label={`Filtrar ${cat}`}
                                />
                                {cat}
                                <span className="badge badge-gray no-dot" style={{ marginLeft: "auto" }}>
                                  {count}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Docente */}
                      <div style={{ marginBottom: "var(--space-5)" }}>
                        <div className="form-label" style={{ marginBottom: "var(--space-3)" }}>Docente</div>
                        <select
                          className="form-control"
                          value={
                            searchQuery === "Juan Pérez"
                              ? "Juan Pérez"
                              : searchQuery === "María Torres"
                              ? "María Torres"
                              : searchQuery === "Luis Ramírez"
                              ? "Luis Ramírez"
                              : ""
                          }
                          onChange={(e) => setSearchQuery(e.target.value)}
                          aria-label="Seleccionar docente"
                          style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid var(--border)" }}
                        >
                          <option value="">Todos los docentes</option>
                          <option value="Juan Pérez">Juan Pérez</option>
                          <option value="María Torres">María Torres</option>
                          <option value="Luis Ramírez">Luis Ramírez</option>
                        </select>
                      </div>

                      {/* Info general */}
                      <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "20px" }}>
                        * Los niveles se calculan por las horas de duración.
                      </div>
                    </div>
                  </aside>

                  {/* RESULTADOS */}
                  <div>
                    {/* Toolbar */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-6)", flexWrap: "wrap", gap: "var(--space-3)" }}>
                      <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", margin: 0 }}>
                        Mostrando <strong>{sortedCursos.length} cursos</strong>
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                        <label htmlFor="sort" className="form-label" style={{ margin: 0, whiteSpace: "nowrap" }}>Ordenar por:</label>
                        <select
                          id="sort"
                          className="form-control"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          aria-label="Ordenar cursos"
                          style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--border)" }}
                        >
                          <option value="Más populares">Más populares</option>
                          <option value="Mejor valorados">Mejor valorados</option>
                          <option value="Precio: menor a mayor">Precio: menor a mayor</option>
                          <option value="Más recientes">Más recientes</option>
                        </select>
                      </div>
                    </div>

                    {/* Tabs por nivel */}
                    <div className="tabs" role="tablist" aria-label="Filtrar por nivel" style={{ marginBottom: "20px" }}>
                      {["Todos", "Básico", "Intermedio", "Avanzado"].map((n) => (
                        <button
                          key={n}
                          className={`tab-item ${nivelTab === n ? "active" : ""}`}
                          role="tab"
                          aria-selected={nivelTab === n}
                          onClick={() => setNivelTab(n)}
                        >
                          {n}
                        </button>
                      ))}
                    </div>

                    {/* Grid de cursos */}
                    {sortedCursos.length > 0 ? (
                      <div className="grid grid-3" role="list" aria-label="Listado de cursos">
                        {sortedCursos.map((curso) => (
                          <Curso key={curso.id} curso={curso} />
                        ))}
                      </div>
                    ) : (
                      <div className="card" style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
                        <div style={{ fontSize: "2rem", marginBottom: "10px" }}>🔍</div>
                        <h3>No se encontraron cursos</h3>
                        <p>Intenta limpiar los filtros para ver todos los cursos disponibles.</p>
                        <button className="btn btn-primary" onClick={limpiarFiltros} style={{ marginTop: "15px" }}>
                          Limpiar Filtros
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ================================================================= */}
        {/* VISTA: MIS INSCRIPCIONES                                          */}
        {/* ================================================================= */}
        {vistaActiva === "mis-inscripciones" && (
          <div className="container" style={{ padding: "var(--space-8) 0" }}>
            <div className="layout-with-sidebar">
              {/* SIDEBAR */}
              <aside className="sidebar" id="sidebar" aria-label="Menú lateral">
                <div className="sidebar-header">
                  <div className="sidebar-user">
                    <div className="avatar" aria-label="Foto de Carlos García">CG</div>
                    <div className="user-info">
                      <div className="name">Carlos García</div>
                      <div className="role">Estudiante</div>
                    </div>
                  </div>
                  <div className="sidebar-title">Panel estudiantil</div>
                </div>
                <nav className="sidebar-nav" aria-label="Navegación del panel">
                  <a href="#inicio" onClick={(e) => { e.preventDefault(); setVistaActiva("inicio"); }}>
                    <span className="nav-icon" aria-hidden="true">🏠</span> Inicio
                  </a>
                  <a href="#mis-inscripciones" className="active" aria-current="page">
                    <span className="nav-icon" aria-hidden="true">📚</span> Mis inscripciones
                    <span className="sidebar-badge">{inscripciones.length}</span>
                  </a>
                  <a href="#cursos" onClick={(e) => { e.preventDefault(); setVistaActiva("cursos"); }}>
                    <span className="nav-icon" aria-hidden="true">🔍</span> Explorar
                  </a>
                </nav>
              </aside>

              {/* MAIN CONTENT */}
              <main className="main-content" style={{ flexGrow: 1 }}>
                <nav className="breadcrumb" aria-label="Ruta de navegación">
                  <a href="#inicio" onClick={(e) => { e.preventDefault(); setVistaActiva("inicio"); }}>Mi panel</a>
                  <span className="separator" aria-hidden="true">›</span>
                  <span className="current">Mis inscripciones</span>
                </nav>

                <div className="page-header">
                  <div className="page-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h1 className="page-title" style={{ margin: 0, textAlign: "left" }}>Mis inscripciones</h1>
                      <p className="page-subtitle" style={{ textAlign: "left" }}>Gestiona y da seguimiento a todos tus cursos inscritos.</p>
                    </div>
                    <button onClick={() => setVistaActiva("cursos")} className="btn btn-primary">
                      + Nuevo curso
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="tabs" role="tablist" aria-label="Filtrar inscripciones" style={{ marginBottom: "20px" }}>
                  <button
                    className={`tab-item ${inscripcionTab === "Todos" ? "active" : ""}`}
                    role="tab"
                    aria-selected={inscripcionTab === "Todos"}
                    onClick={() => setInscripcionTab("Todos")}
                  >
                    Todos ({inscripciones.length})
                  </button>
                  <button
                    className={`tab-item ${inscripcionTab === "En progreso" ? "active" : ""}`}
                    role="tab"
                    aria-selected={inscripcionTab === "En progreso"}
                    onClick={() => setInscripcionTab("En progreso")}
                  >
                    En progreso ({inscripciones.filter((i) => i.status === "En progreso").length})
                  </button>
                  <button
                    className={`tab-item ${inscripcionTab === "Completados" ? "active" : ""}`}
                    role="tab"
                    aria-selected={inscripcionTab === "Completados"}
                    onClick={() => setInscripcionTab("Completados")}
                  >
                    Completados ({inscripciones.filter((i) => i.status === "Completado").length})
                  </button>
                </div>

                {/* Tabla de inscripciones */}
                {filteredInscripciones.length > 0 ? (
                  <div className="table-wrapper">
                    <table className="table" aria-label="Tabla de inscripciones">
                      <thead>
                        <tr>
                          <th scope="col" style={{ textAlign: "left" }}>Curso</th>
                          <th scope="col">Docente</th>
                          <th scope="col">Fecha de inscripción</th>
                          <th scope="col">Modalidad</th>
                          <th scope="col">Progreso</th>
                          <th scope="col">Estado</th>
                          <th scope="col">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInscripciones.map((ins) => (
                          <InscripcionCurso key={ins.id} inscripcion={ins} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="card" style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "10px" }}>📚</div>
                    <h3>No tienes cursos en esta categoría</h3>
                    <p>Puedes matricularte en nuevos cursos desde el catálogo.</p>
                    <button className="btn btn-primary" onClick={() => setVistaActiva("cursos")} style={{ marginTop: "15px" }}>
                      Ver Catálogo de Cursos
                    </button>
                  </div>
                )}

                {/* Resumen estadístico */}
                <div className="grid grid-3" style={{ marginTop: "var(--space-8)" }}>
                  <div className="card" style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "var(--primary-600)" }}>
                      S/ {metricas.totalInvertido}
                    </div>
                    <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Total invertido</div>
                  </div>
                  <div className="card" style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "var(--success-600)" }}>
                      {metricas.totalHoras}h
                    </div>
                    <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Horas acumuladas</div>
                  </div>
                  <div className="card" style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "var(--accent-600)" }}>
                      {metricas.promedioAvance}%
                    </div>
                    <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>Promedio de avance</div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CursoProvider>
      <InscripcionCursoProvider>
        <MainApp />
      </InscripcionCursoProvider>
    </CursoProvider>
  );
}