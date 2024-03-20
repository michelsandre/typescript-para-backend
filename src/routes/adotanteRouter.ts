import { Router } from 'express';
import AdotanteRepository from '../repositories/AdotanteRepository';
import { AppDataSource } from '../config/dataSource';
import AdotanteController from '../controller/AdotanteController';

const router = Router();

const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository('AdotanteEntity'));
const adotanteController = new AdotanteController(adotanteRepository);

router.post('/adotantes', (req, res) => adotanteController.criaAdotante(req, res));

export default router;
