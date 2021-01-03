import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import Image from './Image';

@Entity('pets')
export default class Pet {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  type: boolean;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  sex: boolean;

  @Column()
  port: string;

  @Column()
  breed: string;

  @Column()
  information: string;

  @Column()
  responsible_name: string;

  @Column()
  phone: string;

  @OneToMany(() => Image, image => image.pet, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'pet_id' })
  images: Image[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
