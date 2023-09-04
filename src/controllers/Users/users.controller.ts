import { Request, Response } from 'express';
import { ListAllUsers, Login, SignUser } from '../../usecases/Users';

export class UsersController {
	public async create(req: Request, res: Response) {
		const { name, password } = req.body;

		const usecase = new SignUser({
			name,
			password,
		});

		const response = await usecase.execute();

		if (!response.success) {
			return res.status(400).json(response);
		}

		return res.status(201).json(response);
	}

	public async listAllUsers(req: Request, res: Response) {
		const usecase = new ListAllUsers();
		const response = await usecase.execute();

		if (!response.success) {
			return res.status(400).json(response);
		}
		return res.status(201).json(response);
	}

	public async login(req: Request, res: Response) {
		const { name, password } = req.body;

		const usecase = new Login({
			name,
			password,
		});

		const response = await usecase.execute();

		if (!response.success) {
			return res.status(400).json(response);
		}
		return res.status(201).json(response);
	}
}
