import { Router } from "express";
import { isAuthed } from "../../middlewares/isAuthed.js";
import { authorize } from "../../middlewares/role-base-authorize.js";
import { UserController } from "./user.controller.js";
import { validate } from "../../middlewares/validate.js";
import { UpdateUserSchema } from "./dto/update-user-dto.js";

const router = Router()

router.get("/" , isAuthed , authorize(["admin"]) , UserController.getUsers)
router.delete("/:userId" , isAuthed , authorize(["admin"]) , UserController.deleteCustomer)
router.put("/:userId" , validate(UpdateUserSchema), isAuthed , authorize(["admin" , "customer"]) , UserController.updateUser)
export default router