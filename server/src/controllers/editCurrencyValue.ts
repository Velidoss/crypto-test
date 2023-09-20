import { Request, Response } from 'express';
import { Currency } from '../models/Currency';

export const editCurrencyValue = async (req: Request, res: Response) => {
  try {
    const { amount, time } = req.body;
    const { id, valueId } = req.params;

    if (!amount) {
      return res.status(400).json({ message: 'Amount is required in the request body' });
    }

    const currency = await Currency.findById(id);

    if (!currency) {
      return res.status(404).json({ message: 'Currency not found' });
    }

    // const currentDate = new Date();
    // const formattedDate = `${currentDate.getDate()}/${
    //   currentDate.getMonth() + 1
    // }/${currentDate.getFullYear()}: ${currentDate.getSeconds()}/${currentDate.getMinutes()}/${currentDate.getHours()}`;

    currency.values = currency.values.map((value: { amount: string; time: string; _id: string }) => {
      if (value._id.toString() === valueId) {
        return {
          amount,
          time,
        };
      }
      return value;
    });
    await currency.save();

    return res.status(200).json({ message: 'Item updated successfully', currency });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
