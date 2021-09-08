import Location from "../models/Location.model";


// Renderizamos la página con todas las locations
const indexGet = async (req, res, next) => {

  try {

    const locations = await Location.find();

    return res.json( locations );

  } catch (error) {

    return next(error);
  }
};

// Renderizamos la página con una única location
const oneGet = async (req, res, next) => {

  const { id } = req.params;

  try {

    const location = await Location.findById(id);

    return res.json(location);

  } catch (error) {

    return next(error);
  }
};

// Renderizamos la página con el formulario para crear location
const createGet = (req, res, next) =>{

  return res.json("URL DE LA RUTA");
    //   return res.render("AQUÍ IRÁ LA URL DE LA RUTA");
}

// Petición POST para crear la location
const createPost = async (req, res, next) => {

  const { title, tags, description, pictures, audio, coments, visitingHours, rating } = req.body;

  const newLocation = new Location({

    title,
    tags, 
    description, 
    pictures, 
    audio, 
    coments, 
    visitingHours, 
    rating
    

  });

  const location = await newLocation.save();

  return res.json(location);
};

// Renderizamos la página con el formulario para editar location
const editGet = async (req, res, next) =>{

  const { id } = req.params;
  
  try {

    const location = await Location.findById(id);
    
    return res.json(location)

  } catch (error) {

    return next(error);
  }

  
}

// Petición POST para editar la location
const editPost = async (req, res, next) => {

  try {

      const { id, title, tags, description, pictures, audio, coments, visitingHours, rating } = req.body;

      const update = {};

      if (title) update.title = title;
      if (tags) update.tags = tags;
      if (description) update.description = description;
      if (pictures) update.pictures = pictures;
      if (audio) update.audio = audio;
      if (coments) update.coments = coments;
      if (visitingHours) update.visitingHours = visitingHours;
      if (rating) update.rating = rating;
      

      const updateLocation = await Location.findByIdAndUpdate(id, update, { new: true });
      
      return res.json(updateLocation);

    } catch (error) {
      return next(error);
    }
};

// Petición DELETE para eliminar la location
const deletePost = async (req, res, next) => {

  const { id } = req.params;

  try {
    const deleted = await Location.findByIdAndDelete(id);

    if (!deleted) {
      return res.json("El elemento que querías borrar no existe");
    } else {
      return res.json("Lo has borrado");
    }

  } catch (error) {
    return next(error);
  }
}

export default { indexGet, oneGet, createGet, createPost, editGet, editPost, deletePost }