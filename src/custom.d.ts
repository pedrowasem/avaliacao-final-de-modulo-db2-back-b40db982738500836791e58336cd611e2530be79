export interface PayloadJwt {
	id: string;
	name: string;
}
declare global {
	namespace Express {
		export interface Request {
			user: PayloadJwt;
		}
	}
}
