import jwt from 'jsonwebtoken';
import Boom from '@hapi/boom'
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async function (request, h) {
    const token = request.state.access_token;

    if (!token) {
        throw Boom.unauthorized('Missing access token');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return h.authenticated({ credentials: decoded });
    } catch (err) {
        throw Boom.unauthorized('Invalid or expired token');
    }
}

export default {
    name: 'authPlugin',
    version: '1.0.0',

    register: async function (server) {
        server.auth.scheme('cookie-jwt', () => { return { authenticate } });
        server.auth.strategy('jwt', 'cookie-jwt');
    }
};
