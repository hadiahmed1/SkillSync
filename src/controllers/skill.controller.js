import { createSkill, createUserSkill } from "../services/skill.service.js";

export const addSkill = async (request, h) => {
  try {
    const skill = await createSkill(request.payload.name);
    return h.response({
      message: 'Skill created successfully',
      skill, addUserSkill
    }).code(201);
  } catch (err) {
    if(err.isBoom) throw err;
    return h.response({
      statusCode: 400,
      error: 'Bad Request',
      message: err.message,
    }).code(400);
  }
};

export const addUserSkill = async (request, h) => {
  try {
    const user = request.auth.credentials;
    const {skillId} = request.params;

    await createUserSkill(user.id, skillId);

    return h.response({
      message: 'Skill added successfully',
    }).code(201);
  } catch (err) {
    if(err.isBoom) throw err;
    return h.response({
      statusCode: 400,
      error: 'Bad Request',
      message: err.message,
    }).code(400);
  }
};