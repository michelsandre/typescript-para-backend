import { Router } from 'express';
import AdotanteRepository from '../repositories/AdotanteRepository';
import { AppDataSource } from '../config/dataSource';
import AdotanteController from '../controller/AdotanteController';

const router = Router();

const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository('AdotanteEntity'));
const adotanteController = new AdotanteController(adotanteRepository);

router.get('/adotantes', (req, res) => adotanteController.listaAdotantes(req, res));
router.post('/adotantes', (req, res) => adotanteController.criaAdotante(req, res));
router.put('/adotantes/:id', (req, res) => adotanteController.atualizaAdotante(req, res));
router.delete('/adotantes/:id', (req, res) => adotanteController.deletaAdodante(req, res));

export default router;
