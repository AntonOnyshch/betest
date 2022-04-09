const multiplication = function() {
    const res = 5 * 2;

    if(res === 10) {
        return true;
    } else {
        return false;
    }
}

const sum = function() {
    const res = 5 + 2;

    if(res === 7) {
        return true;
    } else {
        return false;
    }
}

export const tests = [multiplication, sum];