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
    - **`pages/`**: All pages about Netflix 
    - **`styls/`**: Contains all CSS classes
    - **`services/`**: Modules for integration with microservices.
    - **`main.js`**: Main component of the application.
- **`package.json`**: Project configuration and dependencies.

## Login functionality
![image](/public/screenshotApp2.png)

## Installation and Usage

1. Clone this repository to your local machine.
2. Navigate to the root folder of the project.
3. Install the required files by running:

```bash
  docker-compose up --build
```
---

### Requirements
- CONTENT SERVICE: https://github.com/GiammaCode/NETFLIX_content_service
- USER SERVICE: https://github.com/Paso2000/NETFLIX_user_service
- VIEW SERVICE: https://github.com/Paso2000/NETFLIX_view_service

### Deployment Steps

### Step 1: Create a Docker Network

Before deploying the frontend, you need to create a specific network for the project. This will allow the containers to 
communicate with each other.

```bash
docker network create flask_network
```

### Step 2: Build and Start the API
To build the Docker image and start the containers, follow the steps below:

From the directory where the docker-compose.yml file is located, run the following command to build the images and bring
up the containers:

```bash
docker-compose up --build
```

### Step 3: Verify the Deployment
Once the containers are running, you can verify the status of the services with the following command:
```bash
docker ps
```