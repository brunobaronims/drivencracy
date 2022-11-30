import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';

import { choiceSchema } from '../schema/choiceSchema.js';
import { choiceCollection } from '../db/mongo.js';
import { pollCollection } from '../db/mongo.js';

export async function choiceValidation(req, res, next) {
  const data = req.body;
  dayjs.locale('pt-br');

  try {
    await choiceSchema.validateAsync(data);
  } catch (e) {
    return res.status(422).send(e.message);
  }

  try {
    const poll = await pollCollection.findOne({ _id: new ObjectId(data.pollId) });
    
    const pollExpired = dayjs(poll.expireAt).isBefore(dayjs());
    if (pollExpired)
      return res.status(403).send('Enquete expirada');
  } catch (e) {
    return res.status(404).send('Enquete não existente');
  }

  const titleExists = await choiceCollection.findOne({ 
    title: data.title,
    pollId: new ObjectId(data.pollId)
  });
  if (titleExists)
    return res.status(409).send('Nome da opção não pode ser repetido');

  next();
}
