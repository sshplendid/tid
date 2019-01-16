# 12 함수형 프로그래밍과 람다

## 함수형 프로그래밍의 정의

> 변수(할당) 없는 프로그래밍  

> 순수 함수로 정의되는 함수

* 순수함수는 Side-effect가 발생하지 않는다
* 함수 외부의 다른 값을 변경하지 않음
* 내부에서 별도의 I/O가 발생하지 않음
* 동일 입력 동일 출력

### 프로그래밍 패러다임

* 절차지향
  * 알고리즘과 로직 중심으로 문제 해결
* 객체지향 프로그래밍
  * 기능과 데이터를 묶어 객체를 만들고 조합하는 프로그래밍
* 함수형 프로그래밍
  * 함수의 선언과 선언된 함수의 유기적인 흐름

* 왜 함수형 프록래밍이 대두되는가
  * 복잡성 증가
  * 디버깅
  * 동시성 프로그래밍

## 함수형에서의 데이터

* 데이터는 변경되지 않으며 프로그램의 상태만 표현(immutable state data)
* 데이터는 변경하는 것이 아니라 새로운 데이터를 만들어 리턴

## 장점

* 간결한 코드 -> 유지보수성 증대
* 안전한 동시성 프로그래밍 -> **부수효과**가 없음

## 원칙

> 일급객체(First class citizen)

* 프로그램 top-level에 함수를 정의
* 모든 구성요소를 함수 안에 작성
* 함수를 변수처럼 이용

## 코틀린에서

### 다양한 구성요소를 포함

함수 내에 변수, class, 함수 등 모든 요소를 포함 가능

### 변수처럼 이용하는 함수

```kotlin
// 람다 표현식
val foo = { bar: Int ->
    println("hello world")
    bar + 10
}
foo(5)
```
```kotlin
// reflection
val foo = { bar: Int ->
    println("hello world")
    bar + 10
}

val bar = ::foo
```

# 람다 표현식

* 익명함수(anonymous function)
* 마지막 표현식을 리턴

```kotlin
fun sum(a: Int, b: Int): Int {
    return a + b
}
```
```kotlin
val sum = {a: Int, b: Int -> a + b }
```

## 즉시실행함수

```kotlin
{ println("hello") }()
run { println("hello") }
```

## 매개변수가 없는 람다함수

```kotlin
val foo = { -> 10 + 20 }
val bar = { 10 + 20 }
```

## 함수 타입

* 타입을 명시하면 파라미터 타입을 명시하지 않아도 됨

```kotlin
fun sum(a: Int, b: Int): Int {
    return a + b
}

val foo: (Int, Int) -> Int = { a: Int, b: Int -> a + b }
val bar: (Int, Int) -> Int = { a, b -> a + b }
```

### `typealias`를 이용한 타입 정의

```kotlin
typealias MyType = (Int) -> Boolean

val foo: MyType = { it > 10 }
```

## `it`을 이용한 매개변수 이용

* 매개변수가 하나인 경우, it으로 매개변수 지칭

```kotlin
val foo: (Int) -> Int = { x -> x + 2 }
val bar: (Int) -> Int = { it + 2 }

val bax = { it + 2 } // error, it의 타입이 명시되지 않아서
```

## 멤버 참조

* Member reference는 (`::`)로 표현

```kotlin
class User(val name: String, val age: Int)

val bar: (User) -> String = { u: User -> u.name }
val foo: (User) -> String = User::name
```