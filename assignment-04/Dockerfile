# ---------- Etapa 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos dependencias primero
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

# Generamos build de producción
RUN npm run build

# ---------- Etapa 2: Servir con nginx ----------
FROM nginx:alpine

# Copiamos los archivos generados al contenedor nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]