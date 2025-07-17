'use strict';
import 'dotenv/config'
import Hapi from '@hapi/hapi'
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import authPlugin from './plugins/auth.plugin.js';
import skillRoutes from './routes/skill.route.js';

const init = async () => {
    //creating server
    const server = Hapi.server({
        port: process.env.PORT,
        host: 'localhost',
        routes: {
            cors: { credentials: true },
            state: {
                parse: true,
                failAction: 'error'
            }
        }
    });
    await server.register(authPlugin);

    server.route({
        method: 'GET',
        path: '/protected',
        options: {
            auth: 'jwt',
        },
        handler: (request, h) => {
            const user = request.auth.credentials;
            return { message: 'Protected route', user };
        }
    }
    )


    //adding routes
    await server.register([
        userRoutes,
        authRoutes,
        skillRoutes
    ]);

    //starting server
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();