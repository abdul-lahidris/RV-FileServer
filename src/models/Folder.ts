import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { File } from './File';
import { User } from './User';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.folders)
  user: User;

  @OneToMany(() => File, file => file.folder)
  files: File[];
}