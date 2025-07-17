import { createSkill, createUserSkill, findAllSkills } from "../services/skill.service.js";
import { handleAsync } from "../utils/asyncHandler.js";


export const addSkill = handleAsync(async (request, h) => {
  const skill = await createSkill(request.payload.name);

  return h.response({
    message: 'Skill created successfully',
    skill, addUserSkill
  }).code(201);
});

export const addUserSkill = handleAsync(async (request, h) => {
  const user = request.auth.credentials;
  const { skillId } = request.params;

  await createUserSkill(user.id, skillId);

  return h.response({
    message: 'Skill added successfully',
  }).code(201);
});

export const getSkills = handleAsync(async (request, h) => {
  const skills = await findAllSkills();

  return h.response({
    message: "Skills",
    skills
  }).code(200)
});