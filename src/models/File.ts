import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Folder } from './Folder';
import { User } from './User';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.files)
  user: User;

  @ManyToOne(() => Folder, folder => folder.files, { nullable: true })
  folder: Folder;
}