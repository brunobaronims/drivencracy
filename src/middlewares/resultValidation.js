import { ObjectId } from 'mongodb';

import { pollCollection } from "../db/mongo.js";

export async function resultValidation(req, res, next) {
  const pollId = new ObjectId(req.params.id);

  try {
    const poll = await pollCollection.findOne({ _id: pollId });

    req.poll = poll;
    
    next();
  } catch (e) {
    return res.status(404).send('Enquente não encontrada');
  }
}