import express from 'express';
import dotenv from 'dotenv';


import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import db from './utils/db.config.js';
import auth from './auth/index.js';
import authMiddleware from './middlewares/auth.middleware.js';
import adminMiddleware from './middlewares/admin.middleware.js';

import indexRoutes from './routes/index.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from "./routes/users.routes";
import adminRoutes from './routes/admin.routes'
import locationsRoutes from './routes/locations.routes'

const cors = require('cors')

// Connection to database
db.connect();

// Conexion al puerto
const PORT = process.env.PORT || 4000;

// Express configuration
const app = express();


// Dotenv configuration
dotenv.config();

// Conexión entre el front y el back
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Origin', '*')
    next();
});

app.use( cors( {
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    credentials: true
}))

// Crear el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth configuration
auth.setStrategies();
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({ mongoUrl: db.DB_URL }),
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/user", authMiddleware.isAuth, userRoutes);
app.use("/admin", adminMiddleware.isAdmin, adminRoutes);
app.use("/locations", locationsRoutes);

// Error handler
app.use((error, req, res, next) => {
    console.log(error);
    return res.status(error.status || 500).json(`Error ${error.status}: ${error.message}.` || 'Unexpected error.');
});

app.listen(PORT, () => console.log(`Servidor a tota virolla en http://localhost:${PORT}`))
