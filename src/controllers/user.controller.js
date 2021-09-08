import User from "../models/User.model";
import bcrypt from "bcrypt";

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
const putUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const avatar = req.pictureUrl;
    let password = req.body.password;
    const saltRounds = 10;
    password = await bcrypt.hash(password, saltRounds);

    const uptadeUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        surname,
        email,
        avatar,
        password,
      },

      { new: true }
    );
    return res.status(200).json(uptadeUser);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.status(200).json("Usuario eliminado");
  } catch (error) {
    next(error);
  }
};

export default {
  getUsers,
  getUser,
  deleteUser,
  putUser,
};