# Betest

Small and simple way to write and run JavaScript tests.

**Zero dependencies!**

## Installation
```console
npm install betest
```

## Example

```
const testAddFunction = function() {
    const res = 5 * 2;

    if(res === 10) {
        return true;
    } else {
        return false;
    }
}

const betest = new Betest();

betest.add("Math Test", [testAddFunction]);

betest.runAll();

```

**And see result as:**

|   (index)       | Values     |
| -----------     | -----------|
| testAddFunction | true       |
