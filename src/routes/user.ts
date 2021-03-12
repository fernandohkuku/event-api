import {Router} from 'express';
import { deleteUser, registerUser } from '../handlers'
import {auth} from '../middlewares/auth'
const router = Router();

router.post("/create", registerUser)
router.route("/:user_id").delete(auth, deleteUser)




export default router;