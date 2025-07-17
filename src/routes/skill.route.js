import { addSkill, addUserSkill, deleteUserSkill, getMySkills, getSkills } from "../controllers/skill.controller.js";

export default {
    name: 'skillRoutes',
    register: async function (server) {
        server.route([
            {//POST New Skills
                method: 'POST',
                path: '/skill',
                options: {
                    validate: {
                        // payload: registerSchema,
                        failAction: (request, h, err) => {
                            throw err;
                        },
                    },
                },
                handler: addSkill,
            },
            {//GET All Skills
                method: 'GET',
                path: '/skill',
                handler: getSkills,
            },
            {// GET My Skills
                method: 'GET',
                path: '/skill/myskills',
                options:{
                    auth:'jwt'
                },
                handler: getMySkills,
            },
            {// POST User Skill
                method: 'POST',
                path: '/skill/{skillId}',
                options: {
                    auth: 'jwt',
                    validate: {
                        // payload: registerSchema,
                        failAction: (request, h, err) => {
                            throw err;
                        },
                    },
                },
                handler: addUserSkill,
            },
            {// POST User Skill
                method: 'DELETE',
                path: '/skill/{skillId}',
                options: {
                    auth: 'jwt',
                    validate: {
                        // payload: registerSchema,
                        failAction: (request, h, err) => {
                            throw err;
                        },
                    },
                },
                handler: deleteUserSkill,
            },
        ]);
    },
};
