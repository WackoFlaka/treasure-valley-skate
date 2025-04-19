const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/', // ✅ Ensure paths work on SiteGround
  outputDir: 'docs' // ✅ Vue will build into /docs (move to public_html)
});
