import { Router } from "express";
import { isAuthed } from "../../middlewares/isAuthed.js";
import { authorize } from "../../middlewares/role-base-authorize.js";
import { UserController } from "./user.controller.js";

const router = Router()

router.get("/" , isAuthed , authorize(["admin"]) , UserController.getUsers)
router.delete("/:userId" , isAuthed , authorize(["admin"]) , UserController.deleteCustomer)
export default router