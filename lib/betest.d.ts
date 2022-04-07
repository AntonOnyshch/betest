export declare class Betest {
    private testGroups;
    constructor();
    add(params?: {
        name: string;
        tests: never[];
    }): void;
    runGroup(groupName?: string): void;
    runAll(): void;
    runTest(groupName?: string, testName?: string): void;
    go(tests: any[]): void;
    private runGroupTests;
    private findGroup;
    private findTest;
}