// 5.1 간단한 클로저
(function() {
  var outerValue = 'Ninja';

  function outerFunction() {
    console.(outerValue == 'Ninja', 'I can\'t see the ninja!');
  }

  outerFunction();
})();

// 5.2 간단하지 않은 클로저
(function() {
  var outerValue = 'Ninja';

  var later;

  function outerFunction() {
    var innerValue = 'Samurai';

    function innerFunction() {
      console.(outerValue, 'I can\'t see the ninja!');
      console.(innerValue, 'I can\'t see the Samurai!');
    }
    later = innerFunction;
  }

  outerFunction();
  later();
})();

// 5.3 클로저가 볼 수 있는 다른 것들
(function() {
  var outerValue = 'Ninja';
  var later;

  function outerFunction() {
    var innerValue = 'samurai';

    function innerFunction(params) {
      console.(outerValue, `Inner can't see the ninja!`);
      console.(innerValue, `Inner can't see the samurai!`);
      console.(params, `Inner can't see the wakizashi!`);
      console.(tooLate, `Inner can't see the ronin!`);
    }

    later = innerFunction;
  }
  console.(!tooLate, `Inner can see the ronin!`);

  var tooLate = 'ronin';
  outerFunction();

  later('wakizashi');


// 5.4 클로저를 이용해서 private 변수와 같은 효과를 내기
(function() {
  function Ninja() {
    var feints = 0;

    this.getFeints = function() {
      return feints;
    };

    this.feint = function() {
      feints++;
    };
  }

  var ninja = new Ninja();

  ninja.feint();

  console.(ninja.getFeints() == 1, '생성자 내부에 있는 feints 변수의 값을 얻을 수 있다.');
  console.(ninja.feints === undefined, '하지만 변수에 접근할 수는 없다.');
})();  

// 5.5 Ajax 요청용 콜백에서 클로저 사용하기
// jQuery를 사용하지 않는 방법으로 코드를 수정함
(function() {
  var div$ = document.createElement('div');
  var button$ = document.createElement('button');
  button$.innerHTML = 'request';
  document.body.appendChild(button$);
  document.body.appendChild(div$);

  button$.addEventListener('click', function() {
    var url = 'https://www.w3schools.com/js/demo_get.asp';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        div$.innerHTML = this.responseText;
        console.log(this.responseText);
      }
    };
    xhr.open('GET', url);
    xhr.send();
  });
})();

// 5.6 타이머 콜백 내에서 클로저 사용하기
// 백지 화면에서 실행되게 수정
(function() {
  document.body.innerHTML = '';
  document.body.style = '';
  var div$ = document.createElement('div');
  div$.style.backgroundColor = 'green';
  div$.style.width = '10px';
  div$.style.height = '10px';
  div$.style.position = 'absolute';
  document.body.appendChild(div$);

  function animateIt(el) {
    var tick = 0;

    var timer = setInterval(function() {
      if(tick < 100) {
        el.style.left = el.style.top = tick + 'px';
        tick++;
      } else {
        clearInterval(timer);
      }
    }, 10);
  }

  animateIt(div$);
})();

// 5.7 특정 콘텍스트를 함수에 바인딩하기
(function() {
  document.body.innerHTML = '';
  document.body.style = '';
  var button$ = document.createElement('button');
  button$.innerHTML = '이 테스트는 실패한다.';
  document.body.appendChild(button$);

  var button = {
    clicked: false,
    click: function() {
      this.clicked = true;
      console.(button.clicked, '버튼이 클릭되지 않음!'); // 테스트는 실패한다.
    }
  };

  var el = document.querySelector('button');
  el.addEventListener('click', button.click, false);
})();

  // 5.8 특정 콘텍스트를 이벤트 핸들러에 바인딩하기(변형)
(function() {
  document.body.innerHTML = '';
  document.body.style = '';
  var button$ = document.createElement('button');
  button$.innerHTML = '이 테스트는 성공한다.';
  document.body.appendChild(button$);

  var button = {
    clicked: false,
    click: function() {
      this.clicked = true;
      button$.innerHTML = this.clicked;
      console.(button.clicked, '버튼이 클릭되지 않음!'); // 테스트는 한다.
    }
  };
  function bind(context, func) {
    return function() {
      context[func].call(context);
    };
  }
  var el = document.querySelector('button');
  el.addEventListener('click', bind(button, 'click'), false);
})();

  
// 5.9 Prototype 라이브러리를 이용한 함수-바인딩 코드 예제
Function.prototype.bind = function() {
  var fn = this
    , args = Array.prototype.slice.call(arguments)
    , object = args.shift();
  
  return function() {
    return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
  };
};

var myObject = {};
function myFunction() {
  return this === myObject;
}

console.(!myFunction(), '콘텍스트가 아직 설정되지 않음');

var aFunction = myFunction.bind(myObject);
console.(aFunction(), '콘텍스트가 설정됨');
  
// 5.10 네이티브 함수에 대해 인자를 부분적으로 적용하기
(function() {
  String.prototype.csv = String.prototype.split.partial(/,\s*/);

  var results = 'Mugan, Jin, Fuu'.csv();

  console.(results[0] === 'Mugan'
    && results[1] === 'Jin'
    && results[2] === 'Fuu', '텍스트를 적절하게 분리하지 못함'
  );
})();

// 5.11 첫 번째 인자를 채워주는 curry 함수의 예
Function.prototype.curry = function() {
  var fn = this
    , args = Array.prototype.slice.call(arguments);
  return function() {
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
  }
};


// 5.12 좀 더 복잡한 "부분"함수
// 인자의 개수를 처음 partial메서드를 호출할 때 지정해야 함. (값이 없는 경우 undefined로)
(function() {
  'use strict';
  
  Function.prototype.partial = function() {
    var fn = this
      , args = Array.prototype.slice.call(arguments);

    return function() {
      var arg = 0;

      for(var i = 0; i < args.length && arg < arguments.length; i++) {
        if(args[i] == undefined) {
          args[i] = arguments[arg++];
        }
      }

      return fn.apply(this, args);
    };
  };

  // 테스트
  function sum() {
    var total = 0;
    for(var i = 0; i < arguments.length; i++) {
      total += arguments[i];
    }
    return total;
  }

  var add1 = sum.partial(1, undefined);
  var add12 = sum.partial(1,2, undefined, undefined);

  console.(sum(1,2) == 3, 'sum(1,2) malfunctioned => ' + sum(1,2));
  console.(sum(1,2,3,4,5,6,7,8,9,10) == 55, 'sum(1...10) malfunctioned => ' + sum(1,2,3,4,5,6,7,8,9,10));
  console.(add1() === 1, 'add1 malfunctioned => ' + add1());
  console.(add1(3) === 4, 'add1 malfunctioned => ' + add1(3));
  console.(add12(1,2) === 6, 'add12 malfunctioned => ' + add12(1,2));
})();

// 5.12 (추가) arguments의 요소가 undefined거나 매개변수 목록에 없는 인자를 추가해야 하는 경우
// 최초 인자의 수에 관계없이 동적으로 추가 가능하다.
(function() {
  'use strict';
  
  Function.prototype.partial = function() {
    var fn = this;
    var args = Array.prototype.slice.call(arguments);

    return function() {
      var arg = 0;
      for(var i = 0; i < args.length || arg < arguments.length; i++) {
        args[i] = args[i] || arguments[arg++];
      }

      return fn.apply(this, args);
    }
  };

  // 테스트
  function sum() {
    var total = 0;
    for(var i = 0; i < arguments.length; i++) {
      total += arguments[i];
    }
    return total;
  }

  var add1 = sum.partial(1);
  var add12 = sum.partial(1,2);

  console.(sum(1,2) == 3, 'sum(1,2) malfunctioned => ' + sum(1,2));
  console.(sum(1,2,3,4,5,6,7,8,9,10) == 55, 'sum(1...10) malfunctioned => ' + sum(1,2,3,4,5,6,7,8,9,10));
  console.(add1() === 1, 'add1 malfunctioned => ' + add1());
  console.(add1(3) === 4, 'add1 malfunctioned => ' + add1(3));
  console.(add12(1,2) === 6, 'add12 malfunctioned => ' + add12(1,2));
})();

// 5.13 함수를 위한 memoization 메서드
Function.prototype.memoized = function(key) {
  this._values = this._values || {}; // __values가 없으면 새로운 객체를 생성한다.
  return this._values[key] || (this._values[key] = this.apply(this, arguments));
};

function isPrime(num) {
  var prime = num != 1;
  for(var i = 2; i < num; i++) {
    if(num%i == 0) {
      prime = false;
      break;
    }
    return prime;
  }
}

console.(isPrime.memoized(5), '함수는 동작하지 않고 5는 소수가 아님.');
console.(isPrime._values[5], '결과가 캐싱됨.');

  
// 5.14 클로저를 이용한 메모이징(memoizing) 함수 기법
(function() {
  'use strict';

  Function.prototype.memoized = function(key) {
    this._values = this._values || {};
    return this._values[key] || (this._values[key] = this.apply(this, arguments));
  };

  Function.prototype.memoize = function() {
    var fn = this;
    return function() {
      return fn.memoized.apply(fn, arguments);
    };
  };

  var isPrime = (function(num) {
    if(num == 1)
      return false;

    var result = true;
    for(let i = 2; i < num; i++) {
      if(num%i == 0) {
        result = false;
        break;
      }
    }
    return result;
  }).memoize();

  console.(!isPrime(1), '1은 소수가 아니다');
  console.(isPrime(2), '2는 소수');
  console.(isPrime(3), '3은 소수');
  console.(!isPrime(4), '4는 소수가 아니다');
  console.(isPrime(5), '5는 소수');
  console.(!isPrime(6), '6은 소수가 아니다');
})();

  
// 5.15 새로운 기능을 추가하기 위해 이전 함수 래핑하기
(function() {
  'use strict';

  // 객체의 나이(age)가 0 이하인 경우 오류가 나는 메서드
  function getAge() {
    if(this.age <= 0) {
      throw new Error('Is he or she a witch?');
    }
    this.age += 1;
    return this.age;
  }

  var elphaba = {age: -30, grow: getAge};
  var glinda = {age: 30, grow: getAge};

  console.(glinda.grow() == 31, 'glinda is a witch!');
  // console.(elphaba.grow() == -29, 'elphaba is a witch!'); // 테스트는 실패한다.

  function wrap(object, method, wrapper) {
    var fn = object[method];

    return object[method] = function() {
      return wrapper.apply(this, [fn.bind(this)].concat(Array.prototype.slice.call(arguments)));
    };
  }

  if(elphaba.age < 0) {
    wrap(elphaba, 'grow', function(original) {
      return this.age < 0 ? this.age = 0 : original();
    })
  }
  console.(elphaba.grow() == 0, 'elphaba is a witch!');
  elphaba.age = 1;
  console.(elphaba.grow() == 2, 'elphaba is a witch!');
  console.(elphaba.grow() == 3, 'elphaba is a witch!');

  elphaba.age = -1;
  console.(elphaba.grow() == 0, 'elphaba is a witch!');
})();


// 5.17 클로저내의 반복자가 예상한 대로 동작하지 않는 코드
(function() {
  'use strict';

  var array = [{}, {}];

  for(var i = 0; i < array.length; i++) {
    array[i].execute = function() {
      return 'div #' + i + ' was clicked.';
    };
  }

  // console.(array[0].execute() === 'div #0 was clicked.', '<> div #0 was clicked.')
  // console.(array[1].execute() === 'div #1 was clicked.', '<> div #0 was clicked.')
})();

// 5.18 즉시실행함수를 이용해서 반복자를 제대로 다루기
(function() {
  'use strict';

  var array = [{}, {}];

  for(var i = 0; i < array.length; i++) {
    (function(n){
      array[n].execute = function() {
        return 'div #' + n + ' was clicked.';
      };
    })(i);

  }

  console.(array[0].execute() === 'div #0 was clicked.', '<> div #0 was clicked.')
  console.(array[1].execute() === 'div #1 was clicked.', '<> div #0 was clicked.')
})();
