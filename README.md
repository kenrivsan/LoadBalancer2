# Tarea 07 - GraphQL Deployment

## Endpoint público
Acceso a la API GraphQL:

**https://loadbalancer2-1.onrender.com/graphql**
<img width="2546" height="1473" alt="image" src="https://github.com/user-attachments/assets/b9050b94-51c9-48d0-9ed9-fd5cbb1b2276" />


## Descripción del proyecto
En esta actividad se desarrolló una API pública utilizando **GraphQL**, con el propósito de demostrar cómo este tipo de tecnología permite consultar únicamente los campos necesarios de cada modelo, sin depender de múltiples endpoints fijos como sucede en una API REST tradicional.

El proyecto fue construido con **Node.js**, **Express**, **Apollo Server** y **SQLite**, implementando dos modelos principales dentro de una base de datos: **Estudiante** y **Curso**. Posteriormente, la aplicación fue desplegada en **Render** para hacer público el endpoint y permitir realizar consultas desde cualquier cliente compatible con GraphQL.


## Objetivo
El objetivo principal de esta tarea fue comprender el funcionamiento de **GraphQL** como alternativa para la generación de endpoints flexibles, permitiendo que el cliente solicite únicamente la información que necesita.

Con esta implementación se logró:

- crear modelos dentro de una base de datos
- exponer un endpoint público GraphQL
- documentar los esquemas disponibles
- realizar pruebas reales de consultas
- desplegar la API en un entorno accesible públicamente


## Tecnologías utilizadas
Durante el desarrollo del proyecto se utilizaron las siguientes herramientas y tecnologías:

- **Node.js**
- **Express**
- **Apollo Server**
- **GraphQL**
- **SQLite**
- **Nodemon**
- **Git y GitHub**
- **Render**


## ¿Qué hicimos?
Se desarrolló una API GraphQL conectada a una base de datos local en SQLite. Dentro de dicha base de datos se crearon dos modelos:

### 1. Estudiante
Este modelo representa información básica de un estudiante.

Campos disponibles:
- `id`
- `nombre`
- `correo`
- `edad`
- `carrera`

### 2. Curso
Este modelo representa información general de un curso.

Campos disponibles:
- `id`
- `nombre`
- `descripcion`
- `creditos`
- `catedratico`

Después de crear estos modelos, se definió un esquema GraphQL que permite consultar tanto todos los registros como registros individuales por medio de su identificador.

Finalmente, la API fue desplegada en Render para obtener un endpoint público funcional.


Ejemplos de codigo en Postman
POST https://loadbalancer2-1.onrender.com/graphql
BODY:
###1
{
  "query": "query { estudiantes { nombre carrera } }"
}
<img width="1521" height="708" alt="image" src="https://github.com/user-attachments/assets/c579a054-ba66-4473-a46e-895b3d45bba8" />

###2
{
  "query": "query { cursos { id nombre descripcion creditos catedratico } }"
}
<img width="1421" height="659" alt="image" src="https://github.com/user-attachments/assets/28316722-0bab-4349-a1ca-465c1a5022ff" />

###3
{
  "query": "query { estudiantes { id nombre correo edad carrera } }"
}
<img width="1472" height="686" alt="image" src="https://github.com/user-attachments/assets/eaa03f6c-acf4-4428-a380-9660a64663cb" />

