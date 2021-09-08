import express from "express";
import userCrtl from "../controllers/user.controller";

const router = express.Router();

router.get("/users", userCrtl.getUsers);
router.get("/user/:id", userCrtl.getUser);
router.delete("/delete/:id", userCrtl.deleteUser);
router.put("/edit/:id", userCrtl.putUser);

export default router;