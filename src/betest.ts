import { BetestGroup } from "./b-group.js";
import { BetestTestResult } from "./b-test-tesult.js";
import { ResultEmiter } from './results/result-emiter.js';
import { TableResultEmiter } from "./results/table-emiter.js";
import { LineResultEmiter } from "./results/line-emiter.js";
import { BetestTest } from './b-test.js';

export function start(params: BetestConstructorParams): Betest {
    return new Betest(params);
}

type BetestConstructorParams = {
    results: {
        showAs: string
    }
}

/**
 * Contain list of named groups with tests
 */
export class Betest {

    private testGroups: BetestGroup[];

    private resultEmiter: ResultEmiter;

    /**
     * Create ne Betest instance
     * @param {BetestConstructorParams} params Parameters for constructor {@link https://www.npmjs.com/package/betest#constructor-params}
     */
    constructor(params: BetestConstructorParams) {
        this.testGroups = new Array<BetestGroup>();
        this.resultEmiter = new TableResultEmiter();

        if(params) {
            if(params.results) {
                if(params.results.showAs) {
                    switch (params.results.showAs) {
                        case "Table": {
                            this.resultEmiter = new TableResultEmiter();
                        } break;
                        case "Line": {
                            this.resultEmiter = new LineResultEmiter();
                        } break;
                        default: {
                            this.resultEmiter = new TableResultEmiter();
                        } break;
                    }
                }
            }
        }
    }

    /**
     * Use this method to add your test to group.
     * @param {string} groupName - A name of group which will contain your test.
     * Note: your group should exist
     * @param {Function} testFunc - This is your function
     */
    public addTest(groupName: string, test: BetestTest): void {
        const found_group = this.findGroup(groupName);
        found_group.tests.push(test);
    }

    /**
     * Add new group
     * @param {BetestGroup | {name: "name", tests: []}} group A group you want to add
     * @throws An error if group you are trying to add is already exist
     */
    public addGroup(group: BetestGroup | {name: "name", tests: []}): void {
        const found_group = this.checkIfGroupExists(group.name);
        if(found_group === undefined) {
            this.testGroups.push(group);
        } else {
            throw new Error("You are trying to add group that already exist");
        }
    }

    /**
     * Run all tests within one group
     * @param {string} groupName name of your group
     * @throws An error if group will not be found
     */
    public runGroup(groupName: string): void {
        const group = this.findGroup(groupName);
        this.runGroupTests(group);
    }

    /**
     * Run all tests in all groups
     */
    public runAll(): void {
        this.testGroups.forEach(v => this.runGroupTests(v));
    }

    /**
     * Run only one test in group
     * @param {string} groupName Name of the group
     * @param {string} testName Name of the test
     */
    public runTest(groupName: string, testName: string): void {
        const group = this.findGroup(groupName);
        const bTest = this.findTest(group, testName);
        
        console.group(`\n\x1b[100m${group.name}\x1b[0m\n`);

        const result_table = new Array<BetestTestResult>();

        result_table.push({name: bTest.name, result: this.checkExpected(bTest.expected, bTest.test())});

        this.resultEmiter.emit(result_table);

        console.groupEnd();
    }

    /**
     * Run anonyms tests. 
     * @param {BetestGroup | {name: "name", tests: []}} groups Object which contains param name of the group
     * and param tests with array of functions
     */
    public go(groups: BetestGroup[]): void {
        groups.forEach((group) => this.runGroupTests(group));
    }

    /**
     * Run all tests inside one group
     * @param {BetestGroup | {name: "name", tests: []}} group A group with tests
     */
    private runGroupTests(group: BetestGroup | {name: "name", tests: []}): void {
        console.group(`\n\x1b[100m${group.name}\x1b[0m\n`);

        const result_table = new Array<BetestTestResult>();
        group.tests.forEach((bTest: BetestTest) => {result_table.push({name: bTest.name, result: this.checkExpected(bTest.expected, bTest.test())})});

        this.resultEmiter.emit(result_table);

        console.groupEnd();
    }

    /**
     * 
     * @param {string} name Name of the group
     * @returns If exist return group otherwise undefined
     */
    private checkIfGroupExists(name: string): BetestGroup | undefined {
        for (const group of this.testGroups) {
            if(group.name === name) {
                return group;
            }
        }

        return undefined;
    }

    /**
     * 
     * @param {string} name Name of the group
     * @returns Found group
     * @throws An error if group doesn't exist
     */
    private findGroup(name: string): BetestGroup {
        const found_group = this.checkIfGroupExists(name);

        if(found_group === undefined) {
            throw new Error(`Group "${name}" is not found`);
        }
        
        return found_group;
    }

    /**
     * 
     * @param {BetestGroup | {name: "name", tests: []}} group A group in which tests will be seeking
     * @param {string} testName A name of the test you want to find
     * @throws An error if test doesn't exist
     * @returns Function
     */
    private findTest(group: BetestGroup, testName: string): BetestTest {
        for (const bTest of group.tests) {
            if(bTest.name === testName) {
                return bTest;
            }
        }

        throw new Error(`Test "${testName}" is not found`);
    }

    /**
     * Compare expected and actual values
     * @param {number | Array<any> | Object} expected The true result of your test
     * @param {any} result Actual result
     * @returns True if result and expected values are the same
     */
    private checkExpected(expected: any, result: any): Boolean {
        if (expected instanceof Array) {
            const expect = expected as Array<any>;
            const res = result as Array<any>;
            if(expect.length !== res.length) {
                return false;
            }
            for (let i = 0; i < expect.length; i++) {
               if(expect[i] instanceof Array) {
                   for (let j = 0; j < expect[i].length; j++) {
                       if(expect[i][j] !== result[i][j]) {
                           return false;
                       }
                   }
               } else {
                   if(expect[i] !== result[i]) {
                       return false;
                   }
               }
            }

            return true;
             
        } else if(expected instanceof Object) {
            return JSON.stringify(expected) === JSON.stringify(result);
        } else {
            return expected === result;
        }
    }

}