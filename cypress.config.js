import { defineConfig } from 'cypress';

export default defineConfig({
  baseUrl: 'http://localhost:3000/',
  testFiles: '**/*.spec*',
  viewportWidth: 1920,
  viewportHeight: 1080,
  integrationFolder: 'src/',
  env: {},
});
