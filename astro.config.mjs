// @ts-check
import { defineConfig } from 'astro/config';
import adapter from '@deno/astro-adapter';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: adapter(),
});
