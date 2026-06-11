const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');

const manifest = {
    id: 'org.myexampleaddon',
    version: '1.0.0',
    name: 'Simple Example Addon',
    description: 'A basic addon for testing',
    resources: ['stream'],
    types: ['movie'],
    idPrefixes: ['tt'],
    catalogs: [] // This is mandatory for Stremio
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(function(args) {
    if (args.type === 'movie' && args.id === 'tt1254207') {
        const stream = {
            url: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4'
        };
        return Promise.resolve({ streams: [stream] });
    } else {
        return Promise.resolve({ streams: [] });
    }
});

const port = process.env.PORT || 8080;
serveHTTP(builder.getInterface(), { port: port });
