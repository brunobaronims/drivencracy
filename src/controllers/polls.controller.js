import {
  pollCollection,
  choiceCollection,
  voteCollection
} from '../db/mongo.js';

export async function postPoll(req, res) {
  const poll = await req.body;

  if (req.newExpiration) {
    poll.expireAt = req.newExpiration;
  }

  try {
    const pollId = (await pollCollection.insertOne(poll)).insertedId;
    const newPoll = await pollCollection.findOne({ _id: pollId });

    return res.status(201).send(newPoll);
  } catch (e) {
    return res.sendStatus(500);
  }
}

export async function getPolls(req, res) {
  try {
    const polls = await pollCollection.find().toArray();

    return res.status(201).send(polls);
  } catch (e) {
    return res.sendStatus(500);
  }
}