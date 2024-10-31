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

# Definir y cargar variables de entorno.

ARG NEXT_PUBLIC_USER_ENDPOINT
ENV NEXT_PUBLIC_USER_ENDPOINT=${NEXT_PUBLIC_USER_ENDPOINT}

ARG NEXT_PUBLIC_USER_LOGIN
ENV NEXT_PUBLIC_USER_LOGIN=${NEXT_PUBLIC_USER_LOGIN}

ARG NEXT_PUBLIC_USER_GET_INFO_WITH_TOKEN
ENV NEXT_PUBLIC_USER_GET_INFO_WITH_TOKEN=${NEXT_PUBLIC_USER_GET_INFO_WITH_TOKEN}

ARG NEXT_PUBLIC_LOBBIES_BASE
ENV NEXT_PUBLIC_LOBBIES_BASE=${NEXT_PUBLIC_LOBBIES_BASE}

ARG NEXT_PUBLIC_GET_EVENTS
ENV NEXT_PUBLIC_GET_EVENTS=${NEXT_PUBLIC_GET_EVENTS}

ARG NEXT_PUBLIC_PROVISIONAL_USER_TOKEN
ENV NEXT_PUBLIC_PROVISIONAL_USER_TOKEN=${NEXT_PUBLIC_PROVISIONAL_USER_TOKEN}

# Construye la aplicación.
RUN npm run build

# Expone el puerto 3000 para que Next.js pueda ser accesible.
EXPOSE 3000

# Comando para ejecutar la aplicación en modo producción.
CMD ["npm", "start"]