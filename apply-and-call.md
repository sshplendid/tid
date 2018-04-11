# apply, call and this

`call`, `apply` 메서드는 함수가 실행될 때 전달되는 `this`와 `arguments` 매개변수를 직접 설정할 수 있게 해준다.

## 왜 필요한가?
함수는 실행되는 환경, 함수 컨텍스트에 따라서 전달되는 `this`가 달라진다.

  * 최상위 함수: `window`
  * 객체의 메서드: 메서드를 소유한 객체
  * 생성자: 새로 생성된 객체 인스턴스

동일한 함수라도 실행되는 환경에 따라 달라지기 때문에 `call`, `apply`를 통해서 **원하는 값을 명시적으로 설정** 하고 싶을 때 사용할 수 있다.


## 둘의 차이는?
  * apply: `arguments`를 array로 전달한다. `Math.max.apply(Math, [1,2,3]);`
  * call: `arguments`를 인자로 전달한다. `Math.max.apply(Math, 1, 2, 3);`


## 예제 - 함수 컨텍스트에 따른 this

컨텍스트에 따라 함수의 실행결과가 달라진다.

```html
...
<body>
  <a onclick="setBackgroundGreen.call(this);">앵커</a>
  <button onclick="setBackgroundGreen();">버튼</button>
  <button id="button2">버튼2</button>

  <script>
	function setBackgroundGreen() {
	  if(this instanceof HTMLElement)
	    this.style.backgroundColor = 'green';
	  else
	  	console.error('this is not an element! ' + this);
	}

	document.querySelector('#button2').onclick = setBackgroundGreen;
</script>
</body>
...
```
