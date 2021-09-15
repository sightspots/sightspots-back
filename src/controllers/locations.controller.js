import LocationList from "../models/LocationList.model";
import Location from "../models/Location.model";

// Endpoint con el array entero de locations
const indexGet = async (req, res, next) => {

  try {

    const location = await Location.find();

    return res.json(location);

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

// Endpoint con la lista completa de locationLists que tiene guardadas el Usuario
const locationListsGet = async (req, res, next) => {

  try {

    const locationsList = await LocationList.find({ user: req.body._id });

    return res.json(locationsList);

  } catch (error) {

    return next(error);
  }
};

// Endpoint con una única locationList del Usuario
const locationListGet = async (req, res, next) => {

  const { id } = req.params;

  try {

    const locationList = await LocationList.findById(id).populate('locations');

    return res.json(locationList);

  } catch (error) {

    return next(error);
  }
};

// Endpoint para crear una location list
const locationListPost = async (req, res, next) => {
  const { title } = req.body;

  const newLocationList = new LocationList({
    title,
    locations: [],
    user: req.body._id
  });

  const locationList = await newLocationList.save();

  return res.json(locationList);
}

// Endpoint para añadir una location a una location list
const locationListPut = async (req, res, next) => {
  const { id } = req.params;
  const { locations } = req.body;

  try {
    const locationList = await LocationList.findById(id);

    await LocationList.findByIdAndUpdate(
      id,
      { $addToSet: { locations: locations } },
      { new: true }
    );

    return res.json(locationList);
  } catch (error) {
    return next(error);
  }
}

export default { indexGet, oneGet, locationListsGet, locationListGet, locationListPost, locationListPut }
