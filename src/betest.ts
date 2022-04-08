import { BetestGroup } from "./b-group.js";
import { BetestTestResult } from "./b-test-tesult.js";
import { ResultEmiters } from "./results/results-emiters.js";
import {ResultEmiter} from './results/result-emiter.js';
import { TableResultEmiter } from "./results/table-emiter.js";
import { LineResultEmiter } from "./results/line-emiter.js";

/**
 * Contain list of named groups with tests
 */
export class Betest {

    private testGroups: BetestGroup[];

    private resultEmiter: ResultEmiter;

    /**
     * Create ne Betest instance
     * @param emitResults Choose how results will be shown in console.
     * Default value is 0 which means "Table". @type {ResultEmiters}
     */
    constructor(emitResults: ResultEmiters) {
        this.testGroups = new Array<BetestGroup>();

        switch (emitResults) {
            case ResultEmiters.Table: {
                this.resultEmiter = new TableResultEmiter();
            } break;
            case ResultEmiters.LineByLine: {
                this.resultEmiter = new LineResultEmiter();
            } break;
            default: {
                this.resultEmiter = new TableResultEmiter();
            } break;
        }
    }

    /**
     * Use this method to add your test to group.
     * @param {string} groupName - A name of group which will contain your test.
     * Note: your group should exist
     * @param {Function} testFunc - This is your function
     */
    public addTest(groupName: string, testFunc: Function): void {
        const found_group = this.findGroup(groupName);
        found_group.tests.push(testFunc);
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
        const test = this.findTest(group, testName);
        
        console.group(`\x1b[100m${group.name}\x1b[0m`);

        const result_table = new Array<BetestTestResult>();

        result_table.push({name: test.name, result: test()});

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
        console.group(`\x1b[100m${group.name}\x1b[0m`);

        const result_table = new Array<BetestTestResult>();
        group.tests.forEach((test: Function) => {result_table.push({name: test.name, result: test()})});

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
    private findTest(group: BetestGroup, testName: string): Function {
        for (const testFunc of group.tests) {
            if(testFunc.name === testName) {
                return testFunc;
            }
        }

        throw new Error(`Test "${testName}" is not found`);
    }

}