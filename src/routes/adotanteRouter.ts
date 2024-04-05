import { RequestHandler, Router } from 'express';
import AdotanteRepository from '../repositories/AdotanteRepository';
import { AppDataSource } from '../config/dataSource';
import AdotanteController from '../controller/AdotanteController';
import { middlewareValidadorBodyAdotante } from '../middleware/validadores/adotanteRequestBody';
import { middlewareValidadorBodyEndereco } from '../middleware/validadores/enderecoRequetBody';

const router = Router();

const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository('AdotanteEntity'));
const adotanteController = new AdotanteController(adotanteRepository);

const validateBodyAdotante: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyAdotante(req, res, next);

const validateBodyEndereco: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyEndereco(req, res, next);

router.get('/', (req, res) => adotanteController.listaAdotantes(req, res));
router.post('/', validateBodyAdotante, (req, res) => adotanteController.criaAdotante(req, res));
router.put('/:id', (req, res) => adotanteController.atualizaAdotante(req, res));
router.delete('/:id', (req, res) => adotanteController.deletaAdodante(req, res));
router.patch('/:id', validateBodyEndereco, (req, res) =>
  adotanteController.atualizaEnderecoAdotante(req, res)
);

export default router;
