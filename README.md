# React TypeScript Job Application Tracker

A modern, responsive job application tracking application built with React, TypeScript, and Tailwind CSS. This app helps users manage and track their job applications efficiently.

## Features

- **User Authentication**: Register and login functionality
- **Job Management**: Add, view, edit, and delete job applications
- **Application Status Tracking**: Track the status of each application (applied, interviewing, offered, rejected, etc.)
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Real-time Updates**: Instant updates to the job list and status
- **Data Persistence**: Uses JSON Server for backend simulation

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: JSON Server (for development)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Build Tool**: Create React App

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd react-ts-job-application-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the JSON Server (backend):
   ```bash
   npm run server
   ```
   This will start the server on `http://localhost:3001`

4. In a new terminal, start the React app:
   ```bash
   npm start
   ```
   This will start the app on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Register a new account or login with existing credentials
3. Add new job applications using the job form
4. View and manage your applications on the home page
5. Click on a job card to view details and edit status

## Available Scripts

- `npm start`: Starts the development server
- `npm run build`: Builds the app for production
- `npm test`: Runs the test suite
- `npm run eject`: Ejects from Create React App (irreversible)
- `npm run server`: Starts the JSON Server backend

## API Endpoints

The app uses JSON Server with the following endpoints:

- `GET /users`: Get all users
- `POST /users`: Create a new user
- `GET /users?username=<username>`: Get user by username
- `GET /jobs`: Get all jobs
- `POST /jobs`: Create a new job
- `GET /jobs?userId=<id>`: Get jobs for a specific user
- `GET /jobs/<id>`: Get a specific job
- `PATCH /jobs/<id>`: Update a job
- `DELETE /jobs/<id>`: Delete a job

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── JobCard.tsx
│   └── JobForm.tsx
├── context/             # React Context for state management
│   └── AuthContext.tsx
├── pages/               # Page components
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Home.tsx
│   ├── JobDetails.tsx
│   └── NotFound.tsx
├── utils/               # Utility functions
│   └── api.ts
├── App.tsx              # Main app component
├── index.tsx            # App entry point
└── index.css            # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request




