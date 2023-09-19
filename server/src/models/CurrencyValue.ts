import mongoose from 'mongoose';

export interface ICurrencyValue {
  amount: string;
  time: string;
}

export const currencyValueSchema = new mongoose.Schema<ICurrencyValue>({
  amount: String,
  time: String,
});

export const CurrencyValue = mongoose.model<ICurrencyValue>('Currency', currencyValueSchema);
