import { BetestGroup } from "./bGroup.js";
import { BetestTestResult } from "./bTestResult.js";

export class Betest {

    private testGroups: BetestGroup[];

    constructor() {
        this.testGroups = new Array<BetestGroup>();
    }

    public addTest(group: BetestGroup, testFunc: Function) {
        const found_group = this.findGroup(group.name);
        found_group.tests.push(testFunc);
    }

    public addGroup(group: BetestGroup) {
        this.testGroups.push(group);
    }

    public runGroup(groupName = 'Group Name') {
        const group = this.findGroup(groupName);
        this.runGroupTests(group);
    }

    public runAll() {
        this.testGroups.forEach(v => this.runGroupTests(v));
    }

    public runTest(groupName = 'Group Name', testName = 'Test Name') {
        const group = this.findGroup(groupName);
        const test = this.findTest(group, testName);
        
        console.group(group.name);

        const result_table = new Array<BetestTestResult>();

        result_table.push({name: test.name, result: test()});

        console.table(result_table);

        console.groupEnd();
    }

    public go(tests: any[]) {
        tests.forEach((group) => this.runGroupTests(group));
    }

    private runGroupTests(group: any) {
        console.group(group.name);

        const result_table = new Array<BetestTestResult>();
        group.tests.forEach((test: Function) => {result_table.push({name: test.name, result: test()})});

        console.table(result_table);

        console.groupEnd();
    }

    private findGroup(groupName = 'Group Name') {
        for (const group of this.testGroups) {
            if(group.name === groupName) {
                return group;
            }
        }
        throw new Error(`Group "${groupName}" is not found`);
    }

    private findTest(group: any, testName = 'Test Name') {
        for (const testFunc of group.tests) {
            if(testFunc.name === testName) {
                return testFunc;
            }
        }

        throw new Error(`Test "${testName}" is not found`);
    }
}