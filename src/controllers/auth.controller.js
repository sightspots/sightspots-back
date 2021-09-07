import passport from "passport";

const registerGet = (req, res, next) => {

    return res.json("Pagina de registro");
}

const registerPost = async (req, res, next) => {

    const done = ( error, user) =>{

            if (error) return next(error);
        
            req.login(user, (error) => (error ? next(error) : res.json("Te has registrado")));
        
    }

    passport.authenticate("register",done)(req);
}

export default { registerGet, registerPost };