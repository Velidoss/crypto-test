import { Request, Response } from 'express';
import { Currency } from '../models/Currency';

export const getCurrencies = async (req: Request, res: Response) => {
  try {
    const currencies = await Currency.find();

    return res.status(200).json({ currencies });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
