export declare class LightTest {
    private testGroups;
    constructor();
    add(params?: {
        name: string;
        tests: never[];
    }): void;
    runGroup(groupName?: string): void;
    runAll(): void;
    runTest(groupName?: string, testName?: string): void;
    private runGroupTests;
    private findGroup;
    private findTest;
}
