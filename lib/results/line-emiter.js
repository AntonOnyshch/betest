export class LineResultEmiter {
    constructor() {
        this.passParams = {
            resultValue: "PASS",
            background: "42"
        };
        this.failParams = {
            resultValue: "FAIL",
            background: "41"
        };
    }
    emit(results) {
        let resultParams;
        for (const result of results) {
            resultParams = result.result ? this.passParams : this.failParams;
            console.log(`\x1b[${resultParams.background}m${resultParams.resultValue}\x1b[0m ${result.name} 
                  \x1b[90m Expected: ${result.expected} \x1b[0m
                   \x1b[90m Got: ${result.got} \x1b[0m
                `);
        }
    }
}
