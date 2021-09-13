import {
  Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import Pokemon from './Pokemon';
import Trainer from './Trainer';

@Entity()
export default class TrainerPokemons {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('integer')
  trainerId: number

  @JoinColumn({ name: 'trainerId' })
  @ManyToMany(() => Trainer)
  trainer: Trainer

  @Column('integer')
  pokemonId: number

  @Column('integer')
  cp: number

  @JoinColumn({ name: 'pokemonId' })
  @ManyToMany(() => Pokemon)
  pokemon: Pokemon
}
