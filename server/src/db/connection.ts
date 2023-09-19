// import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const dbUserName = process.env.ATLAS_USER_NAME;
const dbUserPassword = process.env.ATLAS_USER_PASSWORD;

const uri = `mongodb+srv://${dbUserName}:${dbUserPassword}@cluster0.socjpd3.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri);
