import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PayloadJwt } from '../custom';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(400).json({ success: false, message: 'No token found' });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as PayloadJwt;
		req.user = decoded;

		next();
	} catch (err) {
		res.status(401).send('Please authenticate');
	}
};
