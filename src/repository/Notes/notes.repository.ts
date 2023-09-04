import { FindOptionsWhere, ILike } from 'typeorm';
import { pgHelper } from '../../database';
import { NoteEntity } from '../../database/entities/note.entity';
import Notes from '../../models/notes.class';
import { CreateNoteDTO, ListNotesFiltersDTO, UpdateNoteDTO } from '../../usecases/Notes';

export class NotesRepository {
	constructor(private _manager = pgHelper.client.manager) {}

	async listNotes({ userId, titleParse, favoriteParse, storedParse }: ListNotesFiltersDTO) {
		const clause: FindOptionsWhere<NoteEntity> = {
			userId,
		};

		clause.stored = storedParse;
		if (titleParse) {
			clause.title = ILike(`%${titleParse}%`);
		}
		if (favoriteParse) {
			clause.favorite = favoriteParse;
		}

		const filteredNotes = await this._manager.find(NoteEntity, {
			where: clause,
			relations: {
				user: true,
			},
			order: {
				createdAt: 'asc',
			},
		});

		console.log(filteredNotes[0].createdAt.toLocaleDateString());

		return filteredNotes.map((note) => this.entityToModel(note));
	}

	async create(data: CreateNoteDTO) {
		const { description, title, userId } = data;
		const newNote = this._manager.create(NoteEntity, { title, description, userId });
		const createdNote = await this._manager.save(newNote);

		return this.entityToModel(createdNote);
	}

	async getNoteById(id: string) {
		const note = await this._manager.findOne(NoteEntity, {
			where: { id },
		});

		return note;
	}

	async update(id: string, { title, description }: Omit<UpdateNoteDTO, 'id'>) {
		await this._manager.update(NoteEntity, { id }, { title, description });

		const note = await this.getNoteById(id);

		return this.entityToModel(note!);
	}

	async delete(id: string) {
		await this._manager.delete(NoteEntity, { id });
		return id;
	}

	async favorite(id: string) {
		const note = await this.getNoteById(id);
		if (!note) return note;

		note.favorite = !note.favorite;

		await this._manager.update(NoteEntity, { id }, { favorite: note.favorite });
		return this.entityToModel(note);
	}

	async store(id: string) {
		const note = await this.getNoteById(id);
		if (!note) return note;

		note.stored = !note.stored;

		await this._manager.update(NoteEntity, { id }, { stored: note.stored });
		return this.entityToModel(note);
	}

	private entityToModel(data: NoteEntity): Notes {
		const { id, title, description, createdAt, favorite, stored, userId } = data;

		const note = new Notes({ id, title, description, createdAt, favorite, stored, userId });

		return note;
	}
}
