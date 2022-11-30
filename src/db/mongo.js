import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGO_URI);
try {
  await mongoClient.connect();
  console.log('Connected to database');
} catch (e) {
  console.error(e);
}

const db = mongoClient.db('Drivencracy');

export const pollCollection = db.collection('polls');