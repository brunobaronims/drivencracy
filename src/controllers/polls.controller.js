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

export async function getPollResult(req, res) {
  const poll = req.poll;

  try {
    const choices = await choiceCollection.find({ pollId: poll._id }).toArray();

    const summary = await Promise.all(choices.map(async (choice) => {
      const buffer = {
        _id: poll._id,
        title: poll.title,
        expireAt: poll.expireAt,
        result: {
          title: choice.title,
          votes: (await voteCollection.find({ choiceId: choice._id }).toArray()).length
        } 
      };
      
      return buffer;
    }));

    const mostVotes = Math.max(...summary.map(s => s.result.votes));
    const winner = summary.filter(s => s.result.votes === mostVotes);

    if (winner.length === 1)
      return res.status(200).send(winner[0]);
    return res.status(200).send(winner);
  } catch (e) {
    return res.sendStatus(500);
  }
}