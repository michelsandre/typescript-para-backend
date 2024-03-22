import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import EnumEspecie from '../enum/EnumEspecie';
import AdotanteEntity from './AdotanteEntity';

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  especie: EnumEspecie;
  @Column()
  dataNascimento: Date;
  @Column()
  adotado: boolean;
  @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
  adotante!: AdotanteEntity;

  constructor(nome: string, especie: EnumEspecie, dataNascimento: Date, adotado: boolean) {
    this.nome = nome;
    this.especie = especie;
    this.dataNascimento = dataNascimento;
    this.adotado = adotado;
  }
}
