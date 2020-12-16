import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('commitsStats')
class CommitsStats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_login: string;

  @Column()
  lines_added: number;

  @Column()
  lines_removed: number;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CommitsStats;
