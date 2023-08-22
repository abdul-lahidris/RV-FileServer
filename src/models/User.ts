import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { File } from "./File";
import { Folder } from "./Folder";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  role: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Folder, folder => folder.user)
  folders: Folder[];

  @OneToMany(() => File, file => file.user)
  files: File[];
}

