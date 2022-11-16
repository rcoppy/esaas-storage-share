// features/utils/babel.ts
/* eslint @typescript-eslint/no-var-requires: 0 */
// const BABEL_CONFIG = require('../../babel.config.js');
require('@babel/register')({
    presets: [
        ["@babel/preset-env",
        {
            "useBuiltIns": "usage",
            "corejs": "3.22"
        }],
        ["@babel/preset-react",
        {
            "pragma": "React.createElement", // default pragma is React.createElement (only in classic runtime)
            "pragmaFrag": "React.Fragment", // default is React.Fragment (only in classic runtime)
            "throwIfNamespace": true, // defaults to true
            "runtime": "classic" // defaults to classic
            // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
        }],
    ],
    plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-transform-modules-commonjs",
    ]

});

// so there's a whole lot of weird cjs vs esm module cross-transpilation
// black magic going on; basically: 

// this file maybe? needs to be imported
require('../worlds/index.js');

// this file *needs* to be required
require('../support/steps.mjs');

// cucumber won't run otherwise.
