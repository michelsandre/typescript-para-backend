import { RequestHandler, Router } from 'express';

import PetController from '../controller/PetController';
import PetRepository from '../repositories/PetRepository';
import { AppDataSource } from '../config/dataSource';
import { middlewareValidadorBodyPet } from '../middleware/validadores/petRequestBody';

const router = Router();

const petRepository = new PetRepository(
  AppDataSource.getRepository('PetEntity'),
  AppDataSource.getRepository('AdotanteEntity')
);
const petController = new PetController(petRepository);

const validateBodyPet: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyPet(req, res, next);

router.get('/pets', (req, res) => petController.listaPets(req, res));
router.post('/pets', validateBodyPet, (req, res) => petController.criarPet(req, res));
router.put('/pets/:id', (req, res) => petController.atualizaPet(req, res));
router.delete('/pets/:id', (req, res) => petController.deletaPets(req, res));
router.put('/pets/:pet_id/:adotante_id', (req, res) => petController.adotaPet(req, res));
router.get('/pets/filtro', (req, res) => petController.buscaPetPorCampoGenerico(req, res));

export default router;
