import { Betest } from "../lib/betest.js";

//#region Simple Test Functions

const testMultiplication = function() {
    const res = 5 * 2;

    if(res === 10) {
        return true;
    } else {
        return false;
    }
}

const testSum = function() {
    const res = 5 + 2;

    if(res === 7) {
        return true;
    } else {
        return false;
    }
}

//#endregion

const betest = new Betest();

betest.add(
    { 
        name: "Math group", tests: [testMultiplication, testSum] 
    }
);

/** Run all tests */
betest.runAll();

/** Run one group */
// betest.runGroup("Math group");

/** Run one test */
// betest.runTest("Math group", "testSum");

/** Run anonym tests */
// betest.go(
//     [ // groups
//         { // one group
//             name: "Geometry Tests",
//             tests: [
//                 function findSinusTest() {
//                     const sinusOf90D = Math.sin(90 * 180 / Math.PI);
    
//                     return sinusOf90D === 1;
//                 }
//             ]
//         }
//     ]
// );
