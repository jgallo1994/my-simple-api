import { Router } from 'express';
import {
  createUser,
  getUserById,
  getAllUsers,
} from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);

export default router;
