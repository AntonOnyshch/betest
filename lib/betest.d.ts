import { BetestGroup } from "./bGroup.js";
export declare class Betest {
    private testGroups;
    constructor();
    addTest(group: BetestGroup, testFunc: Function): void;
    addGroup(group: BetestGroup): void;
    runGroup(groupName?: string): void;
    runAll(): void;
    runTest(groupName?: string, testName?: string): void;
    go(tests: any[]): void;
    private runGroupTests;
    private findGroup;
    private findTest;
}
