import { Router } from 'express';

import PetController from '../controller/PetController';
import PetRepository from '../repositories/PetRepository';
import { AppDataSource } from '../config/dataSource';

const router = Router();

const petRepository = new PetRepository(
  AppDataSource.getRepository('PetEntity')
);
const petController = new PetController(petRepository);

router.get('/pets', (req, res) => petController.listaPets(req, res));
router.post('/pets', (req, res) => petController.criarPet(req, res));
router.put('/pets/:id', (req, res) => petController.atualizaPet(req, res));
router.delete('/pets/:id', (req, res) => petController.deletaPets(req, res));

export default router;
