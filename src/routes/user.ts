import {Router} from 'express';
import { deleteUser, getUsers, login, registerUser } from '../handlers'
import {auth} from '../middlewares/auth'
const router = Router();





router.post("/create", registerUser)
router.post("/login", login)
router.get("/showAll", getUsers)
router.route("/:user_id").delete(auth, deleteUser)




export default router;