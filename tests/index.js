import { Betest } from "../lib/betest.js";

const betestParams = {
    results: {
        showAs: "Line"
    }
}

const betest = new Betest(betestParams);
betest.addGroup(
    { 
        name: "Example Group", 
        tests: [
            {// Expected object
                expected: {
                    fisrstName: "First Name",
                    secondName: "Second Name"
                },
                data: {
                    fisrstName: "First Name",
                    secondName: "Second Name"
                },
                test: function checkObject() {
                    return this.data;
                }
            },
            {// Exptected number
                expected: 7,
                data: {
                    cathetusA: 5 ** 2,
                    cathetusB: 5 ** 2
                },
                test: function findHypotenuse() {
                    return Math.round(Math.sqrt(this.data.cathetusA + this.data.cathetusB));
                }
            },
            {// Expected two dimensional array
                expected: [
                    [6, -8, 1],
                    [4, 1, 0],
                    [2, 3, 5]
                ],
                test: function checkArrayEquality() {
                    return [
                        [6, -8, 1],
                        [4, 1, 0],
                        [2, 3, 5]
                    ]
                }
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
betest.runGroup("Example Group");

/** Run one test */
console.log('\n\x1b[96m Run one test\x1b[0m');
betest.runTest("Example Group", "findHypotenuse");

/** Run test on the fly */
console.log('\n\x1b[96m Run test on the fly\x1b[0m');
betest.go(
    [ // groups
        { // one group
            name: "Arrays",
            tests: [
                {
                    expected: [
                        [6, -8, 1],
                        [4, 1, 0],
                        [2, 3, 5]
                    ],
                    test: function checkArrayEquality() {
                        return [
                            [6, -8, 1],
                            [4, 1, 0],
                            [2, 3, 5]
                        ]
                    }
                }
            ]
        }
    ]
);
