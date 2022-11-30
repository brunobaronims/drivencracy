import joi from 'joi';

export const choiceSchema = joi.object({
  title: joi.string()
  .required()
  .trim()
  .messages({
    'any.required': 'Insira um título',
    'string.base': 'Título inválido'
  }),
  pollId: joi.string()
  .required()
  .trim()
  .messages({
    'any.required': 'Necessário ID da enquete',
    'string.base': 'ID da enquete inválido'
  })
})