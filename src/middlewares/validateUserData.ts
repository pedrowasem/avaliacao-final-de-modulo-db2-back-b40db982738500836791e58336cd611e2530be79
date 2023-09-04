import { NextFunction, Request, Response } from 'express';

export function validateUserData(req: Request, res: Response, next: NextFunction) {
	const data = req.body;

	if (!data.name) {
		return res.status(400).json({ success: false, message: 'Name is required' });
	}
	if (!data.password) {
		return res.status(400).json({ success: false, message: 'Password is required' });
	}
	next();
}
