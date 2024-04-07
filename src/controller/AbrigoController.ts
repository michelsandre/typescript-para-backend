import { Request, Response } from 'express';
import EnderecoEntity from '../entities/EnderecoEntity';
import AbrigoRepository from '../repositories/AbrigoRepository';
import {
  TipoRequestBodyAbrigo,
  TipoRequestParamsAbrigo,
  TipoResponseBodyAbrigo,
} from '../tipos/tiposAbrigo';
import AbrigoEntity from '../entities/AbrigoEntity';

export default class AbrigoController {
  constructor(private repository: AbrigoRepository) {}

  async criaAbrigo(
    req: Request<{}, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { nome, celular, endereco, email, senha } = <AbrigoEntity>req.body;

    const novoAbrigo = new AbrigoEntity(nome, senha, celular, email, endereco);

    await this.repository.criaAbrigo(novoAbrigo);
    return res
      .status(201)
      .send({ data: { id: novoAbrigo.id, nome, celular, endereco, email } });
  }

  async listaAbrigos(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const listaAbrigos = await this.repository.listaAbrigos();
    const data = listaAbrigos.map((abrigo) => {
      return {
        id: abrigo.id,
        nome: abrigo.nome,
        celular: abrigo.celular,
        email: abrigo.email,
        endereco: abrigo.endereco !== null ? abrigo.endereco : undefined,
      };
    });

    return res.status(200).send({ data });
  }

  async atualizaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;
    await this.repository.atualizaAbrigo(Number(id), req.body as AbrigoEntity);

    return res.sendStatus(204);
  }

  async deletaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;
    await this.repository.deletaAbrigo(Number(id));

    return res.sendStatus(204);
  }

  async atualizaEnderecoAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, EnderecoEntity>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;

    await this.repository.atualizaEnderecoAbrigo(Number(id), req.body);

    return res.sendStatus(204);
  }
}
