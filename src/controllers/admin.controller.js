import Location from "../models/Location.model";


// Renderizamos la página con el formulario para crear location
const createGet = (req, res, next) => {

  return res.json("Formulario para crear una localización");
  //   return res.render("AQUÍ IRÁ LA URL DE LA RUTA");
}

// Petición POST para crear la location
const createPost = async (req, res, next) => {

  console.log(req.body)

  const { title, type, description, pictures, audio, comments, visitingHours, rating, latLng } = req.body;

  const newLocation = new Location({
    title,
    type,
    description,
    pictures: req.files,
    audio,
    comments,
    visitingHours,
    rating,
    latLng
  });

  const location = await newLocation.save();

  return res.json(location);
};

// Renderizamos la página con el formulario para editar location
const editGet = async (req, res, next) => {

  const { id } = req.params;

  try {

    const location = await Location.findById(id);

    return res.json(location)

  } catch (error) {

    return next(error);
  }
}

// Petición PUT para editar la location
const editPut = async (req, res, next) => {
  const { id } = req.params;

  try {

    const { title, type, description, pictures, audio, comments, visitingHours, rating, latLng } = req.body;

    const update = {};

    if (title) update.title = title;
    if (type) update.type = type;
    if (description) update.description = description;
    if (audio) update.audio = audio;
    if (comments) update.comments = comments;
    if (visitingHours) update.visitingHours = visitingHours;
    if (rating) update.rating = rating;
    if (latLng) update.latLng = latLng;

    await Location.findById(id);

    await Location.findByIdAndUpdate(
      id,
      { $addToSet: { pictures: req.picturesUrl } },
      { new: true }
    );

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
      return res.json("La localización que querías borrar no existe");
    } else {
      return res.json("Has borrado la localización");
    }

  } catch (error) {
    return next(error);
  }
}

export default { createGet, createPost, editGet, editPut, deletePost }
