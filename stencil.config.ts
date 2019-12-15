import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import copy from 'rollup-plugin-copy';
import nodePolyfills from 'rollup-plugin-node-polyfills';

import * as sassConfig from './testsass';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.scss',
  globalScript: 'src/global/app.ts',
  outputTargets: [
    {
      type: 'www'
    }
  ],
  plugins: [
    copy({
      targets: [
        {
          src: 'src/index_backend.html',
          dest: 'www/admin/',
          rename: 'index.html'
        },
        {
          src: 'src/backend_config.yml',
          dest: 'www/admin/',
          rename: 'config.yml'
        },
        {
          src: 'content/*',
          dest: 'www/',
        },
      ]
    }),
    sass({
      importer: sassConfig.globImporter(),

      includePaths: [
        sassConfig.globalPath,
      ],
      injectGlobalPaths: [
        sassConfig.enginePath
      ]
    }),
    nodePolyfills(),
  ]
};
