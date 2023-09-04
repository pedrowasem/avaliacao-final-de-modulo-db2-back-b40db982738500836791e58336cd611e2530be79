import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../repository';

export type LoginDTO = {
	name: string;
	password: string;
};
type LoginReturn = {
	success: boolean;
	message: string;
	token?: string;
};
export class Login {
	#data: LoginDTO;

	constructor(data: LoginDTO) {
		this.#data = data;
	}

	async execute(): Promise<LoginReturn> {
		const user = await new UserRepository().findUserByName(this.#data.name);

		if (!user) {
			return {
				success: false,
				message: 'Usuário não encontrado',
			};
		}

		const isPasswordCorrect = await bcrypt.compare(this.#data.password, user.password);
		if (!isPasswordCorrect) {
			return {
				success: false,
				message: 'Senha está errda',
			};
		}

		const payload = { id: user.id, name: user.name };

		const token = jwt.sign(payload, process.env.JWT_SECRET!);

		if (!token) {
			return {
				success: false,
				message: 'Failed to login',
			};
		}
		return {
			success: true,
			message: 'User logged successfully',
			token,
		};
	}
}
