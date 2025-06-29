const Hapi   = require('@hapi/hapi');
const Routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 2000,
        host: '0.0.0.0',
    });

    server.route(Routes);

    await server.start();
    
    console.log("server run");
}

init();