🎓 Portal del Estudiante - SPA React
Aplicación web desarrollada en React que permite a estudiantes explorar un catálogo de cursos, inscribirse, y gestionar sus cursos. La aplicación es una Single Page Application (SPA), lo que significa que funciona sin recargar la página al navegar entre secciones.

¿Qué Puede Hacer?
📚 Ver cursos disponibles con información completa (docente, precio, duración, etc.)
🔍 Filtrar y buscar cursos por categoría, modalidad o nombre
✅ Inscribirse y desinscribirse de cursos
📊 Ver el progreso de los cursos en los que estoy inscrito
👤 Ver tu perfil con estadísticas de desempeño
📱 Usar en cualquier dispositivo: funciona en celular, tablet y computadora
⚙️ Tecnologías Usadas
Tecnología	Versión	Para Qué
React	19.2.6	Framework principal (interface)
Vite	8.0.12	Herramienta que empaqueta y ejecuta el código
React Router	7.17.0	Navegación entre páginas sin recargar
Context API	-	Compartir datos entre componentes
CSS	Vanilla	Estilos visuales
📋 Antes de Empezar
Necesitas tener instalado en tu computadora:

Node.js versión 16 o superior (descargar desde nodejs.org)
npm (viene incluido con Node.js)
Para verificar que están instalados, abre una terminal y ejecuta:

node --version
npm --version
Deberías ver números de versión en ambos casos.

🔧 Instalación y Ejecución
Paso 1: Ir a la carpeta del proyecto
Abre una terminal (PowerShell, CMD o bash) y navega a la carpeta del proyecto:

cd c:\Users\SERGIO CASIQUE\Desktop\PA3\Proceso_Aprendizaje3\apps\portal-react\react-spa-PortalDelEstudiante
O si estás en otra ruta, reemplaza la ruta anterior con la correcta en tu computadora.

Paso 2: Instalar las dependencias
Ejecuta este comando para descargar todas las librerías que necesita la aplicación:

npm install
Este proceso puede tardar 1-2 minutos. Verás una carpeta node_modules crearse (no la borres, es importante).

Paso 3: Ejecutar la aplicación
Una vez instaladas las dependencias, inicia el servidor de desarrollo:

npm run dev
Verás algo como:

  VITE v8.0.12  ready in 125 ms

  ➜  Local:   http://localhost:5173/
  ➜  Press h to show help
Paso 4: Acceder a la aplicación
Abre tu navegador (Chrome, Firefox, Edge, Safari) y ve a:

http://localhost:5173
¡La aplicación ya debe estar funcionando! 🎉

🛑 Detener la Aplicación
Para cerrar el servidor, presiona Ctrl + C en la terminal.

� Detener la Aplicación
Para cerrar el servidor, presiona Ctrl + C en la terminal.

📁 Estructura del Proyecto
La carpeta src/ contiene todo el código de la aplicación:

src/
├── components/        → Partes reutilizables (Navbar, TarjetaCurso, Usuario)
├── pages/            → Páginas completas (Catálogo, Mis Inscripciones)
├── context/          → Lugar donde se guarda la información global (cursos, usuario)
├── hooks/            → Funciones personalizadas para acceder a datos
├── utils/            → Funciones auxiliares (formateo de dinero, fechas, etc.)
├── data/             → Información de ejemplo (cursos y inscripciones)
├── styles/           → Archivos CSS para el diseño visual
├── App.jsx           → Archivo principal que une todo
├── main.jsx          → Punto de entrada de la aplicación
└── index.css         → Estilos globales
🧭 Navegación en la Aplicación
La aplicación tiene 3 pantallas principales:

Ruta	Nombre	Qué ves
/	Mis Inscripciones (HOME)	Cursos en los que estás inscrito
/catalogocursos	Catálogo	Todos los cursos disponibles
/usuario	Mi Perfil	Tu información y estadísticas
Puedes navegar entre ellas usando el menú en la parte superior.

🎯 Funcionalidades Principales
1. Catálogo de Cursos
Aquí ves todos los cursos disponibles. Puedes:

Filtrar por categoría (Frontend, Backend, Full Stack, etc.)
Filtrar por modalidad (Virtual, Presencial, Híbrida)
Buscar por nombre del curso, docente o tecnología
Ordenar por: más populares, mejor valorados, más recientes, precio
Inscribirse en cualquier curso con un botón
2. Mis Inscripciones (HOME)
Tu panel personal con:

Estadísticas: cuántos cursos tienes, cuántos estás cursando, cuántos completaste
Pestañas: filtra cursos por estado (Todos, En progreso, Completados)
Barra de progreso: ves qué porcentaje completaste de cada curso
Desinscribirse: si quieres dejar un curso, un botón te permite hacerlo
3. Mi Perfil
Información tuya:

Avatar (tu inicial)
Nombre y email
Estadísticas de desempeño
Botones para editar perfil o cambiar contraseña
📱 Responsive Design
La aplicación se adapta automáticamente:

Celular (menos de 480px): menú hamburguesa, diseño vertical
Tablet (480px a 768px): combinación de vertical y horizontal
Computadora (más de 768px): diseño completo con sidebar
Pruébalo abriendo la app en tu celular o reduciendo el tamaño de la ventana del navegador.

📊 Datos de Ejemplo
La aplicación viene con datos de ejemplo listos para usar:

6 Cursos disponibles:

React Avanzado
Node.js y Express
MongoDB y Bases de Datos
Full Stack Development
Seguridad Web
Docker y DevOps
Usuario de ejemplo:

Nombre: Carlos García
Email: carlos@example.com
Rol: Estudiante
Estos datos están en la carpeta src/data/cursos.js.

🔧 Comandos Útiles
# Iniciar en modo desarrollo
npm run dev

# Crear versión para producción (carpeta 'dist')
npm run build

# Ver la versión de producción localmente
npm run preview

# Verificar errores de código
npm run lint
🚀 Cómo Usar en Producción
Si quieres desplegar la aplicación en internet:

Crear un build: npm run build
Subir a un servidor: puedes usar Vercel, Netlify, GitHub Pages, etc.
Para más detalles, consulta la documentación de cada plataforma.

🐛 Solución de Problemas
Problema: "npm: comando no encontrado"
Solución: Instala Node.js desde nodejs.org

Problema: Puerto 5173 ya está en uso
Solución: El puerto puede estar ocupado por otra aplicación. Intenta:

npm run dev -- --port 3000
Esto usará el puerto 3000 en lugar del 5173.

Problema: La página no se ve actualizada
Solución: Haz refresh en el navegador (F5 o Ctrl + R)

Problema: Los estilos no cargan
Solución: Abre la consola del navegador (F12) y verifica si hay errores en rojo.

📚 Aprender Más
Para modificar o extender la aplicación, necesitas entender:

React: react.dev (documentación oficial)
JavaScript: Conceptos básicos de variables, funciones, arrays
CSS: Conceptos básicos de selectores, propiedades, flexbox
React Router: reactrouter.com (para agregar más rutas)
📞 Preguntas Frecuentes
P: ¿Dónde están guardados los cursos?
R: En la carpeta src/data/cursos.js. Son datos de ejemplo, no una base de datos real.

P: ¿Cómo conecto a una base de datos de verdad?
R: Necesitarías crear una API backend (con Node.js, Python, etc.) y modificar el archivo src/context/CursosContext.jsx para hacer peticiones HTTP en lugar de usar datos locales.

P: ¿Puedo cambiar los colores?
R: Sí, edita el archivo src/index.css y cambia las variables de color en la sección :root.

P: ¿Qué pasa si cierro la ventana del navegador?
R: Las inscripciones se guardan en la memoria de la aplicación. Si recargas, se reinician. Para persistencia permanente, necesitarías una base de datos.

✨ Características de la Aplicación
✅ Componentes reutilizables
✅ Estado global con Context API
✅ Navegación sin recarga de página (SPA)
✅ Responsive en todos los dispositivos
✅ Interfaz moderna y profesional
✅ Código limpio y bien estructurado
✅ Fácil de modificar y extender

Última actualización: 8 de Junio de 2026
Estado: ✅ Listo para usar
