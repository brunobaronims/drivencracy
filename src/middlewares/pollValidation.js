import dayjs from 'dayjs';

import { pollSchema } from "../schema/pollSchema.js";

export async function pollValidation(req, res, next) {
  const data = req.body;
  dayjs.locale('pt-br');

  try {
    await pollSchema.validateAsync(data);

    if (!data.expireAt)
      req.newExpiration = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm')
  } catch (e) {
    return res.status(422).send(e.message);
  }

  next();
}