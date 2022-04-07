# Betest

Small and simple way to write and run JavaScript tests.

**Zero dependencies!**

## Installation
```console
npm install betest
```

## Example

**Let's assume you have two test functions that do some work**

```
import {Betest} from 'betest';

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

```

**Create instance of Betest :**
```
const betest = new Betest();
```

**Add your functions through method "Add" :**
```
// First parameter is group name, second is array of functions
betest.add(
    { 
        name: "Math group", tests: [testMultiplication, testSum] 
    }
);
```

**You can run all tests in all groups, either one group or only one test in group:**
1. Run all tests in all groups
```
betest.runAll();
```
2. Run only one group's tests
```
betest.runGroup("Math Test");
```
3. Run only one test in the group

*Note: "Test Name" is the name of your function. In our example; "testMultiplication" or "testSum"*
```
betest.runTest("Math Test", "Test Name");
```

**Or you can run anonyms tests**
```
betest.go(
    [ // groups
        { // one group
            name: "Geometry Tests",
            tests: [
                function findSinusTest() {
                    const sinusOf90D = Math.sin(90 * 180 / Math.PI);
 
                    return sinusOf90D === 1;
                }
            ]
        }
    ]
);
```

**And see results:**

|(index)|   (name)           | Values     |
|-------| -------------------| -----------|
|    0  | testMultiplication | true       |
|    1  | testSum            | true       |
