import {Router} from "express"
import { deleteUserById } from "./controller"

const router = Router()

router.delete("/:id", deleteUserById)

export default router