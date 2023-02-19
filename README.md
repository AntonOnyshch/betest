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
npm install betest --save-dev
```
For beta see [Github](https://github.com/AntonOnyshch/betest/tree/2.0.0-beta) 
```console
npm install betest@beta --save-dev
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

**Create an instance of Betest:**
```javascript
import {Betest} from 'betest';

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

betest.addGroup(
    { 
        name: "Example Group", 
        tests: [
            {   
                name: 'checkObject',
                expected: {
                    fisrstName: "First Name",
                    secondName: "Second Name"
                },
                data: {
                    fisrstName: "First Name",
                    secondName: "Second Name"
                },
                test: function checkObject() {
                    return this.data;
                }
            },
            {   
                name: 'findHypotenuse',
                expected: 7,
                data: {
                    cathetusA: 5 ** 2,
                    cathetusB: 5 ** 2
                },
                test: function findHypotenuse() {
                    return Math.round(Math.sqrt(this.data.cathetusA + this.data.cathetusB));
                }
            },
            {   
                name: 'checkArrayEquality',
                expected: [
                    [6, -8, 1],
                    [4, 1, 0],
                    [2, 3, 5]
                ],
                test: function checkArrayEquality() {
                    return [
                        [6, -8, 1],
                        [4, 1, 0],
                        [2, 3, 5]
                    ]
                }
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
betest.runGroup("Example Group");
```
3. Run only one test in the group

```javascript
betest.runTest("Example Group", "findHypotenuse");
```

**Or you can run test on the fly**
```javascript
betest.go(
    [ // groups
        { // one group
            name: "Geometry Tests",
            tests: {
                name: 'findSinus',
                expected: 1,
                data: 90,
                test: function findSinus() {
                    return Math.sin(this.data * 180 / Math.PI);
                }
            }
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