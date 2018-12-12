// 6.5 인스턴스 타입과 그 생성자 살펴보기
(function(){
  'use strict';

  function Ninja() {}

  var ninja = new Ninja();

  console.assert(typeof ninja === 'object', '<> ninja === "object"');
  console.assert(ninja instanceof Ninja, '<> ninja instanceof Ninja');
  console.assert(ninja.constructor === Ninja, '<> ninja.constructor === Ninja');
})();

// 6.6 constructor 프로퍼티 참조를 사용하여 새 객체 인스턴스를 생성한다.
(function() {
  'use strict';

  function Ninja() {}

  var ninja = new Ninja();
  var ninja2 = new ninja.constructor(); // constructor는 Ninja를 참조하기 때문에 생성자로 인스턴스 생성이 가능하다.

  console.assert(ninja2 instanceof Ninja, '<> ninja2 instanceof Ninja'); // ninja2 역시 Ninja의 인스턴스
  console.assert(ninja !== ninja2, '<> ninja !== ninja2'); // 하지만 두 인스턴스는 다르다.
})();

// 6.7 프로토타입을 사용하여 상속을 시도한다.
(function(){
  'use strict';

  function Person() {}
  Person.prototype.dance = function() {console.log('we can dance!');};

  function Ninja() {}
  Ninja.prototype = { dance: Person.prototype.dance };

  var ninja = new Ninja();
  console.assert(ninja instanceof Ninja, '<> ninja instanceof Ninja');
  // console.assert(ninja instanceof Person, '<> ninja instanceof Person'); // <>
  console.assert(ninja instanceof Object, '<> ninja instanceof Object');
  console.assert(typeof ninja.dance, '<> typeof ninja.dance');
})();


// 6.8 프로토타입 사용하여 상속하기
(function(){
  'use strict';

  function Person() {}
  Person.prototype.dance = () => console.log('we can dance!');

  function Ninja() {}
  Ninja.prototype = new Person();
  Ninja.prototype.swordDance = () => console.log('dance with sword!');
  var ninja = new Ninja();
  console.assert(ninja instanceof Ninja, '<> ninja instanceof Ninja');
  console.assert(ninja instanceof Person, '<> ninja instanceof Person');
  console.assert(ninja instanceof Object, '<> ninja instanceof Object');
  console.assert(typeof ninja.dance === 'function', '<> typeof ninja.dance');
  console.assert(typeof ninja.swordDance === 'function', '<> typdof ninja.swordDance');
})();


// 6.9 자바스크립트 1.6에서도 계속 사용할 수 있는 forEach() 메서드 구현하기
(function() {
  'use strict';

  if(!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, context) {
      console.log('forEach function defined by user!');
      for(var i = 0; i < this.length; i++) {
        callback.call(context || null, this[i], i, this);
      }
    };
  }

  ['a', 'b', 'c'].forEach(function(val, i, array){
    console.assert(val, '<> ' + i + ' of ' + array);
  });
})();


// 6. 11 Object 프로토 타입에 프로퍼티를 추가함으로써 일어나는 예상치 못한 작용
(function() {
  'use strict';

  Object.prototype.keys = function() {
    var keys = [];
    for (var p in this)
      keys.push(p);
    return keys;
  };

  var obj = {a: 1, b: 2, c: 3};
  // console.assert(obj.keys().length === 3, '<> obj.keys().length === 3 => ', obj.keys()); // 테스트 실패
})();


// 6. 12 Object 프로토타입 확장으로 인한 말썽을 잠재우기 위해 hasOwnProperty() 메서드 사용하기
(function() {
  'use strict';

  Object.prototype.keys = function() {
    var keys = [];
    for (var p in this)
      if(this.hasOwnProperty(p))
        keys.push(p);
    return keys;
  };

  var obj = {a: 1, b: 2, c: 3};
  console.assert(obj.keys().length === 3, '<> obj.keys().length === 3'); // 테스트 성공
})();

