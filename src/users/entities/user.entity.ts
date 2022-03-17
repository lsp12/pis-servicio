import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:"reg_users"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

}
