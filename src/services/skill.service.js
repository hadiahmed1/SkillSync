import db from '../models/index.js';
import Boom from '@hapi/boom'
import { getUserByID } from './user.service.js';

export const getSkillByID = async (id) => {
    const skill = await db.Skill.findByPk(id);
    if (skill) return skill;
    throw Boom.notFound("Invalid skill ID")
}

export const createSkill = async (name) => {
    const existingSkill = await db.Skill.findOne({ where: { name: name.toLowerCase() } })
    if (existingSkill) throw Boom.conflict("Skill already exists");

    const skill = await db.Skill.create({ name });
    return skill;
}


export const createUserSkill = async (userId, skillId) => {
    const existingUserSkill = await db.UserSkill.findOne({ where: { userId, skillId } });
    if (existingUserSkill) throw Boom.conflict("User already has this skill");

    const user = await getUserByID(userId);
    const skill = await getSkillByID(skillId);
    user.addSkill(skill);
}

export const findAllSkills = async () => await db.Skill.findAll();

export const findUserSkills = async (id) => {
    const user = await db.User.findByPk(id, {
        include: {
            model: db.Skill,
            through: { attributes: [] },//excluding UserSkill
        }
    })

    return user.Skills;
}