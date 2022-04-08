import { BetestTestResult } from "../b-test-tesult";
import { ResultEmiter } from "./result-emiter";

export class LineResultEmiter implements ResultEmiter {

    emit(results: BetestTestResult[]): void {
        let resulValue: string;

        for (const result of results) {
            resulValue = result.result ? "PASS" : "FAIL";
            console.log(`${result.name} : ${resulValue}`);
        }
    }
}