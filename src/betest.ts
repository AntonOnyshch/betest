export class Betest {

    private testGroups = new Array();

    constructor() {}

    public add(params = {name: 'Group Name', tests: []}) {
        this.testGroups.push(params);
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

        const resultTable = new Array();

        resultTable[test.name] = test();

        console.table(resultTable);

        console.groupEnd();
    }

    public go(tests: any[]) {
        tests.forEach((group) => this.runGroupTests(group));
    }

    private runGroupTests(group: any) {
        console.group(group.name);

        const resultTable = new Array();
        group.tests.forEach((test: Function) => {resultTable.push({name: test.name, result: test()})});

        console.table(resultTable);

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