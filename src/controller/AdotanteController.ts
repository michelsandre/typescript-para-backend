import AdotanteEntity from '../entities/AdotanteEntity';
import { Request, Response } from 'express';
import AdotanteRepository from '../repositories/AdotanteRepository';
import bcrypt from 'bcryptjs';
import EnderecoEntity from '../entities/EnderecoEntity';
import {
  TipoRequestBodyAdotante,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante,
} from '../tipos/tiposAdotante';

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(
    req: Request<{}, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    try {
      const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;

      //Criptografar senha
      const senhaHash = await bcrypt.hash(senha, 8);

      const novoAdotante = new AdotanteEntity(nome, senhaHash, celular, foto, endereco);

      await this.repository.criaAdotante(novoAdotante);
      return res.status(201).send({ data: { id: novoAdotante.id, nome, celular } });
    } catch (error) {
      return res.status(500).send({ error: 'Erro ao criar o adodante' });
    }
  }

  async listaAdotantes(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const listaAdotantes = await this.repository.listaAdotantes();
    const data = listaAdotantes.map((adotante) => {
      return {
        id: adotante.id,
        nome: adotante.nome,
        celular: adotante.celular,
        // pets: adotante.pets,
      };
    });

    return res.status(200).send({ data });
  }

  async atualizaAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaAdotante(
      Number(id),
      req.body as AdotanteEntity
    );

    if (!success) {
      return res.status(404).send({ error: message });
    }

    return res.sendStatus(204);
  }

  async deletaAdodante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { id } = req.params;
    const { success, message } = await this.repository.deletaAdotante(Number(id));

    if (!success) return res.status(404).send({ error: message });

    return res.sendStatus(204);
  }

  async atualizaEnderecoAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.atualizaEnderecoAdotante(
      Number(id),
      req.body.endereco as EnderecoEntity
    );

    if (!success) return res.status(404).send({ error: message });

    return res.sendStatus(204);
  }
}
