import express from 'express';
import dotenv from 'dotenv';

import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import db from './utils/db.config.js';
import auth from './auth/index.js';

// Express configuration.
const app = express();

// Dotenv configuration.
dotenv.config();

// Connection to database.
db.connect();

// Auth configuration.
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

// Error handler.
app.use((error, req, res, next) => {
    console.log(error);
    return res.status(error.status || 500).json(`Error ${error.status}: ${error.message}.`);
});