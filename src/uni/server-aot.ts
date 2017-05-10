import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { AppServerModuleNgFactory } from '../../aot/src/uni/app.server.ngfactory';
import * as express from 'express';
const compression = require('compression');
import { ngUniversalEngine } from './universal-engine';
import {routes} from  '../app/app-routing.module';

let jsdom = require('jsdom').jsdom;

(<any>global).document = jsdom('');
(<any>global).window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

(<any>global).navigator = {
  userAgent: 'node.js'
};

let preboot = require('preboot');
let prebootOptions = {
  appRoot: 'app-root',
  uglify: false
};  // see options section below
let inlinePrebootCode = preboot.getInlineCode(prebootOptions);

enableProdMode();
const server = express();

server.use(compression({filter: (req:any, res:any) => {
  // if (req.headers['x-no-compression']) {
  //   // don't compress responses with this request header
  //   return false
  // }

  // fallback to standard filter function
  return compression.filter(req, res)
}}));

// set our angular engine as the handler for html files, so it will be used to render them.
server.engine('html', ngUniversalEngine({
  bootstrap: [AppServerModuleNgFactory],
  preboot_code: inlinePrebootCode
}));
// set default view directory
server.set('views', 'src');
// handle requests for routes in the app.  ngExpressEngine does the rendering.


server.get(['/robots.txt'], (req, res) => {
  res.sendFile('robots.txt', { root: 'src' });
});
server.get(['/manifest.webapp'], (req, res) => {
  res.sendFile('manifest.webapp', { root: 'src' });
});
server.get(['/assets/myapp.js'], (req, res) => {
  res.sendFile('/assets/myapp.js', { root: 'src' });
});

let page_list:any=['/'];
routes.forEach(page=>{
  page_list.push('/'+page.path);
});
server.get(page_list, (req:any, res) => {
  (<any>req).preboot = {appRoot: 'app-root'};
  res.render('index-aot.html', {req});
});
// handle requests for static files
server.get(['/*.js'], (req, res, next) => {
  let fileName: string = req.originalUrl;
  console.log(fileName);
  let is_node_module = fileName.startsWith('/node_modules/');
  let root = is_node_module ? '.' : 'src';
  res.sendFile(fileName, { root: root }, function (err) {
    if (err) {
      next(err);
    }
  });
});
// handle requests for static files
server.get(['/*.css'], (req, res, next) => {
  let fileName: string = req.originalUrl;
  console.log(fileName);
  let root = fileName.startsWith('/node_modules/') ? '.' : 'src';
  res.sendFile(fileName, { root: root }, function (err) {
    if (err) {
      next(err);
    }
  });
});
// start the server
server.listen(3200, () => {
  console.log('listening on port 3200...');
});
