---
title: "class"
category: [js]
tags: [javascript, class, es6]
---

# class

class는 ES6에서 소개된 문법으로 기존의 프로토타입 기반 상속에 비해 객체 생성과 상속을 다루기 훨씬 간결하고 쉬워졌다.


```js

class Animal {
    constructor() {
        this.stand = false;
    }
    bark() {
        console.log('으르렁!');
    }
}

let lion = new Animal();
lion.bark();
console.assert(!lion.stand, '사자가 직립보행한다고?');
```

상속을 받는 경우, 생성자를 구현할 때 반드시 `super()` 메서드를 추가해야 한다.
```js
class Dog extends Animal {
    bark() {
        console.log('멍멍');
    }
}

let jindo = new Dog();
jindo.bark();
console.assert(!jindo.stand, '진돗개가 직립보행한다고?');

class Penguin extends Animal {
    constructor() {
        super();
        this.stand = true;
    }
    
    bark() {
        console.log('펭펭..?');
    }
}

let gentoo = new Penguin();
gentoo.bark();
console.assert(gentoo.stand, '젠투펭귄이 기어간다고? 그럴지도...?');
```
