export class LightTest {
    constructor() {
        this.testGroups = new Array();
    }
    add(params = { name: 'Group Name', tests: [] }) {
        this.testGroups.push(params);
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
        const resultTable = new Array();
        resultTable[test.name] = test();
        console.table(resultTable);
        console.groupEnd();
    }
    runGroupTests(group) {
        console.group(group.name);
        const resultTable = new Array();
        group.tests.forEach((test) => { resultTable.push({ name: test.name, result: test() }); });
        console.table(resultTable);
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
