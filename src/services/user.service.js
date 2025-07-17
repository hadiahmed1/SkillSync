import bcrypt from 'bcrypt';
import db from '../models/index.js';
import Boom from '@hapi/boom'

export const getUserByEmail = async (email) => {
    const user = await db.User.findOne({ where: { email } });
    return user;
}

export const getUserByID = async (id)=>{
    const user = await db.User.findByPk(id);
    if(user) return user;
    throw Boom.notFound("Invalid user ID")
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
