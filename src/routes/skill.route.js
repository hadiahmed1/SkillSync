import { addSkill, addUserSkill } from "../controllers/skill.controller.js";

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
