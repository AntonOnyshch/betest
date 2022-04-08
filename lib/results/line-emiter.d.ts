import { BetestTestResult } from "../b-test-tesult";
import { ResultEmiter } from "./result-emiter";
export declare class LineResultEmiter implements ResultEmiter {
    emit(results: BetestTestResult[]): void;
}
