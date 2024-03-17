import { Request, Response } from 'express';
import type TipoPet from '../tipos/TipoPet';
import EnumEspecie from '../enum/EnumEspecie';

let listaDePets: Array<TipoPet> = [];


let id = 0;

function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
  criarPet(req: Request, res: Response) {
    const { id, adotado, especie, dataNascimento
      , nome } = <TipoPet>req.body;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).send({ erro: 'Especie inválida' });
    }
    const novoPet: TipoPet = { id: geraId(), adotado, especie, dataNascimento, nome };

    listaDePets.push(novoPet);

    return res.status(201).send(novoPet);
  }

  listaPets(req: Request, res: Response) {
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
