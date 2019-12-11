const sass = require('sass');
const fs = require('fs');
const path = require('path');

// used as `injectGlobalPath` in stencil.config.ts
const globalPath = path.resolve(__dirname, 'src/global/style/');
const enginePath = path.resolve(globalPath, 'engine.scss');

const globImporter = require('node-sass-glob-importer');

module.exports = {
  globalPath,
  enginePath,
  globImporter
}

/**
 * Used in order to figure out framework-related problems.
 * Stencil omits the inner sources prepended of the file/component.
 * @param {string} filePath
 */
function testFor(filePath, displayName) {
  sass.render({
    file: filePath,

    // just like in stencil.config.ts
    importer: globImporter(),

    includePaths: [
      enginePath,
      globalPath,
    ]
  }, function (err, result) {
    if (err) {
      console.error(err.formatted);
      console.log('STOP ' + displayName)
      console.log((new Array(15)).fill('=').join('='))
      console.log()
    } else {
      console.log(displayName + " OK!");
    }
  });
}

testFor('./src/global/style/engine.scss', 'Engine');
testFor('./src/global/style/setup.scss', 'Index');
testFor('./src/global/app.scss', 'App');
testFor('./src/components/app-root/app-root.scss', 'AppRoot Component');
