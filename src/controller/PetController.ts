import { Request, Response } from 'express';
import type TipoPet from '../tipos/TipoPet';
import EnumEspecie from '../enum/EnumEspecie';
import PetRepository from '../repositories/PetRepository';
import PetEntity from '../entities/PetEntity';

let listaDePets: Array<TipoPet> = [];

export default class PetController {
  constructor(private repository: PetRepository) {}

  criarPet(req: Request, res: Response) {
    const { adotado, especie, dataNascimento, nome } = <PetEntity>req.body;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).send({ erro: 'Especie inválida' });
    }
    const novoPet = new PetEntity();
    novoPet.adotado = adotado;
    novoPet.especie = especie;
    novoPet.dataNascimento = dataNascimento;
    novoPet.nome = nome;

    this.repository.criaPet(novoPet);

    return res.status(201).send(novoPet);
  }

  async listaPets(req: Request, res: Response) {
    const listaDePets = await this.repository.listaPet();
    return res.status(200).send(listaDePets);
  }

  atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { adotado, especie, dataNascimento, nome } = <TipoPet>req.body;

    const pet = listaDePets.find((pet) => pet.id === Number(id));

    if (!pet) return res.status(404).send({ erro: 'Pet não encontrado' });

    pet.nome = nome;
    pet.dataNascimento = dataNascimento;
    pet.adotado = adotado;
    pet.especie = especie;

    return res.status(200).send(pet);
  }

  deletaPets(req: Request, res: Response) {
    const { id } = req.params;

    const pet = listaDePets.find((pet) => pet.id === Number(id));

    if (!pet) return res.status(404).send({ error: 'Pet não encontrado' });

    const index = listaDePets.indexOf(pet);
    listaDePets.splice(index, 1);

    return res.status(200).send({ mensagem: 'Pet deletado com sucesso' });
  }
}
