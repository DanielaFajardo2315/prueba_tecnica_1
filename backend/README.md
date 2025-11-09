# DELIVERY (Prueba técnica- Backend)

Esta es la API RESTful que soporta la aplicación de Gestión de Recursos Humanos. Fue construida con Node.js y el framework Express, y utiliza MongoDB para la persistencia de datos.

## Características principales

- API RESTful: Implementación de rutas y métodos HTTP estándar para operaciones CRUD.

- Gestión de Empleados: Endpoints para manejar la información completa de los empleados.

- Gestión de Departamentos: Endpoints para administrar la estructura organizacional.## Tecnologías utilizada

| Tecnología             | Descripción                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Node.js | Entorno de ejecución de JavaScript. |
| Express | Framework web minimalista y flexible para Node.js. |
| MongoDB | Base de datos NoSQL utilizada para almacenar los datos. |
| Mongoose | Librería de modelado de objetos para MongoDB en Node.js. |
| dotenv | Para la gestión de variables de entorno. |
| nodemon | Para reinicio automatico del servidor y detección de cambios |


## Instalación

Esta instalación debe ser hecha en la carpeta principal del repositorio (prueba tecnica 1)

1. Clonar el repositorio
```bash
  git clone https://github.com/DanielaFajardo2315/prueba_tecnica_1.git
  cd prueba_tecnica_1
  cd backend
```
2. Instalar dependencias
```bash
  npm install
```
3. Configurar variables de entorno
Crear un archivo .env e incluir los siguientes datos:
```bash
PORT = 3000
BD_PASSWORD = manejoEMPLEADOS123
BD_URL = mongodb+srv://danielafajardo2315_db_user:manejoEMPLEADOS123@empleados.y7cgu3g.mongodb.net/?appName=empleados
```
4. Ejecutar el servidor
```bash
  npm run dev
```
## Modelos de datos

Los principales modelos utilizados para la persistencia son:

- Empleado: Contiene campos como codigo de empleado, nombre, apellido 1, apellido 2, fecha de ingreso, cargo, departamento y si es empleado directo.

- Departamento: Contiene campos como codigo del departamento, nombre del departamento, área y director del departamento.

## Authors

Proyecto creado por:
- [@DanielaFajardo2315](https://github.com/DanielaFajardo2315)
