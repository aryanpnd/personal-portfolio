# Portfolio Website

A modern portfolio website with a responsive frontend and lightweight Express.js backend.

## Project Overview

This portfolio website showcases professional work, skills, and offers a contact form for potential clients or employers to get in touch. The project consists of a frontend built with modern web technologies and a backend service handling API requests and form submissions.

## Features

- Responsive design that looks great on all devices
- Interactive UI with smooth animations
- Contact form with email notification
- Backend API for form processing
- Optimized for performance and SEO

## Project Structure

```
portfolio/v3/
├── portfolio-frontend-v1/  # Frontend application
│   ├── src/                # Source code
│   ├── public/             # Static assets
│   ├── dist/               # Production build
│   └── package.json        # Frontend dependencies
│
├── portfolio-backend/      # Backend service
│   ├── controllers/        # Request handlers
│   ├── routes/             # API routes
│   ├── index.js            # Main server file
│   └── package.json        # Backend dependencies
│
└── README.md               # Project documentation
```

## Technologies Used

### Frontend
- HTML5, CSS3, JavaScript
- Modern frontend framework
- Responsive design

### Backend
- Node.js and Express
- Nodemailer for email processing
- Security middleware (Helmet, CORS, etc.)

## Setup and Installation

### Prerequisites
- Node.js (v16 or newer)
- npm or yarn package manager

### Frontend Setup
```bash
# Navigate to frontend directory
cd portfolio-frontend-v1

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup
```bash
# Navigate to backend directory
cd portfolio-backend

# Install dependencies
npm install

# Create .env file (see Configuration section)

# Start development server
npm run dev

# Start production server
npm start
```

## Configuration

### Backend Environment Variables
Create a `.env` file in the portfolio-backend directory:

```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_RECIPIENT=your-personal-email@gmail.com
```

## Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service such as Vercel, Netlify, or GitHub Pages.

### Backend Deployment
The backend is configured for easy deployment to Azure App Service:

1. Create an Azure App Service with Node.js runtime
2. Configure environment variables in the App Service Configuration settings
3. Deploy code using GitHub Actions, Azure DevOps, or manual deployment

### Azure Deployment Best Practices
- Use Application Insights for monitoring and performance tracking
- Implement staging slots for zero-downtime deployments
- Use managed identities for secure access to other Azure services
- Configure auto-scaling based on traffic patterns
- Implement Azure Front Door for global content delivery
- Use Azure Key Vault for storing secrets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License


