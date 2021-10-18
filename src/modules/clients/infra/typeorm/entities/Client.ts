import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import City from "@modules/cities/infra/typeorm/entities/City";

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  birthDate: Date;

  @Column({ select: false })
  city_id: string;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Client;
