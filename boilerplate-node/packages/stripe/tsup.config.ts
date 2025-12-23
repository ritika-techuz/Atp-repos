import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
    entry: ['src/index.ts'],
    format: ['esm'],
    target: 'es2022',
    clean: process.env.NODE_ENV !== 'development',
    dts: true,
    sourcemap: process.env.NODE_ENV === 'development',
    splitting: true,
    bundle: true,
    skipNodeModulesBundle: true,
    minify: process.env.NODE_ENV !== 'development',
    outExtension: () => ({ js: '.mjs' }),
    ...options
}));
