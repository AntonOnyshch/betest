import { BetestTestResult } from "../b-test-tesult";
import { ResultEmiter } from "./result-emiter";
export declare class TableResultEmiter implements ResultEmiter {
    emit(results: BetestTestResult[]): void;
}
