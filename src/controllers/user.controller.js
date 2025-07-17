import { createUser } from '../services/user.service.js';

export const registerUser = async (request, h) => {
  try {
    const user = await createUser(request.payload);
    return h.response({
      message: 'User created successfully',
      user,
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
