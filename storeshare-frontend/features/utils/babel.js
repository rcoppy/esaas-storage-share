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


// starting up the backend server
// const { exec } = require("child_process");
// exec("cd ../storeshare_api && rails s", (error, stdout, stderr) => {}); 
// setTimeout(() => {}, 3000);

// killing the backend server once tests are done
// const nodeCleanup = require('node-cleanup');
// const fs = require('fs'); 
// const path = require('path');

// nodeCleanup(function (exitCode, signal) {
//     try {
//         const pid = fs.readFileSync(path.resolve('../storeshare_api/tmp/pids/server.pid'));

//         console.log('killing pid ' + pid);
//         process.kill(pid,'SIGINT');
//     } catch (e) {
//         console.log('no backend running');
//     }
// });