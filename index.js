const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                "img-src": ["'self'", "data:", "*"], // Allow all image sources
                "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Needed for proper functioning
                "default-src": ["'self'", "*"]
            },
        },
    })
);
app.use(morgan('dev')); // Logging
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL || '*'
        : 'http://localhost:5173'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', apiRoutes);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'portfolio-frontend-v1/dist')));

// Health check endpoints
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, './portfolio-frontend-v1/dist/index.html'));
});

// Start server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// module.exports = app; // For testing