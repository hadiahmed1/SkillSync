import { login } from '../controllers/auth.controller.js';
import { loginSchema } from '../validations/auth.validation.js';

export default {
  name: 'authRoutes',
  register: async function (server) {
    server.route([
      {
        method: 'POST',
        path: '/login',
        options: {
          validate: {
            payload: loginSchema,
            failAction: (r, h, err) => { throw err; }
          },
        },
        handler: login,
      },
    ]);
  }
};
