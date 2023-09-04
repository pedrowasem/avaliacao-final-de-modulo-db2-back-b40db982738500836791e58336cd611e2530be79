import { NextFunction, Request, Response } from 'express';
export function validateNotesData(req: Request, res: Response, next: NextFunction) {
	const data = req.body;
	if (!data.title) {
		return res.status(400).json({ success: false, message: 'Title is required' });
	}
	if (!data.description) {
		return res.status(400).json({ success: false, message: 'Description is required' });
	}
	next();
}
