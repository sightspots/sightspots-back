import bcrypt from 'bcrypt.js';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.model.js';

const loginStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                const error = new Error('The user does not exist.');
                error.status = 401;
                return done(error);
            }

            const isValidPassword = await bcrypt.compare(password, existingUser.password);           
            if (!isValidPassword) {
              const error = new Error('Password is not valid.');
              return done(error);
            }

            existingUser.password = undefined;
            return done(null, existingUser);
        } catch (error) {
            return done(error);
        }
    }
);

export default loginStrategy;