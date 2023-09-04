import Notes from '../../models/notes.class';
import { NotesRepository } from '../../repository';

type FavoriteNoteReturn = {
	success: boolean;
	message: string;
	updatedData?: Notes;
};

export class FavoriteNote {
	#id: string;

	constructor(id: string) {
		this.#id = id;
	}

	async execute(): Promise<FavoriteNoteReturn> {
		const note = await new NotesRepository().favorite(this.#id);

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
