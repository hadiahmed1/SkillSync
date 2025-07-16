import { loginUser } from '../services/auth.service.js';

export const login = async (request, h) => {
  try {
    const { token, user } = await loginUser(request.payload);

    return h
      .response({ message: 'Login successful', user })
      .state('access_token', token, {
        isHttpOnly: true,
        isSecure: false,
        path: '/',
        ttl: 60 * 60 * 1000, 
      })
      .code(200);
  } catch (err) {
    return h.response({
      error: 'Unauthorized',
      message: err.message,
    }).code(401);
  }
};
