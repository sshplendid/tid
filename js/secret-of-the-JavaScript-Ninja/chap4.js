// 4 함수를 자유자재로 휘두르기



// 4.13 인자 목록 잘라내기
function multiMaxInvalid(val) {
    return val * Math.max.apply(Math, arguments.slice(1));
}

console.assert(multiMaxInvalid(3, 1, 2) == 6, '3 * max(1, 2) != 6'); // Uncaught TypeError: arguments.slice is not a function
// arguments는 '유사배열'이다. slick와 같은 Array API가 없기때문에 오류가 발생한다.

// 4.14 인자 목록 자르기 - 제대로!
function multiMax(val) {
    return val * Math.max.apply(Math, Array.prototype.slice.call(arguments, 1));
}

console.assert(multiMax(3, 1, 2) == 6, '3 * max(1, 2) != 6'); // 테스트 통과



// 4.15 메서드 오버로딩을 처리하는 함수
function addMethod(object, name, fn) {
  var oldFn = object[name];
  object[name] = function() {
    if(fn.length == arguments.length) {
      return fn.apply(this, arguments);
    } else if (typeof oldFn == 'function')
    return oldFn.apply(this, arguments);
  };
}

var ninja = {};
addMethod(ninja, 'fn', function(a, b) {console.log('a: ' + a + ', b: ' + b);});
addMethod(ninja, 'fn', function() {console.log('there is no arguments.');});
addMethod(ninja, 'fn', function(a) {console.log('a: ' + a);});
