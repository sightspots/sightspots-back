import passport from "passport";

const registerGet = (req, res, next) => {

    return res.json("Página de registro");
}

const registerPost = async (req, res, next) => {

    const done = (error, user) => {
        if (error) return next(error);

        req.login(user, (error) => (error ? next(error) : res.json(user)));
    }

    passport.authenticate("register", done)(req);
}

const loginGet = (req, res, next) => {

    return res.json("Página de login");
}

const loginPost = (req, res, next) => {
    const done = (error, user) => {

        if (error) {
            return next(error);
        }
        req.logIn(user, (error) => {
            console.log("Usuario logueado -> ", user);

            if (error) {
                return next(error);
            }
            return res.status(200).json(user);
        })
    };

    passport.authenticate("login", done)(req);
}

const logoutPost = (req, res, next) => {

    if (req.user) {
        req.logout();
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            return res.json("Has salido");
        });
    }
}

export default { registerGet, registerPost, loginGet, loginPost, logoutPost };