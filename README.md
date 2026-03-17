# Task Manager - Arquitectura de Sistemas
<img width="2559" height="1520" alt="image" src="https://github.com/user-attachments/assets/3daf7b90-e284-4e3f-8de2-87381571ea8f" />

Este proyecto consiste en el desarrollo de una aplicación web tipo **Task Manager**, implementada bajo un enfoque cliente-servidor.  
Se integran tecnologías modernas para construir una solución completa que abarca backend, base de datos, frontend y despliegue en la nube.

El objetivo principal fue comprender de manera práctica cómo se conectan todos los componentes de una arquitectura moderna.


#Tecnologías utilizadas

- **Backend:** Node.js + Express
- **ORM:** Prisma
- **Base de datos:** PostgreSQL (Neon)
- **Frontend:** React + Vite
- **Deploy frontend:** Vercel
- **Deploy backend:** Render
- **Testing API:** Thunder Client

# ⚙️ Arquitectura del sistema

El sistema sigue una arquitectura cliente-servidor:


 Frontend

El frontend permite:

- Crear tareas
- Listar tareas
- Eliminar tareas
<img width="750" height="323" alt="image" src="https://github.com/user-attachments/assets/e8a2e9dc-3a12-4918-895f-4a2a2ccd449d" />

Se conecta directamente con el backend mediante fetch.


 *Deploy*
*  Frontend

Desplegado en Vercel:

https://load-balancer2-53fyz87zm-kenrivsans-projects.vercel.app/

*Backend

Desplegado en Render:

- https://loadbalancer2.onrender.com
- https://loadbalancer2.onrender.com/task
- https://loadbalancer2.onrender.com/docs
- https://loadbalancer2.onrender.com/status
<img width="1254" height="905" alt="image" src="https://github.com/user-attachments/assets/18ef4b0d-f096-41be-a41b-1ab6fe24e9d6" />
<img width="692" height="687" alt="image" src="https://github.com/user-attachments/assets/db818251-0e0c-4f50-90d2-ded4193e2eee" />
<img width="802" height="792" alt="image" src="https://github.com/user-attachments/assets/9b6bde1e-ac5c-41f8-b001-6b0c33d8b025" />


