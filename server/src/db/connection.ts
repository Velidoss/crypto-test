// import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const dbUserName = process.env.ATLAS_USER_NAME;
const dbUserPassword = process.env.ATLAS_USER_PASSWORD;

const uri = `mongodb+srv://${dbUserName}:${dbUserPassword}@cluster0.socjpd3.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri);
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 });
//     console.log('Pinged your deployment. You successfully connected to MongoDB!');
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run().catch(console.dir);
