import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { AppServerModuleNgFactory } from '../../aot/src/uni/app.server.ngfactory';
import * as express from 'express';
import { ngUniversalEngine } from './universal-engine';
enableProdMode();
var server = express();
// set our angular engine as the handler for html files, so it will be used to render them.
server.engine('html', ngUniversalEngine({
    bootstrap: [AppServerModuleNgFactory]
}));
// set default view directory
server.set('views', 'src');
// handle requests for routes in the app.  ngExpressEngine does the rendering.
server.get(['/'], function (req, res) {
    res.render('index-aot.html', { req: req });
});
// handle requests for static files
server.get(['/*.js', '/*.css'], function (req, res, next) {
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