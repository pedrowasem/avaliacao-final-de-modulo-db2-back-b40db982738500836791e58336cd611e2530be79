import Notes from '../models/notes.class';
import User from '../models/users.class';
export * from './ormconfig';
export * from './pg-helper';
export * from './typeorm';

export const usersDb: User[] = [];
export const notesDb: Notes[] = [];
