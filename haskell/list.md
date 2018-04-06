# 리스트와 튜플

리스트와 튜플은 여러 값을 조작하는 근본적인 수단이다. 여러 값을 하나의 값으로 묶는다.

## 리스트

```haskell
let numbers = [1, 2, 3]
let booleans = [True, False, True]
let strings = ["Hello ", "world!"]
let characters = ['h', 'e', 'l', 'l', 'o']
```

괄호는 리스트의 범위를 제한하고, 각 원소는 쉼표로 구분된다. 중요한 점은 **리스트 내의 모든 원소는 타입이 같아야 한다.** 타입이 혼재된 리스트를 정의하려고 시도하면 타입오류가 발생한다.


```haskell
Prelude> 1:True:[]

<interactive>:7:1: error:
    ? No instance for (Num Bool) arising from the literal ▒▒1▒▒
    ? In the first argument of ▒▒(:)▒▒, namely ▒▒1▒▒
      In the expression: 1 : True : []
      In an equation for ▒▒it▒▒: it = 1 : True : []ㅇ
```

### 컨싱(Consing)을 이용한 리스트 구축하기

리스트를 구축하는 방법은

  * 괄호와 쉼표를 이용해서 리스트 전체를 한 번에 기입
  * `(:)` 연산자를 이용한 컨싱 (consing)

두 가지 방법이 있다.

```haskell
Prelude> numbers = [1, 2, 3]
Prelude> 0:numbers -- 0 뒤에 numbers 리스트를 컨싱한다.
[0,1,2,3]
Prelude> (0-1):1:numbers -- 2개 이상의 원소를 컨싱하기
[-1,1,1,2,3]
```

컨싱을 가능케하는 연산자 `(:)`의 타입을 확인하면 아래와 같이 어떤 타입 `a`와 어떤 타입 `a`의 리스트 `[a]`, 두 인자로 새로운 리스트 `[a]`를 반환함을 알 수 있다. 즉 `element:list`의 패턴으로 새로운 리스트를 생성하는 것이다. 이 컨싱 연산자는 오른쪽에서 왼쪽으로 평가된다.

```haskell
Prelude> :t (:)
(:) :: a -> [a] -> [a]
```

이런 이유로 아래와 같은 구문은 에러가 발생한다. `(:)` 연산자의 두 번째 인자인 리스트가 없기 때문이다.

```haskell
Prelude> True:False

<interactive>:37:6: error:
    ? Couldn't match expected type ▒▒[Bool]▒▒ with actual type ▒▒Bool▒▒
    ? In the second argument of ▒▒(:)▒▒, namely ▒▒False▒▒
      In the expression: True : False
      In an equation for ▒▒it▒▒: it = True : False
```

컨싱의 과정을 순서대로 나열해봤다. 아래 명령은 모두 같은 결과를 반환한다.

```haskell
Prelude> 1:2:3:[]
[1,2,3]
Prelude> 1:2:(3:[])
[1,2,3]
Prelude> 1:(2:[3])
[1,2,3]
Prelude> 1:[2, 3]
[1,2,3]
```

#### 결론
  * 리스트의 원소는 타입이 같아야 한다.
  * 어떤 값을 리스트에 컨싱할 수 있다. 반대의 경우는 성립되지 않는다.

#### 연습문제

  1. `3:[True:False]`는 잘 동작하는가? 그 이유는? => 컨싱하려는 `3`은 리스트의 타입(Bool)과 다르기 때문에 에러가 발생한다.
  2. 리스트를 취해 (시작 부분에) 8을 cons하는 함수 cons8을 작성하라. 다음의 리스트들을 가지고 검정해볼 것.
    * `cons8 []` => [8]
    * `cons8 [1,2,3]` => [8,1,2,3]
    * `cons8 [True,False]` => 에러 발생
    * `let foo = cons8 [1,2,3]` => [8,1,2,3]
    * `cons8 foo` => [8,8,1,2,3]
  3. 위 함수를 수정하여 8을 리스트의 끝에 오도록 하라. => `const8 a = a ++ [8]`
  4. 인자 두 개, 리스트와 어떤 것을 취해 그 어떤 것을 리스트에 cons하는 함수를 작성하라. 이렇게 시작해야 한다. `let myCons list thing =` => `let myCons list thing = thing : list`

### 문자열(String)도 리스트이다

하스켈의 문자열은 문자들의 리스트이다. 이는 String 타입의 값을 다른 리스트처럼 조작할 수 있게 해준다.

```haskell
Prelude> ['h','e','y']
"hey"
Prelude>
Prelude> :t ['h']
['h'] :: [Char]
Prelude> :t "h"
"h" :: [Char]
Prelude> "h" == ['h']
True
Prelude>"hey" == ['h','e','y']
True
Prelude>"hey" == 'h':'e':'y':[]
True
```

### 리스트들의 리스트

리스트 타입의 값을 묶어 **리스트** 를 만들 수 있다. 아래의 예를 보자. 첫 번째와 두 번째 리스트의 원소는 리스트 타입이다.

```haskell
Prelude> [[1,2],[3],[4,5]]
[[1,2],[3],[4,5]]
Prelude> [[1,2]]++[[3]]
[[1,2],[3]]
Prelude> [1,2]++[3]
[1,2,3]
```
