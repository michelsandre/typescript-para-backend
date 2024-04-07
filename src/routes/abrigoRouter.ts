import { RequestHandler, Router } from 'express';
import { AppDataSource } from '../config/dataSource';
import { middlewareValidadorBodyEndereco } from '../middleware/validadores/enderecoRequetBody';
import { verificaIdMiddleware } from '../middleware/verificaId';
import AbrigoRepository from '../repositories/AbrigoRepository';
import AbrigoController from '../controller/AbrigoController';
import { middlewareValidadorBodyAbrigo } from '../middleware/validadores/abrigoRequestBody';

const router = Router();

const abrigoRepository = new AbrigoRepository(
  AppDataSource.getRepository('AbrigoEntity')
);
const abrigoController = new AbrigoController(abrigoRepository);

const validateBodyAbrigo: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyAbrigo(req, res, next);

const validateBodyEndereco: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyEndereco(req, res, next);

router.get('/', (req, res) => abrigoController.listaAbrigos(req, res));
router.post('/', validateBodyAbrigo, (req, res) =>
  abrigoController.criaAbrigo(req, res)
);
router.put('/:id', verificaIdMiddleware, (req, res) =>
  abrigoController.atualizaAbrigo(req, res)
);
router.delete('/:id', verificaIdMiddleware, (req, res) =>
  abrigoController.deletaAbrigo(req, res)
);
router.patch('/:id', verificaIdMiddleware, validateBodyEndereco, (req, res) =>
  abrigoController.atualizaEnderecoAbrigo(req, res)
);

export default router;
