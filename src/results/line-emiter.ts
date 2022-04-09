import { BetestTestResult } from "../b-test-tesult";
import { ResultEmiter } from "./result-emiter";

export class LineResultEmiter implements ResultEmiter {

    private passParams = {
        resultValue: "PASS",
        background: "42"
    }

    private failParams = {
        resultValue: "FAIL",
        background: "41"
    }

    emit(results: BetestTestResult[]): void {
        let resultParams: any; 

        for (const result of results) {
            resultParams = result.result ? this.passParams : this.failParams;

            console.log(`\x1b[${resultParams.background}m${resultParams.resultValue}\x1b[0m ${result.name}`);
        }
    }
}