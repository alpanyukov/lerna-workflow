import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

const baseConfig = {
  input: './index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelrc: false
      // presets: [['@babel/env']]
    }),
    replace({
      'process.env.NODE_ENV':
        process.env.NODE_ENV || JSON.stringify('development')
    }),
    resolve(),
    commonjs(),
    process.env.NODE_ENV === 'production' && terser()
  ]
};

export default [
  {
    ...baseConfig,
    output: {
      file: './dist/client.js',
      format: 'cjs',
      name: 'client',
      sourcemap: true
    }
  }
  // {
  //   ...baseConfig,
  //   output: {
  //     file: './dist/client.module.js',
  //     format: 'es',
  //     name: 'client',
  //     sourcemap: true
  //   }
  // },
  // {
  //   ...baseConfig,
  //   output: {
  //     file: './dist/client.umd.js',
  //     format: 'umd',
  //     name: 'client',
  //     sourcemap: true
  //   }
  // }
];
