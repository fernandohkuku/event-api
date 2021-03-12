import {Router} from 'express';
import { deleteUser, getUser, getUsers, login, registerUser } from '../handlers'
import {auth} from '../middlewares/auth'
const router = Router();





router.post("/create", registerUser)
router.post("/login", login)
router.get("/showAll",auth, getUsers)
router.route("/:user_id").delete(auth, deleteUser).get(auth, getUser)




export default router;