# Rama 
`refactor/professional-ui`

# Objetivos cumplidos
- Limpieza de la UI del panel profesional (reducción de 4 opciones a 2: `Nuevo documento` y `Buscar paciente`).
- Actualización del sidebar para dejar solo `Dashboard`, `Nuevo documento` y `Buscar paciente`.
- Creación de notificaciones tipo toast con `@radix-ui/react-toast` mediante el hook `use-toast`.
- Uso del nuevo hook para mejorar los mensajes de éxito y error en el panel profesional.

# Rama
`refactor/professional-adapter`

# Objetivos cumplidos
- Refactorización de las llamadas al servicio en `ProfessionalDashboardAdapter` mediante la creación de la función helper `handleServiceCall`.
- Reducción significativa de código repetitivo (60-70% menos código en cada método del adapter).
- Centralización del manejo de errores en una única función reutilizable.
- Mejora de la consistencia y mantenibilidad del código en los adapters.
- Creación de `handleServiceCall` como función genérica que maneja servicios con parámetros variables y tipos de respuesta tipados.
- Al terminar con los servicios del panel admin, también se utilizará `handleServiceCall` allí para mantener la consistencia y reducir código repetitivo.


