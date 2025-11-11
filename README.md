# **cities-api-db** 🏙️ #

## Proyecto de Entornos de Desarrollo. ##
### Trabajar con Node.js, una base de datos SQLite y knex como librería para gestionar el acceso a la base de datos. ###

---

## API de ciudades con las siguientes funcionalidades: ##

- **CRUD COMPLETO**
   - GET `/cities`
   - GET `/cities/:id`
   - POST `/cities`
   - PUT `/cities/:id`
   - DELETE `/cities/:id`
- Utiliza una base de datos *SQLite* (no incluida en el repositorio) que contiene una tabla **`cities`** con las columnas: `id`, `name`, `population`, `altitude` y `capital`.
- Utiliza la libreria **`knex`** para gestionar el acceso a la base de datos.
- Control de errores.