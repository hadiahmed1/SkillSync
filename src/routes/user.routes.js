import { registerUser } from '../controllers/user.controller.js';
import { registerSchema } from '../validations/user.validation.js';

export default {
    name: 'userRoutes',
    register: async function (server) {
        server.route([
            {
                method: 'POST',
                path: '/register',
                options: {
                    validate: {
                        payload: registerSchema,
                        failAction: (request, h, err) => {
                            throw err;
                        },
                    },
                },
                handler: registerUser,
            },
        ]);
    },
};
