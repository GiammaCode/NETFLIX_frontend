# Netflix frontend
![image](/public/screenshotApp.png)


## Description
This project is a frontend application developed in **React** as part of a deliverable for the **Software Architectures
in Enterprise Environments** course. The goal is to learn how to implement and consume microservices as it is done in
most modern enterprise environments.

## Features
- Use of microservices for data management and retrieval, specifically: Users, Content and Views.
- Implementation of React's own modular and reusable components.
- Use of libraries such as Axios for API consumption.
- Styles incorporated with **Bootstrap**.

## Project Structure
- **`public/`**: Static files and main HTML template.
- **`src/`**: Contains React components, styles, and services.
    - **`components/`**: Reusable UI components.
    - **`pages/`**: 
    - **`styls/`**: 
    - **`services/`**: Modules for integration with microservices.
    - **`main.js`**: Main component of the application.
- **`package.json`**: Project configuration and dependencies.

## Funcionalidad de Inicio de Sesión

![image](https://github.com/user-attachments/assets/273410e4-f0e0-4a14-9872-523c57e713a1)

## Instalación y Uso

1. Clona este repositorio en tu máquina local.
2. Navega a la carpeta raíz del proyecto.
3. Instala los archivos necesarios ejecutando:

   ```bash
   npm install
- **`npm start`**: Inicia el servidor de desarrollo.

---

## Despliegue en Docker

Este documento describe los pasos necesarios para desplegar una frontend dentro de un contenedor Docker utilizando `docker-compose`.


### Requisitos previos

1. **Docker**: Asegúrate de tener instalado Docker en tu sistema. Puedes descargarlo desde [Docker](https://www.docker.com/).
2. **docker-compose**: Comprueba que tienes instalado `docker-compose`. Si no, sigue las instrucciones de instalación [aquí](https://docs.docker.com/compose/install/).

### Pasos para el despliegue

### Paso 1: Crear una red en Docker

Antes de desplegar el frontend  , necesitas crear una red específica para el proyecto. Esto permitirá que los contenedores se comuniquen entre sí.

Ejecuta el siguiente comando en la terminal:

```bash
docker network create flask_network
```

### Paso 2: Construir e iniciar la API

Para construir la imagen de Docker y poner en marcha los contenedores, sigue los pasos a continuación:

Desde el directorio donde se encuentra el archivo `docker-compose.yml`, ejecuta el siguiente comando para construir las imágenes y levantar los contenedores:

```bash
docker-compose up --build
```

### Paso 3. Verificar el despliegue
Una vez que los contenedores estén en funcionamiento, puedes verificar el estado de los servicios con el siguiente comando:

```bash
docker ps
```
