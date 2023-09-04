import { NextFunction, Request, Response } from 'express';

export function validateNoteId(request: Request, response: Response, next: NextFunction) {
	const { id } = request.params;

	if (!id) {
		return response.status(400).json({
			sucesso: false,
			mensagem: 'Id is required',
			dados: null,
		});
	}

	const regexUUID =
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
	const isValisId = regexUUID.test(id);

	if (!isValisId) {
		return response.status(400).json({
			sucesso: false,
			mensagem: 'Id is not valid',
			dados: null,
		});
	}

	next();
}
