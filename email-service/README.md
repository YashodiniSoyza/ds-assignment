[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/MhkFIDKy)

# IT21238512 - Soysa W.M.Y

# University Management System

This project involves developing a RESTful API for managing a university's timetable system. The system is designed to handle the creation, modification, and querying of class schedules for students, faculty, and administrative staff. Security, data integrity, and user-friendly interfaces are prioritized to simulate real-world software development challenges and solutions within an educational institution context. The API ensures secure access to timetable data while providing convenient interfaces for users to interact with the system.

## 1. Clone the repository

```
git clone https://github.com/sliitcsse/assignment-01-YashodiniSoyza.git
```

## 2. Install dependencies

```
yarn install
```

## 3. Set up the environment variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```
NODE_ENV=DEV
MONGODB_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
PORT=
EMAIL_CLIENT=
EMAIL_CLIENT_PASSWORD=
```

## 4. Start the development server

```
yarn start
```

## 5. Run the tests

```
yarn test
```

## 6. Load testing with Artillery

```
npm install -g artillery
artillery run asciiart-load-test.yml
```

## Sonarqube Analysis

![image](https://github.com/sliitcsse/assignment-01-YashodiniSoyza/assets/99544182/aaf5f6a3-4555-4c3d-81e5-64420491daaf)
