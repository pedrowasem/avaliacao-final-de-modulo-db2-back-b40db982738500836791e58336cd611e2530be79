import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { NotesController, UsersController } from './controllers';
import { pgHelper } from './database';
import {
	validateNoteId,
	validateNotesData,
	validateToken,
	validateUpdateNoteData,
	validateUserData,
} from './middlewares';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
	return res.json('Hello World!');
});

// ===============================================

const usersController = new UsersController();

app.post('/users', validateUserData, usersController.create);

app.get('/users', usersController.listAllUsers);

app.post('/login', usersController.login);

const notesController = new NotesController();

app.post('/notes', validateToken, validateNotesData, notesController.create);

app.get('/notes', validateToken, notesController.listNotes);

app.put(
	'/notes/:id',
	validateToken,
	validateNoteId,
	validateUpdateNoteData,
	notesController.update,
);

app.put('/notes/:id/favorite', validateToken, validateNoteId, notesController.favorite);

app.put('/notes/:id/store', validateToken, validateNoteId, notesController.store);

app.delete('/notes/:id', validateToken, validateNoteId, notesController.delete);

pgHelper
	.connect()
	.then(() => {
		// executa aqui quando a conexão for estabelecida com o postgres
		app.listen(process.env.PORT, () =>
			console.log(`Servidor rodando na porta ${process.env.PORT} 🚀`),
		);
	})
	.catch((err) => {
		// executa aqui quando a conexão não for estabelecida por qualquer tipo de erro
		console.log(err);
	});
