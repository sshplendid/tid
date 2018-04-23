// 5.1 간단한 클로저
(function() {
  var outerValue = 'Ninja';

  function outerFunction() {
    console.assert(outerValue == 'Ninja', 'I can\'t see the ninja!');
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
      console.assert(outerValue, 'I can\'t see the ninja!');
      console.assert(innerValue, 'I can\'t see the Samurai!');
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
      console.assert(outerValue, `Inner can't see the ninja!`);
      console.assert(innerValue, `Inner can't see the samurai!`);
      console.assert(params, `Inner can't see the wakizashi!`);
      console.assert(tooLate, `Inner can't see the ronin!`);
    }

    later = innerFunction;
  }
  console.assert(!tooLate, `Inner can see the ronin!`);

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

  console.assert(ninja.getFeints() == 1, '생성자 내부에 있는 feints 변수의 값을 얻을 수 있다.');
  console.assert(ninja.feints === undefined, '하지만 변수에 접근할 수는 없다.');
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
      console.assert(button.clicked, '버튼이 클릭되지 않음!'); // 테스트는 실패한다.
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
      console.assert(button.clicked, '버튼이 클릭되지 않음!'); // 테스트는 한다.
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
  var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift();
  console.log(args);
  console.log(args.concat(Array.prototype.slice.call(arguments)));
  return function() {
    return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
  };
};

var myObject = {};
function myFunction() {
  return this === myObject;
}

console.assert(!myFunction(), '콘텍스트가 아직 설정되지 않음');

var aFunction = myFunction.bind(myObject);
console.assert(aFunction(), '콘텍스트가 설정됨');
  
