import { pgHelper } from '../../database';
import { UserEntity } from '../../database/entities/user.entity';
import { SignUserDTO } from '../../usecases/Users';

export class UserRepository {
	constructor(private _manager = pgHelper.client.manager) {}

	async list() {
		const users = await this._manager.find(UserEntity, {});

		return users;
	}

	async create(data: SignUserDTO) {
		const { name, password } = data;
		const newUser = this._manager.create(UserEntity, { name, password });
		const createdUser = await this._manager.save(newUser);

		return createdUser;
	}

	async findUserByName(name: string) {
		const user = await this._manager.findOne(UserEntity, { where: { name } });

		if (!user) return;

		return user;
	}
}
