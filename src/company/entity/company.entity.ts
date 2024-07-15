import { Tag } from '../../tag/entity/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  recommendation: number;

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.companies, {
    cascade: true,
  })
  tags: Tag[];
}
