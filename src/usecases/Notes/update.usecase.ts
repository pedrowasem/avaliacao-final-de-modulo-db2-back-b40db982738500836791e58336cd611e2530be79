import Notes from '../../models/notes.class';
import { NotesRepository } from '../../repository';

export type UpdateNoteDTO = {
	id: string;
	title: string;
	description: string;
};

type UpdateReturn = {
	success: boolean;
	message: string;
	updatedData?: Notes;
};

export class UpdateNote {
	#data: UpdateNoteDTO;

	constructor(data: UpdateNoteDTO) {
		this.#data = data;
	}

	public async execute(): Promise<UpdateReturn> {
		const note = new NotesRepository().getNoteById(this.#data.id);
		if (!note) {
			return {
				success: false,
				message: 'Id does not exist',
			};
		}

		const { id, title, description } = this.#data;

		const updateNote = await new NotesRepository().update(id, { title, description });

		return {
			success: true,
			message: 'Note updated successfully',
			updatedData: updateNote,
		};
	}
}
