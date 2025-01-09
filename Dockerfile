# Usa un'immagine Node.js come base per la build
FROM node:18 AS build

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di progetto
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del progetto
COPY . .

# Costruisci il progetto per la produzione
RUN npm run build

# Usa Nginx per servire i file statici
FROM nginx:1.21-alpine

# Copia i file buildati nella directory predefinita di Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Espone la porta 80
EXPOSE 80

# Comando di default per avviare Nginx
CMD ["nginx", "-g", "daemon off;"]
