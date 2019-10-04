import babel from 'rollup-plugin-babel';
import {terser} from "rollup-plugin-terser";
import * as meta from "./package.json";

const copyright = `// ${meta.homepage}\nv${meta.version} License ${meta.license} ${(new Date).getFullYear()} ${meta.author.name}`;

const babelOptions = Object.assign({
  exclude: /node_modules/,
  babelrc: false
}, require('./.babel.config.js'));

console.log(babelOptions);

export default [
  {
    input: './src/MiniVisual.js',
    output: {
      file: './dist/mini-visual.js',
      format: 'umd',
      banner: copyright,
      name: 'MiniVisual',
    },
    plugins: [
      babel(babelOptions)
    ]
  },
  {
    input: './src/MiniVisual.js',
    output: {
      file: './dist/mini-visual.min.js',
      format: 'umd',
      name: 'MiniVisual',
      indent: false
    },
    plugins: [
      babel(babelOptions),
      terser({output: {preamble: copyright}})
    ]
  },
];
