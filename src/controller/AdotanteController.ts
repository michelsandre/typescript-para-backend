import AdotanteEntity from '../entities/AdotanteEntity';
import { Request, Response } from 'express';
import AdotanteRepository from '../repositories/AdotanteRepository';
import bcrypt from 'bcryptjs';

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(req: Request, res: Response) {
    try {
      const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;

      //Criptografar senha
      const senhaHash = await bcrypt.hash(senha, 8);

      const novoAdotante = new AdotanteEntity(nome, senhaHash, celular, foto, endereco);

      await this.repository.criaAdotante(novoAdotante);
      return res.status(201).send(novoAdotante);
    } catch (error) {
      return res.status(500).send({ error: 'Erro ao criar o adodante' });
    }
  }

  async listaAdotantes(req: Request, res: Response) {
    const listaAdotantes = await this.repository.listaAdotantes();
    return res.status(200).send(listaAdotantes);
  }

  async atualizaAdotante(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaAdotante(
      Number(id),
      req.body as AdotanteEntity
    );

    if (!success) {
      return res.status(404).send(message);
    }

    return res.sendStatus(204);
  }

  async deletaAdodante(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.deletaAdotante(Number(id));

    if (!success) return res.status(404).send(message);

    return res.sendStatus(204);
  }
}
