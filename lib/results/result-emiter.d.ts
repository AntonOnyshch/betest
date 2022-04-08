import { BetestTestResult } from "../b-test-tesult";
export interface ResultEmiter {
    emit(results: BetestTestResult[]): void;
}
