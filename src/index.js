import express from 'express';
import dotenv from 'dotenv';

import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import db from './utils/db.config.js';
import auth from './auth/index.js';

import authRoutes from './routes/auth.routes'
import userRoutes from "./routes/users.routes";

// Connection to database
db.connect();

// Conexion al puerto
const PORT = process.env.PORT || 4000;

// Express configuration
const app = express();

// Dotenv configuration
dotenv.config();

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
        maxAge: 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({ mongoUrl: db.DB_URL }),
}));
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Error handler
app.use((error, req, res, next) => {
    console.log(error);
    return res.status(error.status || 500).json(`Error ${error.status}: ${error.message}.`);
});

app.listen(PORT, () => console.log(`Servidor a tota virolla en http://localhost:${PORT}.`))
