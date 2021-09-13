import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('trainers')
export default class Trainers {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  genre: string

  @Column()
  password: string

  @Column()
  region: string

  @Column('integer')
  age: number

  @Column('integer')
  captures: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
