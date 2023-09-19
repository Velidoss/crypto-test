import mongoose from 'mongoose';

interface ICurrency extends Document {
  name: string;
  imageUrl: string;
  values: Array<{ amount: string; time: string }>;
}

const currencySchema = new mongoose.Schema<ICurrency>({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  values: [{ amount: String, time: String }],
});

export const Currency = mongoose.models.Currency || mongoose.model<ICurrency>('Currency', currencySchema);
