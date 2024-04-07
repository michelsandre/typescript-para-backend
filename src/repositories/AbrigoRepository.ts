import { Repository } from 'typeorm';
import EnderecoEntity from '../entities/EnderecoEntity';
import { NaoEncontrado, RequisicaoRuim } from '../utils/manipulaErros';
import InterfaceAbrigoRepository from './interfaces/InterfaceAbrigoRepository';
import AbrigoEntity from '../entities/AbrigoEntity';

export default class AbrigoRepository implements InterfaceAbrigoRepository {
  constructor(private repository: Repository<AbrigoEntity>) {}

  private async verificaCelularAbrigo(celular: string) {
    return await this.repository.findOne({ where: { celular } });
  }

  private async verificaEmailAbrigo(email: string) {
    return await this.repository.findOne({ where: { email } });
  }

  async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
    const existeCelular = await this.verificaCelularAbrigo(abrigo.celular);
    const existeEmail = await this.verificaEmailAbrigo(abrigo.email);
    if (existeCelular || existeEmail) {
      throw new RequisicaoRuim('Celular ou Email já cadastrado');
    }

    await this.repository.save(abrigo);
  }
  async listaAbrigos(): Promise<AbrigoEntity[]> {
    return await this.repository.find();
  }

  async atualizaAbrigo(id: number, abrigo: AbrigoEntity) {
    const abrigoToUpdate = await this.repository.findOne({ where: { id } });

    if (!abrigoToUpdate) throw new NaoEncontrado('Abrigo não encontrado');

    Object.assign(abrigoToUpdate, abrigo);
    await this.repository.save(abrigoToUpdate);
    return { success: true };
  }
  async deletaAbrigo(id: number) {
    const abrigoToRemove = await this.repository.findOne({ where: { id } });

    if (!abrigoToRemove) throw new NaoEncontrado('Abrigo não encontrado');

    await this.repository.remove(abrigoToRemove);
    return { success: true };
  }

  async atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity) {
    const abrigo = await this.repository.findOne({
      where: { id: idAbrigo },
    });

    if (!abrigo) throw new NaoEncontrado('Abrigo não encontrado');

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    abrigo.endereco = novoEndereco;
    await this.repository.save(abrigo);
    return { success: true };
  }
}
