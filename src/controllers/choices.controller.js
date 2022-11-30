import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';

import {
  voteCollection,
  choiceCollection
} from "../db/mongo.js";

export async function postChoice(req, res) {
  const choice = req.body;

  try {
    const choiceId = (await choiceCollection.insertOne({
      ...choice,
      pollId: new ObjectId(choice.pollId)
    })).insertedId;
    const newChoice = await choiceCollection.findOne({ _id: choiceId });

    return res.status(201).send(newChoice);
  } catch (e) {
    return res.sendStatus(500);
  }
}

export async function getChoices(req, res) {
  const pollId = req.params.id;

  try {
    const choices = await choiceCollection.find({ pollId: pollId }).toArray();

    return res.status(200).send(choices);
  } catch (e) {
    return res.status(404).send('Enquete não existente');
  }
}

export async function postVote(req, res) {
  const choiceId = req.choiceId;

  try {
    await voteCollection.insertOne({
      createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
      choiceId: choiceId
    })

    return res.sendStatus(201);
  } catch (e) {
    return res.sendStatus(500);
  }
};