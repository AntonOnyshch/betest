import { Betest } from "../lib/betest.js";

const betestParams = {
    results: {
        showAs: "Line"
    }
}

const betest = new Betest(betestParams);

betest.addGroup(
    { 
        name: "Math group", 
        tests: [
            function multiplication() {
                const res = 5 * 2;
            
                if(res === 10) {
                    return true;
                } else {
                    return false;
                }
            },
            function sum() {
                const res = 5 + 2;
            
                if(res === 7) {
                    return true;
                } else {
                    return false;
                }
            }
        ]
    }
);
betest.addGroup(
    { 
        name: "Geometry group", 
        tests: [
            function findHypotenuse() {
                const sinusOf90D = Math.round(Math.sqrt(5 ** 2 + 5 ** 2));
            
                return sinusOf90D === 6; // answer is 7
            }
        ]
    }
);
console.log('\n\x1b[34m===============\nTEST STARTING...\n===============\n \x1b[0m \n');

/** Run all tests */
console.log('\x1b[96m Run all tests\x1b[0m');
betest.runAll();

/** Run one group */
console.log('\n\x1b[96m Run one group\x1b[0m');
betest.runGroup("Math group");

/** Run one test */
console.log('\n\x1b[96m Run one test\x1b[0m');
betest.runTest("Math group", "sum");

/** Run test on the fly */
console.log('\n\x1b[96m Run test on the fly\x1b[0m');
betest.go(
    [ // groups
        { // one group
            name: "Geometry Tests",
            tests: [
                function findSinus() {
                    const sinusOf90D = Math.sin(90 * Math.PI / 180 );
    
                    return sinusOf90D === 1;
                }
            ]
        }
    ]
);