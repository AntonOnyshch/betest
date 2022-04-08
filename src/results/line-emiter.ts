import { BetestTestResult } from "../b-test-tesult";
import { ResultEmiter } from "./result-emiter";

export class LineResultEmiter implements ResultEmiter {

    emit(results: BetestTestResult[]): void {
        let resulValue: string;
        
        for (const result of results) {
            resulValue = result.result ? "PASS" : "FAIL";
            if(result.result === true) {
                console.log(`\x1b[42m${resulValue}\x1b[0m ${result.name}`);
            } else {
                console.log(`\x1b[41m${resulValue}\x1b[0m ${result.name}`);
            }
        }
    }
}