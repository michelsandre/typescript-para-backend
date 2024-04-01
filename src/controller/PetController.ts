import { Request, Response } from 'express';
import PetRepository from '../repositories/PetRepository';
import PetEntity from '../entities/PetEntity';

import { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet } from '../tipos/tiposPet';

export default class PetController {
  constructor(private repository: PetRepository) {}

  async criarPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>
  ) {
    const { adotado, especie, dataNascimento, nome, porte } = <PetEntity>req.body;

    const novoPet = new PetEntity(nome, especie, dataNascimento, adotado, porte);

    await this.repository.criaPet(novoPet);

    return res.status(201).send({ data: { id: novoPet.id, nome, especie, porte } });
  }

  async listaPets(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>
  ) {
    const listaDePets = await this.repository.listaPet();

    const data = listaDePets.map((pet) => {
      return {
        id: pet.id,
        nome: pet.nome,
        especie: pet.especie,
        porte: pet.porte !== null ? pet.porte : undefined,
      };
    });

    return res.status(200).send({ data });
  }

  async atualizaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>
  ) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );

    if (!success) {
      return res.status(404).send({ error: message });
    }
    return res.sendStatus(204);
  }

  async deletaPets(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>
  ) {
    const { id } = req.params;
    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).send({ error: message });
    }
    return res.sendStatus(204);
  }

  async adotaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>
  ) {
    const { pet_id, adotante_id } = req.params;
    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(adotante_id)
    );

    if (!success) return res.status(404).send({ error: message });

    return res.sendStatus(204);
  }

  async buscaPetPorCampoGenerico(req: Request, res: Response) {
    const { campo, valor } = req.query;

    const listaDePets = await this.repository.buscaPetPorCampoGenerico(
      campo as keyof PetEntity,
      valor as string
    );

    return res.status(200).send(listaDePets);
  }
}
