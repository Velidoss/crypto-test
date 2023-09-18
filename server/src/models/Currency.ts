import mongoose from 'mongoose';

interface ICurrency extends Document {
  name: string;
  imageUrl: string;
}

const currencySchema = new mongoose.Schema<ICurrency>({
  name: String,
  imageUrl: String,
});

export const Currency = mongoose.model<ICurrency>('Currency', currencySchema);
