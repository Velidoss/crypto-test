import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import multer from 'multer';
import './db/connection';
import './services/coundinaryConnect';
import { addCurrencyController } from './controllers/addCurrencyController';
import { addCurrencyValueController } from './controllers/addCurrencyValueController';
import { editCurrencyValueController } from './controllers/editCurrencyValueController';
import { deleteCurrencyValueController } from './controllers/deleteCurrencyValueController';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

app.post('/api/add-currency', upload.single('image'), addCurrencyController);
app.put('/api/add-currency-value/:id', addCurrencyValueController);
app.patch('/api/edit-currency-value/:id', editCurrencyValueController);
app.delete('/api/delete-currency-value/:id', deleteCurrencyValueController);

app.listen(port, async () => {
  console.log(`Server is running at ${port}`);
});
