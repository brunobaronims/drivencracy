import { pollSchema } from "../schema/pollSchema.js";
import dayjs from 'dayjs';

export async function pollValidation(req, res, next) {
  const data = req.body;

  try {
    await pollSchema.validateAsync(data);

    if (!data.expireAt)
      req.newExpiration = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm')
  } catch (e) {
    return res.status(422).send(e.message);
  }

  next();
}