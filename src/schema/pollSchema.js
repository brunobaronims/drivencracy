import joi from 'joi';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js'

dayjs.extend(customParseFormat);
const date = (value, helpers) => {
  if (!dayjs(value, 'YYYY-MM-DD HH:mm', true).isValid())
    return helpers.error('any.invalid');
  return value;
}

export const pollSchema = joi.object({
  title: joi.string()
    .required()
    .trim()
    .messages({
      'string.base': 'Título inválido',
      'any.required': 'Insira um título'
    }),
  expireAt: joi.string()
    .empty('', null)
    .custom(date, 'date validation')
    .messages({
      'any.invalid': 'Data inválida'
    })
})