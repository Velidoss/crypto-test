import { Request, Response } from 'express';
import { Currency } from '../models/Currency';

export const addCurrencyValueController = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const { id } = req.params;

    if (!amount) {
      return res.status(400).json({ message: 'Amount is required in the request body' });
    }

    const currency = await Currency.findById(id);
    if (!currency) {
      return res.status(404).json({ message: 'Currency not found' });
    }
    // const newValue = new CurrencyValue({
    //   amount,
    //   time: new Date(),
    // });

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}: ${currentDate.getSeconds()}/${currentDate.getMinutes()}/${currentDate.getHours()}`;
    console.log(
      '🚀 ~ file: addCurrencyValueController.ts:16 ~ addCurrencyValueController ~ currency:',
      currency,
      'values',
      currency.values,
    );

    currency.values.push({
      amount,
      time: formattedDate,
    });
    await currency.save();

    return res.status(200).json({ message: 'Item updated successfully', currency });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
