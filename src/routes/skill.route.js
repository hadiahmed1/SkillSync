import { addSkill, addUserSkill, getMySkills, getSkills } from "../controllers/skill.controller.js";

export default {
    name: 'skillRoutes',
    register: async function (server) {
        server.route([
            {
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
            {
                method: 'GET',
                path: '/skill',
                handler: getSkills,
            },
            {
                method: 'GET',
                path: '/skill/myskills',
                options:{
                    auth:'jwt'
                },
                handler: getMySkills,
            },
            {
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
        ]);
    },
};
