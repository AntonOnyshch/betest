import { Betest } from "../lib/betest.js";
import * as mathTest from './mathTest.js';
import * as geometryTest from './geometryTest.js';


const betest = new Betest();

betest.addGroup(
    { 
        name: "Math group", 
        tests: mathTest.tests
    }
);
betest.addGroup(
    { 
        name: "Geometry group", 
        tests: geometryTest.tests
    }
);
console.log('\n\x1b[34m===============\nTEST STARTING...\n===============\n \x1b[0m \n');

/** Run all tests */
console.log('\x1b[96m Run all tests\x1b[0m\n');
betest.runAll();

/** Run one group */
console.log('\n\x1b[96m Run one group\x1b[0m\n');
betest.runGroup("Math group");

/** Run one test */
console.log('\n\x1b[96m Run one test\x1b[0m\n');
betest.runTest("Math group", "testSum");

/** Run test on the fly */
console.log('\n\x1b[96m Run test on the fly\x1b[0m\n');
betest.go(
    [ // groups
        { // one group
            name: "Geometry Tests",
            tests: [
                function findSinusTest() {
                    const sinusOf90D = Math.sin(90 * Math.PI / 180 );
    
                    return sinusOf90D === 1;
                }
            ]
        }
    ]
);
