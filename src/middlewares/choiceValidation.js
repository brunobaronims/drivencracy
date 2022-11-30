import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';

import { choiceSchema } from '../schema/choiceSchema.js';
import { choiceCollection } from '../db/mongo.js';
import { pollCollection } from '../db/mongo.js';

export async function choiceValidation(req, res, next) {
  const data = req.body;

  try {
    await choiceSchema.validateAsync(data);
  } catch (e) {
    return res.status(422).send(e.message);
  }

  try {
    const poll = await pollCollection.findOne({ _id: new ObjectId(data.pollId) });

    if (dayjs(poll.expireAt).isBefore(dayjs()))
      return res.status(403).send('Enquete expirada');
  } catch (e) {
    return res.status(404).send('Enquete não existente');
  }

  const title = await choiceCollection.findOne({ title: data.title });
  if (title)
    return res.status(409).send('Nome da opção não pode ser repetido');

  next();
}
