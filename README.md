**Betest is under active development. You may encounter significant changes.**

# Betest

**Always wanted to write simple tests for your code?**
**Tired about heavy frameworks?**
**Fed up by hundreds of files in your node_modules?**


**Betest** is a small and simple way to write and run JavaScript tests with *zero dependencies!*


# Table of content
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#example)
- [ConstructorParams](#constructor-params)

## Installation
```console
npm install betest -D
```

## Usage

*Assuming that you have folder "tests" and file "index.js" inside.*

```console
node ./tests/index.js
```

or add this to your **package.json**

```json
  "scripts": {
    "test": "node ./tests/index.js"
  },
```

## Example

**Let's assume you have two test functions that do some work**

```javascript
import {Betest} from 'betest';

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

```

**Create an instance of Betest:**
```javascript
const betest = new Betest();
```

**You can choose how results will be look in console using parameters object:**
```javascript
betestParams = {
    results: {
        showAs: "Table" // or "Line"(Colorful PASS/FAIL)
    }
}
const betest = new Betest(betestParams);
```

**Add your named group and functions using method "addGroup":**
```javascript
// First parameter is group name, second is array of functions
betest.addGroup(
    { 
        name: "Math group", 
        tests: [testMultiplication, testSum] 
    }
);
//Or
betest.addGroup(
    { 
        name: "Math group", 
        tests: [
            function testFunc() {

            }
        ]
    }
);
```

**You can run all tests in all groups, either one group or only one test in the group:**
1. Run all tests in all groups
```javascript
betest.runAll();
```
2. Run only one group's tests
```javascript
betest.runGroup("Math Test");
```
3. Run only one test in the group

*Note: "Test Name" is the name of your function. In our example; "testMultiplication" or "testSum"*
```javascript
betest.runTest("Math Test", "Test Name");
```

**Or you can run test on the fly**
```javascript
betest.go(
    [ // groups
        { // one group
            name: "Geometry Tests",
            tests: [
                function findSinus() {
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
|    0  | multiplication | true       |
|    1  | sum            | true       |


## Constructor Params

```javascript
const betestParams = {
    results: {
        // 1. "Table" for table result.
        // 2. "Line" for colorful PASS/FAIL message
        showAs: string
    }
}
```