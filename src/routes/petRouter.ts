import { Router } from 'express';

import PetController from '../controller/PetController';

const router = Router();

const petController = new PetController();

router.post('/pets', petController.criarPet);

export default router;
