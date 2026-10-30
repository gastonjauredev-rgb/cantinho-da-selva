# 🌿 Cantinho da Selva

### Vivero & Café — Plataforma Web Full Stack

Cantinho da Selva es una aplicación web que integra un vivero, una cafetería y un espacio de eventos en una misma plataforma digital.

El proyecto permite explorar un catálogo de plantas y productos, gestionar un carrito de compras, realizar un recorrido de checkout, consultar la propuesta gastronómica, solicitar reservas de mesas y participar en experiencias y eventos mediante un sistema de selección de entradas.

Fue desarrollado como un **proyecto de práctica profesional y portafolio**, con el objetivo de aplicar conocimientos de desarrollo frontend y avanzar progresivamente hacia una arquitectura Full Stack.

El enfoque principal está puesto en la organización del código, la separación de responsabilidades, la reutilización de componentes, la gestión de estados y la construcción de interfaces funcionales.

> **Estado actual:** frontend desarrollado con flujos de demostración. El backend, la persistencia de operaciones y las integraciones reales se encuentran pendientes.

---

## 🛠️ Tecnologías utilizadas

### Frontend

- **React 19:** construcción de interfaces mediante componentes.
- **JavaScript (ES6+):** lógica de la aplicación.
- **Vite 8:** entorno de desarrollo y compilación.
- **React Router DOM 7:** navegación entre páginas.
- **React-Bootstrap:** componentes de interfaz.
- **Bootstrap 5:** sistema de estilos y utilidades.
- **CSS3:** estilos personalizados y diseño responsive.
- **React Context API:** administración del estado compartido del carrito.

### Herramientas y dependencias adicionales

- **SweetAlert2:** biblioteca para alertas y mensajes interactivos.
- **Mock Service Worker (MSW):** herramienta de desarrollo para simular respuestas de API.
- **ESLint:** análisis estático del código.
- **Git y GitHub:** control de versiones.

Las dependencias se encuentran declaradas en `package.json`.

---

## ✨ Funcionalidades principales

### 1. Inicio

La página principal presenta la identidad de Cantinho da Selva y ofrece acceso a los principales servicios del establecimiento.

Incluye:

- Navegación principal.
- Sección hero.
- Buscador de plantas.
- Acceso a categorías.
- Presentación de productos destacados.
- Información sobre el vivero y su propuesta.

### 2. Catálogo de plantas y productos

El catálogo permite explorar los artículos disponibles mediante una interfaz organizada.

Funcionalidades:

- Visualización de productos.
- Navegación por categorías.
- Filtrado de productos.
- Acceso al detalle individual.
- Visualización de precios e información de disponibilidad.
- Estados de carga y error.

Las categorías contemplan plantas de interior, exterior, frutales, macetas, sustratos y herramientas.

### 3. Detalle de producto

Cada producto dispone de una página individual que permite consultar su información y realizar acciones de compra.

Incluye:

- Información del producto.
- Precio.
- Disponibilidad.
- Selector de cantidad.
- Incorporación al carrito.
- Navegación mediante breadcrumbs.

### 4. Carrito de compras

El carrito utiliza React Context para compartir su estado entre los componentes de la aplicación.

Permite:

- Agregar productos.
- Modificar cantidades.
- Eliminar artículos.
- Vaciar el carrito.
- Calcular importes.
- Continuar hacia el checkout.

La lógica del carrito está separada de los componentes de presentación.

### 5. Checkout de productos

La aplicación incluye una interfaz de checkout para representar el proceso de finalización de una compra.

Este módulo forma parte del frontend demostrativo.

**Actualmente no procesa pagos ni registra pedidos reales en un servidor.**

### 6. Cafetería

Cantinho da Selva incorpora una sección gastronómica integrada con la identidad del vivero.

El módulo presenta la propuesta de cafetería y permite acceder a la experiencia de reservas de mesas.

### 7. Reservas de mesas

La aplicación contempla un flujo frontend para solicitar reservas en la cafetería.

Este módulo permite representar la interacción del usuario con el sistema de reservas.

**Las solicitudes todavía no se almacenan ni confirman mediante un backend.**

### 8. Eventos y experiencias

El módulo de eventos permite descubrir actividades organizadas en Cantinho da Selva.

Incluye:

- Cartelera de eventos.
- Categorías de actividades.
- Detalle individual de cada evento.
- Información de fecha, horario y precio.
- Visualización de disponibilidad demostrativa.
- Selección de cantidad de entradas.
- Solicitud opcional de mesa para cenar, cuando corresponde.

### 9. Checkout de entradas

El proceso de selección de entradas está dividido en cuatro etapas.

**Etapa 1 — Datos del comprador**

Formulario con nombre, apellido, correo electrónico y teléfono, incluyendo validaciones de campos.

**Etapa 2 — Revisión**

Presentación de los datos ingresados, resumen de entradas e importe total. Permite regresar y editar la información sin perder los datos.

**Etapa 3 — Pago simulado**

Pantalla demostrativa que representa el proceso de pago sin solicitar información bancaria.

**Etapa 4 — Confirmación**

Pantalla de resultado exitoso con los datos del comprador, evento, cantidad de entradas e importe simulado.

**Importante:** no se procesan pagos reales, no se generan entradas válidas, no se descuentan cupos y no se envían correos electrónicos de confirmación.

Los eventos ficticios se identifican como contenido de demostración.

---

## 🏗️ Arquitectura del proyecto

El frontend utiliza una organización modular orientada a funcionalidades, con separación de responsabilidades.

Los módulos principales están organizados dentro de `src/features`, agrupando las distintas áreas de la aplicación.

Entre las responsabilidades de la arquitectura se encuentran:

| Elemento | Responsabilidad |
|---|---|
| `components` | Componentes de interfaz reutilizables |
| `pages` | Páginas y vistas principales |
| `features` | Agrupación de funcionalidades por dominio |
| `services` | Abstracción del acceso a datos |
| `context` | Administración de estado compartido |
| `data` | Datos utilizados por funcionalidades de demostración |
| `styles` | Archivos CSS de la aplicación |

### Principios de desarrollo

- Componentes con responsabilidades definidas.
- Separación entre lógica y presentación.
- Organización modular por funcionalidades.
- Estilos CSS externos.
- Reutilización de componentes.
- Manejo de estados con hooks de React.
- Estado compartido mediante Context API.
- Navegación declarativa con React Router.
- Validación de formularios.
- Preparación para la futura integración con servicios backend.

Esta estructura busca facilitar el mantenimiento, la depuración, la ampliación del proyecto y la incorporación progresiva de nuevas funcionalidades.

---

## 🚀 Instalación y ejecución

### Requisitos

- Node.js compatible con Vite 8.
- npm.
- Git.

### Clonar el repositorio

```bash
git clone https://github.com/gastonjauredev-rgb/cantinho-da-selva.git
```

### Acceder al directorio

```bash
cd cantinho-da-selva
```

### Instalar dependencias

```bash
npm install
```

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en la dirección local indicada por Vite, habitualmente:

`http://localhost:5173/`

### Generar una compilación de producción

```bash
npm run build
```

### Previsualizar la compilación

```bash
npm run preview
```

### Ejecutar ESLint

```bash
npm run lint
```

---

## 🧪 Verificaciones técnicas

Durante el desarrollo se ejecutaron las siguientes comprobaciones:

| Verificación | Resultado |
|---|---|
| Inicio del servidor Vite | Correcto |
| Compilación de producción | Correcto |
| Análisis estático con ESLint | Sin errores reportados |

La compilación de producción generó una advertencia no bloqueante por el tamaño de un archivo JavaScript superior a 500 kB.

Se contempla revisar la división del código y la carga diferida de módulos como parte de la optimización.

**Pendiente:** auditoría funcional completa, revisión responsive integral y pruebas automatizadas.

---

## 📌 Estado del proyecto

### Frontend

Los principales módulos de interfaz y los flujos demostrativos están desarrollados.

Se encuentra pendiente una auditoría final para verificar navegación, validaciones, accesibilidad, rendimiento, responsive y casos límite.

### Backend

El backend todavía no fue implementado.

Actualmente, la aplicación utiliza funcionalidades y datos de demostración para representar operaciones que posteriormente deberán conectarse con servicios reales.

---

## 🔜 Próximas etapas

El proyecto continuará con el desarrollo backend y la integración de funcionalidades reales.

Se prevé trabajar en:

- API REST con Node.js y Express.
- Base de datos para productos, usuarios, pedidos, reservas y eventos.
- Arquitectura por capas.
- Controladores, servicios y repositorios.
- Validaciones de datos.
- Manejo centralizado de errores.
- Autenticación y autorización.
- Persistencia de compras y reservas.
- Gestión real de disponibilidad.
- Confirmaciones por correo electrónico.
- Documentación de endpoints.
- Pruebas funcionales y de integración.

Las decisiones definitivas sobre base de datos, servicios externos y procesamiento de pagos se tomarán durante el diseño del backend.

---

## 🎯 Objetivos del proyecto

Cantinho da Selva fue creado para desarrollar y demostrar habilidades técnicas aplicadas a un proyecto de alcance amplio.

Entre sus objetivos se encuentran:

- Construir una aplicación React con múltiples módulos.
- Aplicar arquitectura modular y separación de responsabilidades.
- Gestionar estado local y compartido.
- Implementar navegación y rutas dinámicas.
- Desarrollar formularios con validaciones.
- Resolver flujos de carrito y checkout.
- Diseñar interfaces adaptables a diferentes dispositivos.
- Organizar código mantenible y reutilizable.
- Preparar el frontend para su integración con una API REST.
- Documentar y versionar el desarrollo de manera profesional.

---

## ⚠️ Aviso importante

**Cantinho da Selva es un proyecto educativo y de portafolio.**

Las compras, reservas, pagos y confirmaciones presentadas en la aplicación son demostrativas mientras no se implemente la infraestructura backend correspondiente.

No se realizan transacciones económicas ni se generan reservas o entradas reales.

---

## 👨‍💻 Autor

**Gastón Jaureguiberry**

Desarrollador Web | React · JavaScript · Node.js

**GitHub profesional:**  
https://github.com/gastonjauredev-rgb

**Portafolio:**  
https://portafolio-drab-nu-97.vercel.app/

---

*Cantinho da Selva — Proyecto de desarrollo Full Stack orientado al aprendizaje, la práctica profesional y la construcción de software mantenible.*