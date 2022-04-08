export class LineResultEmiter {
    emit(results) {
        let resulValue;
        for (const result of results) {
            resulValue = result.result ? "PASS" : "FAIL";
            console.log(`${result.name} : ${resulValue}`);
        }
    }
}
