import { NotesRepository } from '../../repository';

type DeleteNoteReturn = {
	success: boolean;
	message: string;
	deletedNoteId?: string;
};

export class DeleteNote {
	#id: string;

	constructor(id: string) {
		this.#id = id;
	}

	async execute(): Promise<DeleteNoteReturn> {
		const id = await new NotesRepository().delete(this.#id);

		return {
			success: true,
			message: 'Note deleted successfully',
			deletedNoteId: id,
		};
	}
}
