import { NextFunction, Request, Response } from 'express';

export function validateUpdateNoteData(request: Request, response: Response, next: NextFunction) {
	const { title, description } = request.body;

	if (!title || !description) {
		return response.status(400).json({
			success: false,
			message: 'Title and description inputs are required',
			data: null,
		});
	}
	next();
}
