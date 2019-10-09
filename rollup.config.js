import * as meta from './package.json';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const copyright = `//${meta.homepage}\n//v${meta.version} License ${
  meta.license
} ${new Date().getFullYear()} ${meta.author}`;

export default [
  {
    input: './src/MiniVisual.ts',
    output: {
      file: './dist/mini-visual.js',
      format: 'umd',
      banner: copyright,
      name: 'MiniVisual',
      //globals: ['d3'],
    },
    external: ['d3'],
    plugins: [typescript()],
  },
  {
    input: './src/MiniVisual.ts',
    output: {
      file: './dist/mini-visual.min.js',
      format: 'umd',
      name: 'MiniVisual',
      indent: false,
    },
    external: ['d3'],
    plugins: [typescript(), terser({ output: { preamble: copyright } })],
  },
];
