import { CreateNoteModelDTO, UpdateNoteDTO } from '../usecases/Notes';

export type NotesDTO = {
	_id: string;
	_title: string;
	_description: string;
	_userId: string;
	_createdAt: string;
	_favorite: boolean;
	_stored: boolean;
};

export default class Notes {
	private _id: string;
	private _title: string;
	private _description: string;
	private _userId: string;
	private _createdAt: string;
	private _favorite: boolean;
	private _stored: boolean;

	constructor(data: CreateNoteModelDTO) {
		this._id = data.id;
		this._title = data.title;
		this._description = data.description;
		this._userId = data.userId;
		this._createdAt = data.createdAt.toLocaleDateString('pt-BR');
		this._favorite = data.favorite;
		this._stored = data.stored;
	}

	toJson() {
		return {
			_id: this._id,
			_title: this._title,
			_description: this._description,
			_userId: this._userId,
			_createdAt: this._createdAt,
			_favorite: this._favorite,
			_stored: this._stored,
		};
	}

	update(data: Omit<UpdateNoteDTO, 'id'>) {
		this._title = data.title;
		this._description = data.description;
		return this;
	}

	toogleFavorite() {
		this._favorite = !this._favorite;
	}

	toogleStored() {
		this._stored = !this._stored;
	}
}
