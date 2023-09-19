import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import multer from 'multer';
import './db/connection';
import './services/coundinaryConnect';
import { addCurrency } from './controllers/addCurrency';
import { addCurrencyValue } from './controllers/addCurrencyValue';
import { editCurrencyValue } from './controllers/editCurrencyValue';
import { deleteCurrencyValue } from './controllers/deleteCurrencyValue';
import { getCurrencies } from './controllers/getCurrencies';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get('/api/get-currencies', getCurrencies);

app.post('/api/add-currency', upload.single('image'), addCurrency);
app.put('/api/add-currency-value/:id', addCurrencyValue);
app.patch('/api/edit-currency-value/:id/:valueId', editCurrencyValue);
app.delete('/api/delete-currency-value/:id/:valueId', deleteCurrencyValue);

app.listen(port, async () => {
  console.log(`Server is running at ${port}`);
});
