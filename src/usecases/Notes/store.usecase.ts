import Notes from '../../models/notes.class';
import { NotesRepository } from '../../repository';

type StoreNoteReturn = {
	success: boolean;
	message: string;
	updatedData?: Notes;
};

export class StoreNote {
	#id: string;

	constructor(id: string) {
		this.#id = id;
	}

	async execute(): Promise<StoreNoteReturn> {
		const note = await new NotesRepository().store(this.#id);

		if (!note) {
			return {
				success: true,
				message: 'Note not found',
			};
		}

		return {
			success: true,
			message: 'Note updated successfully',
			updatedData: note,
		};
	}
}
