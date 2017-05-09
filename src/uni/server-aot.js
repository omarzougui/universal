import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { AppServerModuleNgFactory } from '../../aot/src/uni/app.server.ngfactory';
import * as express from 'express';
var compression = require('compression');
import { ngUniversalEngine } from './universal-engine';
import { routes } from '../app/app-routing.module';
var preboot = require('preboot');
var prebootOptions = {
    appRoot: 'app-root',
    uglify: false
}; // see options section below
var inlinePrebootCode = preboot.getInlineCode(prebootOptions);
enableProdMode();
var server = express();
server.use(compression({ filter: function (req, res) {
        if (req.headers['x-no-compression']) {
            // don't compress responses with this request header
            return false;
        }
        // fallback to standard filter function
        return compression.filter(req, res);
    } }));
// set our angular engine as the handler for html files, so it will be used to render them.
server.engine('html', ngUniversalEngine({
    bootstrap: [AppServerModuleNgFactory],
    preboot_code: inlinePrebootCode
}));
// set default view directory
server.set('views', 'src');
// handle requests for routes in the app.  ngExpressEngine does the rendering.
server.get(['/robots.txt'], function (req, res) {
    res.sendFile('robots.txt', { root: 'src' });
});
server.get(['/manifest.webapp'], function (req, res) {
    res.sendFile('manifest.webapp', { root: 'src' });
});
server.get(['/assets/myapp.js'], function (req, res) {
    res.sendFile('/assets/myapp.js', { root: 'src' });
});
var page_list = ['/'];
routes.forEach(function (page) {
    page_list.push('/' + page.path);
});
server.get(page_list, function (req, res) {
    req.preboot = { appRoot: 'app-root' };
    res.render('index.html', { req: req });
});
// handle requests for static files
server.get(['/*.js'], function (req, res, next) {
    var fileName = req.originalUrl;
    console.log(fileName);
    var is_node_module = fileName.startsWith('/node_modules/');
    var root = is_node_module ? '.' : 'src';
    res.sendFile(fileName, { root: root }, function (err) {
        if (err) {
            next(err);
        }
    });
});
// handle requests for static files
server.get(['/*.css'], function (req, res, next) {
    var fileName = req.originalUrl;
    console.log(fileName);
    var root = fileName.startsWith('/node_modules/') ? '.' : 'src';
    res.sendFile(fileName, { root: root }, function (err) {
        if (err) {
            next(err);
        }
    });
});
// start the server
server.listen(3200, function () {
    console.log('listening on port 3200...');
});
//# sourceMappingURL=server-aot.js.map