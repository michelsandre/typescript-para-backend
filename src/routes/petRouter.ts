import { RequestHandler, Router } from 'express';

import PetController from '../controller/PetController';
import PetRepository from '../repositories/PetRepository';
import { AppDataSource } from '../config/dataSource';
import { middlewareValidadorBodyPet } from '../middleware/validadores/petRequestBody';
import { erroMiddleware } from '../middleware/erro';
import { verificaIdMiddleware } from '../middleware/verificaId';

const router = Router();

const petRepository = new PetRepository(
  AppDataSource.getRepository('PetEntity'),
  AppDataSource.getRepository('AdotanteEntity')
);
const petController = new PetController(petRepository);

const validateBodyPet: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyPet(req, res, next);

router.get('/', (req, res) => petController.listaPets(req, res));
router.post('/', validateBodyPet, (req, res) =>
  petController.criarPet(req, res)
);
router.put('/:id', verificaIdMiddleware, (req, res) =>
  petController.atualizaPet(req, res)
);
router.delete('/:id', verificaIdMiddleware, (req, res) =>
  petController.deletaPets(req, res)
);
router.put('/:pet_id/:adotante_id', verificaIdMiddleware, (req, res) =>
  petController.adotaPet(req, res)
);
router.get('/filtro', (req, res) =>
  petController.buscaPetPorCampoGenerico(req, res)
);

export default router;
