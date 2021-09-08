import passport from 'passport';
import registerStrategy from './register.strategy.js';
import loginStrategy from './login.strategy.js';
import User from '../models/User.model.js';

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
      const existingUser = await User.findById(userId);
      return done(null, existingUser);
  } catch (error) {
      return done(error);
  }
});

const setStrategies = () => {
  passport.use('register', registerStrategy);
  passport.use('login', loginStrategy);
};

export default { setStrategies };