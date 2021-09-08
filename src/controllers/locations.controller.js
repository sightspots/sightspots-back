import LocationList from "../models/LocationList.model";
import Location from "../models/Location.model";


// TODO Probar los endpoints, la Query de los arrays del usuario no se si es correcta

// Endpoint con el array entero de locations
const indexGet = async (req, res, next) => {

  try {

    const Lista = await LocationList.find();

    return res.json( Lista );

  } catch (error) {

    return next(error);
  }
};

// Endpoint con los arrays locations que tiene guardado el Usuario
const indexGetUser = async (req, res, next) => {

    const { id } = req.params;

    try {
  
      const locationsList = await LocationList.find().populate(

        {
          path:"user",
          math: { _id: { _id: id }}
        }
      );
  
      return res.json( locationsList );
  
    } catch (error) {
  
      return next(error);
    }
  };

// Endpoint con una única location
  const oneGet = async (req, res, next) => {

    const { id } = req.params;
  
    try {
  
      const location = await Location.findById(id);
  
      return res.json(location );
  
    } catch (error) {
  
      return next(error);
    }
  };

export default { indexGet, indexGetUser, oneGet }
