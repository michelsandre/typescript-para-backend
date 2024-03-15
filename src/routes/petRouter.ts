import { Router } from 'express';

import PetController from '../controller/PetController';

const router = Router();

const petController = new PetController();

router.get('/pets', petController.listaPets);
router.post('/pets', petController.criarPet);
router.put('/pets/:id', petController.atualizaPet);
router.delete('/pets/:id', petController.deletaPets);

export default router;
