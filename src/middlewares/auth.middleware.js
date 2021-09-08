const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.json('Login requerido.');
};

const isNotAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  return res.json('Usuario autenticado.');
};

export default { isAuth, isNotAuth };