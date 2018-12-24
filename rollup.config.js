//import alias from 'rollup-plugin-alias';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import virtual from 'rollup-plugin-virtual-alias';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import {
    terser
} from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;
const environment = production ? 'production' : 'development';

var path = require('path');

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        postcss({
            minimize: true,
            extract: true
        }),
        virtual({
            'react': 'preact-compat',
            'react-dom': 'preact-compat',
        }),
        resolve({
            browser: true,
            extensions: ['.mjs', '.js', '.jsx', '.json']
        }), // tells Rollup how to find date-fns in node_modules
        replace({
            'process.env.NODE_ENV': JSON.stringify(environment)
        }),
        buble(),
        commonjs(), // converts date-fns to ES modules
        production && terser() // minify, but only in production
    ]
}
