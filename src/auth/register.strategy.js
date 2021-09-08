import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.model.js';

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return re.test(String(password));
}

const registerStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const error = new Error('El usuario ya existe.');
        return done(error);
      }

      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        const error = new Error('E-mail incorrecto.');
        return done(error);
      }

      const isValidPassword = validatePassword(password);
      if (!isValidPassword) {
        const error = new Error('La contraseña debe contener entre 8 y 20 caracteres, una minúscula, una mayúscula y un número.');
        return done(error);
      }

      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      // TODO: capturar avatar en caso de que el user lo suba
      const newUser = new User({
        email,
        password: hash,
        name: req.body.name,
        surname: req.body.surname,
        avatar: req.pictureUrl,
      });

      const savedUser = await newUser.save();

      savedUser.password = undefined;
      return done(null, savedUser);

    } catch (error) {
      return done(error);
    }
  }
);

export default registerStrategy;