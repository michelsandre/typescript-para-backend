import AdotanteEntity from '../entities/AdotanteEntity';
import { Request, Response } from 'express';
import AdotanteRepository from '../repositories/AdotanteRepository';

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(req: Request, res: Response) {
    try {
      const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;
      const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco);

      await this.repository.criaAdotante(novoAdotante);
      return res.status(201).send(novoAdotante);
    } catch (error) {
      return res.status(500).send({ error: 'Erro ao criar o adodante' });
    }
  }
}
