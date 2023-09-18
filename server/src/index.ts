import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import multer from 'multer';
import './db/connection';
import { Currency } from './models/Currency';
import { v2 as cloudinary } from 'cloudinary';
import './services/coundinaryConnect';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

app.post('/api/add-currency', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file || !req.body.name) {
      return res.status(400).json({ message: 'Name and file are required' });
    }

    const { name } = req.body;
    const image = req.file;

    const b64 = Buffer.from(image.buffer).toString('base64');
    const dataURI = 'data:' + image.mimetype + ';base64,' + b64;

    // Upload the file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(dataURI, { resource_type: 'auto' });

    // Create a new item in MongoDB
    const newItem = new Currency({
      name,
      imageUrl: cloudinaryResponse.secure_url,
    });
    await newItem.save();

    return res.status(201).json({ message: 'Item created successfully', newItem });
  } catch (error) {
    console.log('error!', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
});

app.listen(port, async () => {
  console.log(`Server is running at ${port}`);
});
