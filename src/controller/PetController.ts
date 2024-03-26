import { Request, Response } from 'express';
import type TipoPet from '../tipos/TipoPet';
import EnumEspecie from '../enum/EnumEspecie';
import PetRepository from '../repositories/PetRepository';
import PetEntity from '../entities/PetEntity';
import EnumPorte from '../enum/EnumPorte';

let listaDePets: Array<TipoPet> = [];

export default class PetController {
  constructor(private repository: PetRepository) {}

  async criarPet(req: Request, res: Response) {
    const { adotado, especie, dataNascimento, nome, porte } = <PetEntity>req.body;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).send({ erro: 'Especie inválida' });
    }

    if (porte && !(porte in EnumPorte)) {
      return res.status(400).send({ erro: 'Porte inválido' });
    }

    const novoPet = new PetEntity(nome, especie, dataNascimento, adotado, porte);

    await this.repository.criaPet(novoPet);

    return res.status(201).send(novoPet);
  }

  async listaPets(req: Request, res: Response) {
    const listaDePets = await this.repository.listaPet();
    return res.status(200).send(listaDePets);
  }

  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );

    if (!success) {
      return res.status(404).send({ message });
    }
    return res.sendStatus(204);
  }

  async deletaPets(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).send({ message });
    }
    return res.sendStatus(204);
  }

  async adotaPet(req: Request, res: Response) {
    const { pet_id, adotante_id } = req.params;
    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(adotante_id)
    );

    if (!success) return res.status(404).send({ message });

    return res.sendStatus(204);
  }

  async buscaPetPeloPorte(req: Request, res: Response) {
    const { porte } = req.query;

    const listaDePets = await this.repository.buscaPetPeloPorte(porte as EnumPorte);

    return res.status(200).send(listaDePets);
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
