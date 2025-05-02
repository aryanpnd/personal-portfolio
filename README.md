# Personal Portfolio

This project consists of a full-stack portfolio application with separate frontend and backend components.

## Project Structure

The application is structured as follows:

- **Backend**: Node.js/Express server for handling API requests
- **Frontend**: React-based application (with TypeScript) in the portfolio-frontend-v1 directory

## Backend

The backend is a Node.js Express server that handles API requests and serves the frontend.

### Technologies Used
- Express.js
- Nodemailer (for contact form emails)
- Cors
- Helmet (for security)
- Morgan (for logging)
- dotenv (for environment variables)

### Scripts
```bash
# Install dependencies
npm install

# Start server in production mode
npm start

# Start server in development mode with hot-reloading
npm run dev
```

## Frontend

The frontend is built with React, TypeScript, and Tailwind CSS.

### Technologies Used
- React with TypeScript
- Vite (for build tooling)
- Tailwind CSS
- PDF.js (for resume viewing)

### Features
- PDF viewer for resume
- Background toggle
- Various sections for portfolio content

### Directory Structure
```
portfolio-frontend-v1/
├── public/
│   ├── favicon.svg
│   ├── pdf.worker.min.js (PDF.js worker for PDF rendering)
│   └── resume.pdf
├── src/
│   ├── assets/
│   ├── components/
│   │   └── BackgroundToggle.tsx (and other components)
│   ├── context/
│   ├── hooks/
│   └── sections/
└── index.html
```

## API Routes

The API routes are defined in the api.js file, with controllers in the controllers directory.

## Getting Started

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in .env
4. Install frontend dependencies:
   ```bash
   cd portfolio-frontend-v1
   npm install
   ```
5. Run the development server:
   ```bash
   # In the root directory
   npm run dev
   
   # In another terminal, for the frontend
   cd portfolio-frontend-v1
   npm run dev
   ```

## Deployment

The project is configured for deployment with Vercel, as indicated by the vercel.json configuration file.

## License

ISC