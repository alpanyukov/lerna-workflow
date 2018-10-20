import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM'
};

const baseConfig = {
  input: './index.js',
  external: ['react', 'react-dom'],
  plugins: [
    babel({
      exclude: 'node_modules/**'
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
      file: './dist/components.js',
      format: 'umd',
      name: 'components',
      sourcemap: true,
      globals
    }
  },
  {
    ...baseConfig,
    output: {
      file: './dist/components.module.js',
      format: 'es',
      name: 'components',
      sourcemap: true,
      globals
    }
  }
];
