import bcrypt from 'bcrypt';
import db from '../models/index.js';

export const getUserByEmail = async (email) => {
    const user = await db.User.findOne({ where: { email } });
    return user;
}

export const createUser = async (payload) => {
    const { name, email, password, role } = payload;

    if (await getUserByEmail(email)) {
        throw new Error('User with this email already exists');
    }

    // Create the user
    const newUser = await db.User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role: role || 'USER',
    });

    // Remove password from returned object
    const { password: _, ...userWithoutPassword } = newUser.get({ plain: true });

    return userWithoutPassword;
};
