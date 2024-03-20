import { Repository } from 'typeorm';
import AdotanteEntity from '../entities/AdotanteEntity';
import InterfaceAdotanteRepository from './interfaces/InterfaceAdotanteRepository';

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  private repository: Repository<AdotanteEntity>;

  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }

  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    await this.repository.save(adotante);
  }
}
