---

---

# 깔끔한 조건문 작성

## 1. 복수 조건일 경우,  ``Array.includes``를 사용한다.

```js
function test(fruit) {
    if(fruit === 'apple' || fruit === 'strawberry') {
        console.log('red');
    }
}
```

대안
```js
function test(fruit) {
    const redFruits = ['strawberry', 'apple', 'cherry'];
    
    if(redFruitrs.includes(fruit)) {
        console.log('red');
    }
}
```

## 2. 중첩을 최소화하고, 최대한 빨리 리턴한다.

```js
function test(fruit, quantity) {
    const redFruits = ['apple', 'strawberry', 'cherry'];
    
    if(fruit) {
        if(redFruits.include(fruit)) {
            console.log('red');

            if(quantity > 10) {
                console.log('big quantity');
            }
        }
    } else {
        throw new Error('No Fruit!');
    }
}

test(null); // error: No Fruit
test('apple'); // red
test('apple', 20); //red, big quantity
```

대안
```js
function test(fruit, quantity) {
    const redFruits = ['apple', 'strawberry', 'cherry'];
    
    if(!fruit) throw new Error('No Fruit!');
    
    if(!redFruits.include(fruit)) return;
    console.log('red');

    if(quantity > 10) {
        console.log('big quantity');
    }
}

test(null); // error: No Fruit
test('apple'); // red
test('apple', 20); //red, big 
```

## 3. Default Function Parameter를 사용하자

함수 안에서의 변수 초기화
```js
function test(fruit, quantity) {
    if(!fruit) return;
    const q = quantity || 1;

    console.log(`We have ${q} ${fruit}!`);
}

// test results
test('banana') // We have 1 banana!
test('apple', 2) // We have 2 apple!
```

대안: default parameter를 사용하기
```js
function test(fruit, quantity = 1) {
    if(!fruit) return;

    console.log(`We have ${quantity} ${fruit}!`);
}

// test results
test('banana') // We have 1 banana!
test('apple', 2) // We have 2 apple!
```

parameter가 객체인 경우
```js
function test(fruit) {
    if(fruit && fruit.name) {
        console.log(fruit.name);
    } else {
        console.log('unknown');
    }
}

// test results
test(undefined); // unknown
test({ }); // unknown
test({name: 'apple', color: 'red'}); // apple
```

대안
```js
function test({name, color} = {}) {
    console.log(name || 'unknown');
    console.log(color || 'unknown color');
}

// test results
test(undefined); // unknown
test({ }); // unknown
test({name: 'apple', color: 'red'}); // apple
```


## 4. ``switch`` 보단 ``Map``, 객체 리터럴을 사용해라

```js
function test(color) {
    switch(color) {
        case 'red': 
          return ['apple', 'strawberry'];
        case 'yellow': 
          return ['banana', 'pineapple'];
        case 'purple': 
          return ['grape', 'plum'];
        default: 
          return [];
    }
}

// test results
test(null); // []
test('yellow') // ['banana', 'pineapple']
```

대안1
```js
const fruitColor = {
    red: ['apple', 'strawberry'],
    yellow: ['banana', 'pineapple'],
    purple: ['grape', 'plum']
};

function test(color) {
    return fruitColor[color] || [];
}
```

대안2
```js
const fruitColor = new Map()
    .set('red', ['apple', 'strawberry'])
    .set('yellow', ['banana', 'pineapple'])
    .set('purple', ['grape', 'plum']);

function test(color) {
    return fruitColor.get(color) || [];
}
```

대안3
```js
const fruitColor = [
    {name: 'apple', color: 'red'},
    {name: 'strawberry', color: 'red'},
    {name: 'banana', color: 'yellow'},
    {name: 'pineapple', color: 'yellow'},
    {name: 'grape', color: 'purple'},
    {name: 'plum', color: 'purple'}
];

function test(color) {
    return fruitColor.filter(f => f.color === color);
}
```


## 5. 전체/부분 조건을 위해 ``Array.every``와 ``Array.some``를 사용해라

```js
const fruitColor = [
    {name: 'apple', color: 'red'},
    {name: 'strawberry', color: 'red'},
    {name: 'banana', color: 'yellow'},
    {name: 'pineapple', color: 'yellow'},
    {name: 'grape', color: 'purple'},
    {name: 'plum', color: 'purple'}
];

function test() {
    let isAllRed = true;

    // 조건: 모든 과일은 빨간색이어야한다.
    for(let f of fruits) {
        if(!isAllRed) break;
        isAllRed = (f.color === 'red');
    }

    console.log(isAllRed); // false
}
```

대안: ```Array.every```
```js
const fruitColor = [
    {name: 'apple', color: 'red'},
    {name: 'strawberry', color: 'red'},
    {name: 'banana', color: 'yellow'},
    {name: 'pineapple', color: 'yellow'},
    {name: 'grape', color: 'purple'},
    {name: 'plum', color: 'purple'}
];

function test() {
    // 조건: 모든 과일은 빨간색이어야한다.
    const isAllRed = fruits.every(f => f.color === 'red');

    console.log(isAllRed); // false
}
```


대안: ```Array.some```
```js
const fruitColor = [
    {name: 'apple', color: 'red'},
    {name: 'strawberry', color: 'red'},
    {name: 'banana', color: 'yellow'},
    {name: 'pineapple', color: 'yellow'},
    {name: 'grape', color: 'purple'},
    {name: 'plum', color: 'purple'}
];

function test() {
    // 조건: 과일들 중에 빨간색 과일이 존재한다.
    const isAllRed = fruits.some(f => f.color === 'red');

    console.log(isAllRed); // true
}
```
