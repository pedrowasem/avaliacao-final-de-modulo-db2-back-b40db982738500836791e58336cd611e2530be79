import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { NoteEntity } from './note.entity';

@Entity({ name: 'user' })
export class UserEntity {
	@PrimaryColumn()
	id!: string;

	@Column({ unique: true, type: 'varchar', length: 50 })
	name!: string;

	@Column({ type: 'varchar', length: 255 })
	password!: string;

	@Column({ name: 'created_at', type: 'timestamp', nullable: false })
	createdAt!: Date;

	@Column({ name: 'updated_at', type: 'timestamp' })
	UpdatedAt!: Date;

	@OneToMany(() => NoteEntity, (note) => note.user)
	notes!: NoteEntity[];

	@BeforeInsert()
	beforeInsert() {
		this.createdAt = new Date();
	}
}
