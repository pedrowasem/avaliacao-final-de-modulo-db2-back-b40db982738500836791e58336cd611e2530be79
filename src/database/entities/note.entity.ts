import { randomUUID } from 'crypto';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'notes' })
export class NoteEntity {
	@PrimaryColumn({ name: 'id', type: 'uuid' })
	id!: string;

	@Column({ name: 'title', type: 'varchar', length: 50 })
	title!: string;

	@Column({ name: 'description', type: 'varchar', length: 255 })
	description!: string;

	@Column({ name: 'created_at', type: 'timestamp', nullable: false })
	createdAt!: Date;

	@Column({ name: 'updated_at', type: 'timestamp' })
	UpdatedAt!: Date;

	@Column({ name: 'favorite', type: 'boolean', default: false })
	favorite!: boolean;

	@Column({ name: 'stored', type: 'boolean', default: false })
	stored!: boolean;

	@Column({ name: 'user_id', type: 'uuid', nullable: false })
	userId!: string;

	@ManyToOne(() => UserEntity, (user) => user.notes)
	@JoinColumn({
		name: 'user_id',
		foreignKeyConstraintName: 'notes_user_id_fkey',
		referencedColumnName: 'id',
	})
	user!: UserEntity;

	@BeforeInsert()
	beforeInsert() {
		this.id = randomUUID();
		this.createdAt = new Date();
		this.favorite = false;
		this.stored = false;
	}
}
