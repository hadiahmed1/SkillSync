import jwt from 'jsonwebtoken';
import Boom from '@hapi/boom'

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h';

export const generateJWT = (user) => {
    const payload = { id: user.id, email: user.email, role: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return token;
}

export const decodeToken = (token) => {
    if (!token) throw Boom.unauthorized('Missing access token');
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        throw Boom.unauthorized('Invalid or expired token');
    }
}