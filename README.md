# 🎓 EduTech Academy - Experiencia Integrada (PA4)

## 👥 Integrantes del Grupo
* **AARON SHARIFF HURTADO SANTAMARIA** (100% de participación)
* **SERGIO QUISPILLOCLLA** (100% de participación)
* **VICTOR CHAVEZ AGUILAR** (100% de participación)


## 🎥 Video de Sustentación en YouTube
El video explicativo del proyecto, detallando la arquitectura se encuentra disponible en el siguiente enlace:

📺 Enlace de Youtube: **[]https://youtu.be/tNaWcJnIGzw()**

---

## 📝 Descripción del Proyecto
Este proyecto es una solución integral para la **Gestión de Cursos e Inscripciones** de la institución **EduTech Academy**. La arquitectura se encuentra desacoplada y organizada en tres grandes módulos a fin de separar responsabilidades técnicas y optimizar el rendimiento:

1. **Backend REST API**: Desarrollado con Node.js, Express y MongoDB, encargado de proveer la persistencia de datos (cursos, usuarios, inscripciones), cifrado de contraseñas (`bcryptjs`) y control de acceso con seguridad basada en tokens (**JWT**).
2. **Portal del Estudiante (React SPA)**: Aplicación cliente interactiva desarrollada en **React (Vite)** para alumnos autenticados. Permite visualizar el panel de inscripciones, explorar cursos, ver el detalle dinámico de un curso e inscribirse o desinscribirse en tiempo real.
3. **Sitio Público y Catálogo (Next.js)**: Módulo web público y optimizado para SEO desarrollado con **Next.js (App Router)**. Permite que usuarios visitantes no autenticados y motores de búsqueda naveguen por la página de inicio, conozcan las estadísticas de la academia y accedan al catálogo y fichas dinámicas de cursos cargadas del backend mediante **Server-Side Rendering (SSR)**.

---

## ⚙️ Tecnologías Usadas

| Capa / Tecnología | Herramienta / Librería | Propósito |
| :--- | :--- | :--- |
| **Base de Datos** | MongoDB & Mongoose | Persistencia documental y modelado relacional de datos. |
| **Backend REST API** | Node.js, Express, Helmet, CORS | Lógica de negocio, middleware de protección y endpoints seguros. |
| **Seguridad Backend** | JSON Web Tokens (JWT) & Bcryptjs | Emisión de sesiones seguras firmadas y hash de contraseñas. |
| **Frontend SPA Portal** | React 19, Vite, React Router 7 | Portal privado con navegación interactiva sin recarga de página. |
| **Conectividad SPA** | Axios | Cliente HTTP con interceptores automáticos de inyección y expiración de tokens. |
| **Frontend Público (SEO)** | Next.js 16 (App Router) | Páginas de inicio, catálogo y detalle con SSR y compatibilidad estática. |
| **Estilos Visuales** | Vanilla CSS | Diseño de interfaces responsive de primer nivel sin librerías pesadas. |

---

## 📁 Estructura del Repositorio
```text
PA4/
├── README.md               → Documentación principal del proyecto integrador.
├── .env.example            → Archivo plantilla con las variables de entorno de todos los proyectos.
│
├── backend/
│   └── api-node-express/
│       └── proyecto-node-mongodb/
│           ├── config/     → Conexión a Mongoose.
│           ├── controllers/→ Lógica de Cursos, Autenticación e Inscripciones.
│           ├── middleware/ → Validador de firma y expiración del JWT (protegerRuta).
│           ├── models/     → Esquemas de base de datos (Curso, User, Enrollment).
│           ├── routes/     → Endpoints expuestos de la API REST.
│           ├── seed.js     → Script de precarga de base de datos.
│           └── server.js   → Punto de entrada del servidor Express (Puerto 5000).
│
├── apps/
│   ├── portal-react/
│   │   └── react-spa-PortalDelEstudiante/
│   │       ├── src/
│   │       │   ├── components/ → Navbar, TarjetaCurso, ProtectedRoute.
│   │       │   ├── context/    → CursosContext (llamadas API, login, logout, estados).
│   │       │   ├── pages/      → CursosDelEstudiante (Home), CatalogoCursos, DetalleCurso, Login.
│   │       │   └── services/   → api.js (Cliente HTTP Axios centralizado).
│   │       └── package.json    → Scripts de desarrollo y producción (Puerto 5173).
│   │
│   └── landing-next/           → Proyecto Next.js (Puerto 3000).
│       └── src/
│           └── app/
│               ├── cursos/     → Catálogo de cursos con carga del lado del servidor (SSR).
│               ├── cursos/[id]/→ Ficha dinámica del curso optimizada para SEO.
│               ├── layout.js   → Estructura global (Navbar público y Footer).
│               └── page.js     → Página de inicio pública (Landing Page).
```

---

## 📋 Variables de Entorno (.env)
Se ha provisto un archivo `.env.example` en la raíz. Para desarrollo local, crea los correspondientes archivos `.env` en cada módulo:

* **En el Backend (`backend/api-node-express/proyecto-node-mongodb/.env`)**:
  ```env
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/bd_portal_estudiante
  JWT_SECRET=tu_clave_secreta_super_segura_aqui
  ```
* **En el Cliente Next.js (`apps/landing-next/.env.local`)**:
  ```env
  API_URL=http://localhost:5000/api
  NEXT_PUBLIC_API_URL=http://localhost:5000/api
  ```
* **En la SPA React (`apps/portal-react/react-spa-PortalDelEstudiante/.env`)** (Opcional, por defecto usa fallback a localhost:5000):
  ```env
  VITE_API_URL=http://localhost:5000/api
  ```

---

## 🔧 Instrucciones de Instalación y Ejecución

Sigue estos pasos en orden para iniciar la solución en tu máquina local:

### Paso 1: Prerrequisitos
Asegúrate de tener instalado en tu sistema:
* **Node.js** (versión 18 o superior) e instalado y ejecutándose una instancia local de **MongoDB** en el puerto por defecto `27017`.

---

### Paso 2: Configuración y Siembra del Backend
Abre una terminal en la carpeta del backend, instala las dependencias y ejecuta el script de siembra para precargar los cursos y el usuario de prueba:

```bash
cd backend/api-node-express/proyecto-node-mongodb
npm install

# (Asegúrate de configurar tu .env antes de este paso si tu MongoDB no corre en localhost)
npm run seed
```
El script mostrará un mensaje indicando que se han creado los cursos, el estudiante de prueba (`carlos@example.com` / `123456`) e inscripciones simuladas.

Para iniciar el servidor Express en modo desarrollo:
```bash
npm run dev
# El backend iniciará en http://localhost:5000
```

---

### Paso 3: Lanzar el Portal del Estudiante (React SPA)
Abre otra terminal en la carpeta del portal de React, instala las dependencias e inicia el servidor Vite:

```bash
cd apps/portal-react/react-spa-PortalDelEstudiante
npm install
npm run dev
# La aplicación abrirá en http://localhost:5173
```

---

### Paso 4: Lanzar el Módulo Público (Next.js)
Abre una tercera terminal en la carpeta del sitio de Next.js, instala las dependencias e inicia el servidor de desarrollo:

```bash
cd apps/landing-next
npm install
npm run dev
# La aplicación pública abrirá en http://localhost:3000
```

---

### 🔑 Credenciales y Accesos Rápidos para Validación

Una vez iniciados todos los servicios, se puede acceder y evaluar la solución utilizando las siguientes direcciones y credenciales de prueba pre-cargadas:

* **Portal del Estudiante (React SPA):** [http://localhost:5173/](http://localhost:5173/)
* **Sitio Público y Catálogo (Next.js):** [http://localhost:3000/](http://localhost:3000/)
* **Backend REST API:** [http://localhost:5000/api](http://localhost:5000/api)

#### 👥 Usuario de Prueba (Estudiante Demo):
* **Correo:** `carlos@example.com`
* **Contraseña:** `123456`

---

## 🔒 Mecanismo Responsable de Sesión y Token JWT
El sistema aplica un flujo de autenticación robusto basado en tokens JWT (JSON Web Tokens):

1. **Almacenamiento del Token**: Una vez que el estudiante ingresa credenciales correctas en la vista de Login de la SPA React, la API responde con un token firmado. El cliente guarda este token en `localStorage` bajo el nombre `token`.
2. **Inyección en Peticiones**: A través del cliente centralizado Axios ([api.js](file:///c:/Users/SERGIO%20CASIQUE/Desktop/PA4/PA4/PA4/apps/portal-react/react-spa-PortalDelEstudiante/src/services/api.js)), se configura un interceptor de solicitud que detecta la existencia de este token en el storage y lo inyecta automáticamente en todas las llamadas HTTP en la cabecera `Authorization: Bearer <token>`.
3. **Manejo de Expiración e Invalidez (401)**: Para evitar brechas de seguridad o pantallas en blanco por tokens caducados, el cliente Axios implementa un interceptor de respuesta. Si el servidor backend responde con código de estado HTTP `401 Unauthorized` (firma no válida, token alterado o expirado), la aplicación de manera automática elimina el token del almacenamiento local y redirige al usuario a la pantalla de `/login` para renovar sus credenciales de manera transparente.
4. **Cierre de Sesión (Logout)**: El proceso de cierre de sesión destruye el token guardado en `localStorage` y vacía los estados de memoria reactiva en el Contexto de React, destruyendo cualquier rastro de la sesión del alumno y asegurando que las rutas protegidas no puedan volver a accederse sin un nuevo inicio de sesión.

---

