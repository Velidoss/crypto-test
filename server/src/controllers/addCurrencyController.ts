import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { Currency } from '../models/Currency';

export const addCurrencyController = async (req: Request, res: Response) => {
  try {
    const { file, body } = req;

    // Check for required fields
    if (!file || !body.name) {
      return res.status(400).json({ message: 'Name and file are required' });
    }

    const { name } = body;
    const dataURI = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    // Upload the file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(dataURI, { resource_type: 'auto' });

    // Create a new item in MongoDB
    const newItem = new Currency({
      name,
      values: [],
      imageUrl: cloudinaryResponse.secure_url,
    });
    await newItem.save();

    return res.status(201).json({ message: 'Item created successfully', newItem });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
