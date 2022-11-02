// based on: https://charles-stover.medium.com/behavior-driven-react-development-with-cucumber-faf596d9d71b

import dotenv from 'dotenv';
import os from 'os';

dotenv.config();

const CPU_COUNT = os.cpus().length;
const IS_DEV = process.env.NODE_ENV === 'development'; const FAIL_FAST = IS_DEV ? ['--fail-fast'] : [];
const FORMAT = process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar'; 

// console.log(require('path').basename(__dirname));

export default [
        './features/*.feature',
        ...FAIL_FAST,
        `--format ${FORMAT}`,
        `--parallel ${CPU_COUNT}`,
        '--require-module jsdom-global/register',
        
        // order matters
        '--require ./features/utils/loaders.js',
        '--require ./features/utils/babel.js',

        // '--require-module ts-node/register',    // Dependencies
        
        // '--require ./features/utils/references.ts',    // Test
        //'--import ./features/worlds/index.mjs',
        //'--import ./features/support/steps.mjs',
    ].join(' ');