import * as fs from 'fs';
import { renderModuleFactory } from '@angular/platform-server';
const jsdom = require('jsdom');

const templateCache = {}; // cache for page templates
const outputCache = {};   // cache for rendered pages
export function ngUniversalEngine(setupOptions: any) {
  return function (filePath: string, options: { req: Request }, callback: (err: Error, html: string) => void) {
    console.log(filePath);
    let url: string = options.req.url;
    let html: string = outputCache[url];
    if (html) {
      // return already-built page for this url
      console.log('from cache: ' + url);
      callback(null, html);
      return;
    }
    console.log('building: ' + url);
    if (!templateCache[filePath]) {
      let file = fs.readFileSync(filePath);
      templateCache[filePath] = file.toString();
    }

    const { JSDOM } = jsdom;
    const dom = new JSDOM(templateCache[filePath], { runScripts: 'dangerously' });
    (<any>global).window = dom.window;
    (<any>global).document = dom.window.document;

    // render the page via angular platform-server
    let appModuleFactory = setupOptions.bootstrap[0];
    renderModuleFactory(appModuleFactory, {
      document: templateCache[filePath],
      url: url
    }).then(str => {
      str = str.replace('/*preboot_code*/', setupOptions.preboot_code);
      outputCache[url] = str;
      callback(null, str);
    });
  };
}
