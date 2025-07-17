import { createSkill, createUserSkill, findAllSkills, findUserSkills, removeUserSkill } from "../services/skill.service.js";
import { handleAsync } from "../utils/asyncHandler.js";


export const addSkill = handleAsync(async (request, h) => {
  const skill = await createSkill(request.payload.name);

  return h.response({
    message: 'Skill created successfully',
    skill
  }).code(201);
});

export const getSkills = handleAsync(async (request, h) => {
  const skills = await findAllSkills();

  return h.response({
    message: "Skills",
    skills
  }).code(200);
});

export const getMySkills = handleAsync(async(request, h)=>{
  const skills = await findUserSkills(request.auth.credentials.id);
  return h.response({
    message:"Skills",
    skills
  }).code(200);
});


export const addUserSkill = handleAsync(async (request, h) => {
  const user = request.auth.credentials;
  const { skillId } = request.params;

  await createUserSkill(user.id, skillId);

  return h.response({
    message: 'Skill added successfully',
  }).code(201);
});


export const deleteUserSkill = handleAsync(async (request, h)=>{
  const user = request.auth.credentials;
  const { skillId } = request.params;

  await removeUserSkill(user.id, skillId);

  return h.response({
    message:"Skill Removed Successfully"
  })
})