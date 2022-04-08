import { BetestGroup } from "./b-group.js";
import { ResultEmiters } from "./results/results-emiters.js";
/**
 * Contain list of named groups with tests
 */
export declare class Betest {
    private testGroups;
    private resultEmiter;
    /**
     * Create ne Betest instance
     * @param emitResults Choose how results will be shown in console.
     * Default value is 0 which means "Table". @type {ResultEmiters}
     */
    constructor(emitResults: ResultEmiters);
    /**
     * Use this method to add your test to group.
     * @param {string} groupName - A name of group which will contain your test.
     * Note: your group should exist
     * @param {Function} testFunc - This is your function
     */
    addTest(groupName: string, testFunc: Function): void;
    /**
     * Add new group
     * @param {BetestGroup | {name: "name", tests: []}} group A group you want to add
     * @throws An error if group you are trying to add is already exist
     */
    addGroup(group: BetestGroup | {
        name: "name";
        tests: [];
    }): void;
    /**
     * Run all tests within one group
     * @param {string} groupName name of your group
     * @throws An error if group will not be found
     */
    runGroup(groupName: string): void;
    /**
     * Run all tests in all groups
     */
    runAll(): void;
    /**
     * Run only one test in group
     * @param {string} groupName Name of the group
     * @param {string} testName Name of the test
     */
    runTest(groupName: string, testName: string): void;
    /**
     * Run anonyms tests.
     * @param {BetestGroup | {name: "name", tests: []}} groups Object which contains param name of the group
     * and param tests with array of functions
     */
    go(groups: BetestGroup[]): void;
    /**
     * Run all tests inside one group
     * @param {BetestGroup | {name: "name", tests: []}} group A group with tests
     */
    private runGroupTests;
    /**
     *
     * @param {string} name Name of the group
     * @returns If exist return group otherwise undefined
     */
    private checkIfGroupExists;
    /**
     *
     * @param {string} name Name of the group
     * @returns Found group
     * @throws An error if group doesn't exist
     */
    private findGroup;
    /**
     *
     * @param {BetestGroup | {name: "name", tests: []}} group A group in which tests will be seeking
     * @param {string} testName A name of the test you want to find
     * @throws An error if test doesn't exist
     * @returns Function
     */
    private findTest;
}
