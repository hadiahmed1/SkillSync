'use strict';
import 'dotenv/config'
import Hapi from '@hapi/hapi'
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

const init = async () => {
    //creating server
    const server = Hapi.server({
        port: process.env.PORT,
        host: 'localhost'
    });
    //adding routes
    await server.register([
        userRoutes,
        authRoutes
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