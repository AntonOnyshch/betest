const testMultiplication = function() {
    const res = 5 * 2;

    if(res === 10) {
        return true;
    } else {
        return false;
    }
}

const testSum = function() {
    const res = 5 + 2;

    if(res === 7) {
        return true;
    } else {
        return false;
    }
}

export const tests = [testMultiplication, testSum];