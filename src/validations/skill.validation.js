import Joi from 'joi';

export const createSkillSchena = Joi.object({
  name: Joi.string().min(2).required(),
}).unknown(false);

export const skillIdParamSchema = Joi.object({
  skillId: Joi.string().uuid().required()
})