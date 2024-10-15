# Usa una imagen base de Node.js, idealmente una versión que sea compatible con tu proyecto.
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor.
WORKDIR /app

# Copia los archivos de package.json y yarn.lock o package-lock.json.
COPY package.json package-lock.json ./

# Instala las dependencias.
RUN npm install

# Copia el resto del código de la aplicación.
COPY . .

# Construye la aplicación.
RUN npm run build

# Expone el puerto 3000 para que Next.js pueda ser accesible.
EXPOSE 3000

# Comando para ejecutar la aplicación en modo producción.
CMD ["npm", "start"]