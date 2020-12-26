import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Pet from './Pet';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Pet, pet => pet.images)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;
}
