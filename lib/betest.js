export class Betest {
    constructor() {
        this.testGroups = new Array();
    }
    addTest(group, testFunc) {
        const found_group = this.findGroup(group.name);
        found_group.tests.push(testFunc);
    }
    addGroup(group) {
        this.testGroups.push(group);
    }
    runGroup(groupName = 'Group Name') {
        const group = this.findGroup(groupName);
        this.runGroupTests(group);
    }
    runAll() {
        this.testGroups.forEach(v => this.runGroupTests(v));
    }
    runTest(groupName = 'Group Name', testName = 'Test Name') {
        const group = this.findGroup(groupName);
        const test = this.findTest(group, testName);
        console.group(group.name);
        const result_table = new Array();
        result_table.push({ name: test.name, result: test() });
        console.table(result_table);
        console.groupEnd();
    }
    go(tests) {
        tests.forEach((group) => this.runGroupTests(group));
    }
    runGroupTests(group) {
        console.group(group.name);
        const result_table = new Array();
        group.tests.forEach((test) => { result_table.push({ name: test.name, result: test() }); });
        console.table(result_table);
        console.groupEnd();
    }
    findGroup(groupName = 'Group Name') {
        for (const group of this.testGroups) {
            if (group.name === groupName) {
                return group;
            }
        }
        throw new Error(`Group "${groupName}" is not found`);
    }
    findTest(group, testName = 'Test Name') {
        for (const testFunc of group.tests) {
            if (testFunc.name === testName) {
                return testFunc;
            }
        }
        throw new Error(`Test "${testName}" is not found`);
    }
}
