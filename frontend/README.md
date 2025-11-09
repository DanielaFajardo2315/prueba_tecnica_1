
# DELIVERY (Prueba técnica - Frontend)

Este proyecto es una aplicación web de gestión de recursos humanos desarrollada con Angular CLI 20. Permite administrar la información de Empleados y Departamentos a través de interfaces de usuario sencillas que implementan las funciones básicas CRUD (Crear, Leer, Actualizar, Eliminar).

## Características principales

- Página de Inicio (Dashboard): Muestra un resumen de datos clave del negocio en tiempo real.

- Gestión de Empleados: Interfaz para administrar, crear, editar y eliminar registros de empleados.

- Gestión de Departamentos: Interfaz para administrar, crear, editar y eliminar departamentos.

- Página "Not Found" (404): Manejo de rutas no existentes.

## Dashboard - Vista de Inicio
La página principal ofrece una visión rápida del estado del negocio con los siguientes indicadores:

- Cantidad de Empleados.

- Cantidad de Empleados Directos.

- Cantidad de Departamentos.

- Cantidad de Áreas.

## Paleta de colores

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Color primario | #B49A85 |
| Color secundario | #414A6B |
| Color de botones | #FF5851 |
| Color de texto oscuro | #1C1B20 |
| Color de texto claro | #fffcf4 |
| Color de títulos | #F3C130 |

## Tecnologías y requisitos

Este proyecto fue generado con la versión 20.x de Angular CLI.
- Angular CLI
- Node.js
- npm
## Instalación

Esta instalación debe ser hecha en la carpeta principal del repositorio (prueba tecnica 1)

1. Clonar el repositorio
```bash
  git clone https://github.com/DanielaFajardo2315/prueba_tecnica_1.git
  cd prueba_tecnica_1
  cd frontend
```
2. Instalar dependencias
```bash
  npm install
```

3. Ejecutar el servidor
```bash
  ng serve -o
```
## Estructura del proyecto

- `src/app/components/`: Componentes reutilizables.

- `src/app/pages/`: Componentes principales que representan las vistas (páginas).

- `home/`: Componente para la página de inicio.

- `employees/`: Página relacionada con la gestión de empleados.

- `departments/`: Página relacionada con la gestión de departamentos.

- `not-found/`: Página 404.

- `src/app/services/`: Servicios para la lógica de negocio, manejo de datos y llamadas a la API (CRUD).

- `src/app/models/`: Definición de interfaces para Empleado y Departamento.
## Authors

Proyecto creado por:
- [@DanielaFajardo2315](https://github.com/DanielaFajardo2315)