const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage';
        },
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        },
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About page';
        },
    },
    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method';
        },
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return 'Halaman tidak ditemukan';
        },
    },
    {
        method: 'GET',
        path  : '/cinta/{name}',
        handler: (request,h) => {
            const description = `hilmi sayang ${request.params.name}`
            return description
        }
    },
    {
        method: 'GET',
        path  : '/cinta',
        handler: (request,h) => {
            const description = `hilmi sayang ${request.query.name}`
            return h.response('test').code(404);
        }
    }

];
 
module.exports = routes;