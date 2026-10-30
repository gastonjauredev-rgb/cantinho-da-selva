## 13. Estado actual del proyecto

**Cantinho da Selva cuenta con su frontend desarrollado**, incluyendo los principales módulos de la aplicación:

- Home y navegación general.
- Catálogo y detalle de productos.
- Carrito de compras.
- Checkout de productos.
- Cafetería.
- Reservas de mesas.
- Cartelera y detalle de eventos.
- Selección de entradas.
- Formulario y revisión de datos del comprador.
- Simulación de pago exitoso.
- Pantalla de confirmación demostrativa.

La aplicación utiliza React, Vite y una arquitectura modular organizada por funcionalidades.

Las operaciones de compra, reserva y pago siguen siendo demostrativas y no requieren servicios backend para representar su funcionamiento en el frontend.

### Verificaciones técnicas

Se realizaron las siguientes comprobaciones:

- Servidor de desarrollo Vite: funcionamiento correcto.
- Build de producción: compilación exitosa.
- ESLint: sin errores reportados.

La compilación presentó una advertencia no bloqueante relacionada con el tamaño del archivo JavaScript principal.

El frontend está preparado para iniciar su etapa de auditoría técnica y funcional.

---

## 14. Próxima etapa: auditoría integral del frontend

Antes de comenzar el backend, realizar una revisión profesional y exhaustiva de la aplicación.

### Objetivos

1. Verificar todas las rutas y la navegación.
2. Comprobar formularios y validaciones.
3. Revisar catálogo, stock simulado y carrito.
4. Verificar los cálculos y estados del checkout.
5. Evaluar las reservas de cafetería.
6. Probar el flujo completo de eventos y entradas.
7. Revisar estados vacíos, errores y casos límite.
8. Comprobar el diseño responsive.
9. Evaluar accesibilidad y experiencia de usuario.
10. Revisar arquitectura, componentes y separación de responsabilidades.
11. Optimizar el rendimiento cuando sea necesario.
12. Ejecutar nuevamente build, ESLint y las pruebas que correspondan.

La auditoría debe basarse en el código real y en pruebas verificables.

No considerar una funcionalidad completamente validada únicamente porque la aplicación compile correctamente.

---

## 15. Próxima etapa: desarrollo backend

Una vez finalizada la auditoría del frontend, comenzar el diseño y desarrollo del backend, previa autorización expresa.

### Tecnologías previstas

- Node.js.
- Express.
- MongoDB, sujeto a evaluación técnica.
- API REST.

### Funcionalidades previstas

- Persistencia de productos, usuarios, pedidos y reservas.
- Arquitectura por capas.
- Controladores, servicios, repositorios y acceso a datos.
- Validaciones de solicitudes.
- Manejo centralizado de errores.
- Autenticación y autorización.
- Administración de productos, mesas y eventos.
- Gestión real de stock y disponibilidad.
- Reservas temporales y confirmadas.
- Integración de pagos, evaluando Mercado Pago Checkout Pro.
- Verificación segura mediante webhooks.
- Envío de correos electrónicos.
- Confirmaciones y comprobantes.
- Gestión de estados de pedidos y reservas.
- Documentación OpenAPI/Swagger.
- Pruebas funcionales y de integración.

Las decisiones de arquitectura y servicios se definirán antes de implementar cada módulo.

El backend deberá verificar las operaciones sensibles independientemente del navegador.

---

## 16. Instrucciones para continuar el desarrollo

Al retomar el proyecto:

1. Leer `CONTEXT.md` para comprender la arquitectura y el estado de la aplicación.
2. Respetar la metodología de trabajo establecida.
3. Trabajar un archivo por vez.
4. Entregar archivos completos, listos para reemplazar.
5. Mantener JSX y CSS separados.
6. Conservar las funcionalidades existentes.
7. Solicitar los archivos necesarios antes de realizar modificaciones.
8. Verificar los cambios mediante pruebas reales.
9. No afirmar que algo funciona sin comprobarlo.
10. Actualizar la documentación cuando se produzcan cambios relevantes.

### Estado de cierre

**Frontend:** desarrollado, pendiente de auditoría integral.

**Backend:** no iniciado.

**Próximas etapas:** auditoría profesional del frontend y posterior desarrollo backend.

**Objetivo:** transformar Cantinho da Selva en una aplicación Full Stack completa, mantenible, documentada y preparada para formar parte de un portafolio profesional.