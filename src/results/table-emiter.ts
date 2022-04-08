import { BetestTestResult } from "../b-test-tesult";
import { ResultEmiter } from "./result-emiter";

export class TableResultEmiter implements ResultEmiter {

    emit(results: BetestTestResult[]): void {
        console.table(results);
    }

}