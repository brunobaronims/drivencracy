import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';

import {
  pollCollection,
  choiceCollection
} from "../db/mongo.js";

export async function voteValidation(req, res, next) {
  const choiceId = new ObjectId(req.params.id);

  try {
    const choice = await choiceCollection.findOne({ _id: choiceId });
    const poll = await pollCollection.findOne({ _id: choice.pollId });

    const pollExpired = dayjs(poll.expireAt).isBefore(dayjs());
    if (pollExpired) 
      return res.status(403).send('Enquete expirada');
    
    req.choiceId = choiceId;

    next();
  } catch (e) {
    return res.status(404).send('Opção não existente');
  }
}