const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/treasure-valley-skate/' : '/',
  outputDir: 'docs' // Ensure Vue builds into /docs for GitHub Pages
});
