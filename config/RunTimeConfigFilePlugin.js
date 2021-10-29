const fs = require('fs-extra');
const path = require('path');

class RunTimeConfigFilePlugin {
  constructor(options) {
    this.options = options;
  }

  createRunTimeConfigFile() {
    const { envConfig, env, buildPath } = this.options;
    const config = envConfig[env.NODE_ENV];
    const directory = env.NODE_ENV === 'production' ? buildPath : './public';
    fs.writeFile(
      path.join(directory, 'runtime-config.js'),
      `window['RUNTIME_CONFIGS'] = ${JSON.stringify(config)};`
    );
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('RunTimeConfigFilePlugin', compilation => {
      this.createRunTimeConfigFile();
    });
  }
}

module.exports = { RunTimeConfigFilePlugin };
