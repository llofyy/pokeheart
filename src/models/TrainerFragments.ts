import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import Trainer from './Trainer';

@Entity('trainer_fragments')
export default class TrainerFragments {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('integer')
  trainerId: number

  @JoinColumn({ name: 'trainerId' })
  @ManyToMany(() => Trainer)
  trainer: Trainer

  @Column()
  fragment: string

  @Column('integer')
  counter: number

  @CreateDateColumn()
  createdAt: Date
}
