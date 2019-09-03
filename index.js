const stream = require('highland');
const fp = require('lodash');
const nlp = require('natural');
const numbers = require('numbers');
const math = require('mathjs');
const cache = require('mem');
const modeling = require('brain.js');
const workers = require('worker-farm');
const fs = require('fs-extra');
const JSONStream = require('JSONStream');
const csv = require('csv');
const report = require('jsreport');
const { CanvasRenderService } = require('chartjs-node-canvas');
const storage = require('./src/cacache');
const readToJSON = require('quaff');
const date = require('moment');
const request = require('request');

const path = require('path');
const pkgDir = require('pkg-dir');

const colorschemes = require('chartjs-plugin-colorschemes');

// Hack to avoid errors with Chart.js
if (global.CanvasGradient === undefined) {
  global.CanvasGradient = function () {};
}


const Toolbox = {
  fp,
  stream,
  nlp,
  numbers,
  math,
  cache,
  modeling,
  workers,
  fs,
  JSONStream,
  csv,
  report,
  storage,
  readToJSON,
  date,
  request,
  chart: (width, height, callback) => new CanvasRenderService(width, height, (ChartJS) => {
    // Default setup
    ChartJS.plugins.register(colorschemes);
    ChartJS.defaults.global.plugins.colorschemes = {
      scheme: 'tableau.ColorBlind10',
      override: false,
      reverse: false,
      fillAlpha: 0.5,
    };

    // Custom setup
    if (callback) {
      callback(ChartJS);
    }
  }),
  renderReport: async (template, recipe, data) => {
    const rootDir = await pkgDir();

    return Toolbox.report.render({
      template: {
        content: await Toolbox.fs.readFile(path.resolve(rootDir, template), { encoding: 'utf-8' }),
        engine: 'handlebars',
        recipe,
      },
      data,
    });
  },
};
module.exports = Toolbox;
