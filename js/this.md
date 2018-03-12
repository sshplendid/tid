# this

메서드 호출시, this는 함수를 호출한 객체를 나타낸다.

## Global Context

`this`는 global 영역에서 전역객체를 참조한다.

```javascript
console.log(this.document === document); // true

// 웹 브라우저의 전역객체는 window
console.log(this === window); // true

this.a = 10;
console.log(window.a); // 10
```

## Function Context

함수 안에서의 `this`는 함수 호출방법에 따라 달라진다.

### 단순 함수 호출

아래 경우 `this`는 호출에 의해 설정되지 않는다. 그리고 `strict mode`가 아니기 때문에 this는 항상 전역객체에서 기본이 되는 객채여야 한다.

```javascript
function foo() {
    return this;
}

console.log(foo() === window); // true, global object
console.log(window.foo() === window); // true, global object
```

strict mode 적용시, `this`는 실행 컨텍스트에 들어갈때 할당된다. 만약 정의가 되지 않았다면 `undefined`가 된다.

```javascript
function bar() {
   "use strict"; // strict mode
   return this;
}

console.log(bar() === undefined); // true, bar를 단독으로 호출했다.
console.log(window.bar() === window); // true, window객체의 메서드로서 호출
```

### 객체의 메서드

위의 window.bar()처럼 객체의 메서드로 호출되었을 때, this는 메서드를 호출한 객체를 가리킨다.

```javascript
var jane = {
    age: 10,
    growUp: function() {
        // jane 객체 하위 메서드로, 함수 호출시 this는 jane을 가리킨다.
        this.age += 1;
        return this.age;
    }
};

console.log(jane.growUp());

var john = {
    age: 10,
};
function growUp () {
    this.age += 1;
    return this.age;
}
john.growUp = growUp;

console.log(john.growUp()); // 11
console.log(growUp()) // NaN, window객체에 age라는 속성이 없기때문에

this.age = 1; // window 객체에 age 속성(수치형)을 생성
console.log(growUp()) // 2
```

### 객체의 prototype

메서드가 객체의 prototype 체인에 있다면, 메서드는 호출된 객체를 나타낸다.

```javascript
var o = {f:function() { return this.a + this.b; }};
var p = Object.create(o);
p.a = 1;
p.b = 2;

console.log(p.f()); // 3, p 객체의 프로퍼티 a(1) + b(2) 를 리턴
```



### 생성자

생성자를 통해 생성된 객체를 가리킨다.

```javascript
var age = -1; // 전역변수
function Person() {
    this.age = 0;
    this.getAge = function() {
        return this.age;
    };
    this.setAge = function(a) {
        this.age = a;
    }
}

var jane = new Person();
console.log('Jane\'s age: ' + jane.getAge());  // 0, 새롭게 생성된 jane의 age 초기값을 리턴
jane.setAge(10);
console.log('Jane\'s age: ' + jane.getAge());  // 10
console.log('global age: ' + age);             // -1, 전역변수 age는 변동없음
```

### Anonymous function

[stackoverflow: this value in JavaScript anonymous function](https://stackoverflow.com/questions/8670877/this-value-in-javascript-anonymous-function) 을 읽고 작성했다.

아래 test 함수의 첫 번째 라인을 보자. `A` 의 `this`는 test를 호출한 객체를 가리킨다. 마지막 라인의 new MyObject() 생성자를 통해 생성된 객체다.

반면에 `B` 는 전혀 다른 함수 범위이고, 이 함수를 호출한 객체는 없다. 그러므로 기본 값인 `window`를 가리킨다.

```javascript
function MyObject() { };

MyObject.prototype.test = function () {
    console.log("A", this instanceof MyObject);
    (function () {
        console.log("B", this instanceof MyObject);
        console.log("C", this === window);
    }());
}

// A true
// B false    
new MyObject().test();
```

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this
