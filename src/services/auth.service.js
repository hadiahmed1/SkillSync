import db from '../models/index.js';
import { generateJWT } from '../utils/jwt.js';
import { getUserByEmail } from './user.service.js';
import bcrypt from 'bcrypt';

export const loginUser = async ({ email, password }) => {
    const user = await getUserByEmail(email);
    if (!user) 
        throw new Error('Invalid email or password');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) 
        throw new Error('Invalid email or password');

    const token = generateJWT(user)

    const { password: _, ...userInfo } = user.get({ plain: true });
    return { token, user: userInfo };
};
