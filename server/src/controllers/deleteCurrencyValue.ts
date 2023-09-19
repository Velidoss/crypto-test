import { Request, Response } from 'express';
import { Currency } from '../models/Currency';

export const deleteCurrencyValue = async (req: Request, res: Response) => {
  try {
    const { id, valueId } = req.params;

    const currency = await Currency.findById(id);

    if (!currency) {
      return res.status(404).json({ message: 'Currency not found' });
    }

    const valueIndex = currency.values.findIndex(
      (value: { amount: string; time: string; _id: string }) => value._id.toString() === valueId,
    );

    if (valueIndex === -1) {
      return res.status(404).json({ message: 'Value not found in Currency' });
    }

    currency.values.splice(valueIndex, 1);

    await currency.save();

    return res.status(200).json({ message: 'Value deleted successfully', currency });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
