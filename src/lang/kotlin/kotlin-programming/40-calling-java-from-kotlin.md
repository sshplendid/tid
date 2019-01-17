# Calling Java with Kotlin

## Java API를 코틀린에서 사용 가능한가?

> 얼마든지

```java
// Java
public class Foo {
    void bar() {
        /...
    }
}
```

```kotlin
// Kotlin
val obj = Foo()
obj.bar
```


Object, Collections, primitive type 등은 코틀린에서 API 제공하기 때문에 Kotlin API 사용을 권장한다.

```kotlin
// kotlin
val obj: java.lang.Object = Object()
```

## 자바의 타입을 어떻게 매핑할까

* 코틀린에서는 모든 것이 객체
* 코틀린의 타입은 nullable, non-nullable로 구분

### primitive type

자바의 기초타입은 null을 대입할 수 없다. 그래서 모틀린에서는 non-nullable로 매핑된다.

|Java|Kotlin|
|---|---|
|int|kotlin.Int|

#### Boxed-primitive type

Boxing된 primitive type은 객체이기 때문에 null 대입 가능, 그러므로 platform type으로 매핑한다.

|Java|Kotlin|
|---|---|
|java.lang.Integer|kotlin.Int!|

> #### Platform type?  
> 개발자가 명시적으로 선언할 수 있는 타입은 아니다.
> nullablity 정보가 없는 타입을 지칭한다.
> null 가능성에 대해 아무 정보가 없기 때문에 NPE 가능성이 높아진다.
> 개발자가 대응해야 한다.

### Non-primitive type

|Java|Kotlin|
|---|---|
|java.lang.Object|kotlin.Any!|
|java.lang.String|kotlin.String!|

### Collection type

코틀린에선 mutable/imumutable 타입으로 구분한다.

* 기본적으로 platform type으로 처리
* 기본적으로 mutable로 처리

### Array

|Java|Kotlin|
|---|---|
|int[]|IntArray!|
|String[]|Array<(out) STring>!|

## Null Safety

### `@Nullable`, `@NotNull` 어노테이션이 추가된 경우

* `@Nullable`이 있으면 Nullable로 유추
* `@NotNull`이 있으면 non-nullable로 유추

## Getter/Setter

코틀린에서는 변수는 프로퍼티(not field)이다.
자바의 getter/setter도 프로퍼티로 이용 가능하다.

* 프로퍼티 변환은 편의성 증대를 위해서,
* 게터 세터를 직접 호출할 수 있다.

## return `void`

Unit 타입으로 변환한다.

```java
// java
class Foo {
    public void bar() {
        // ...
    }
}
```

```kotlin
// kotlin
val obj = Foo()
val result: Unit = obj.bar()
```

## 이스케이프

## Java 배열 사용하기

코틀린의 배열은 invariant하다. 즉 `Array<Any>`에 `Array<String>`을 할당할 수 없다.

자바의 `Integer[]`를 `Array<Int>`로 사용하는데 없다. variant 문제 발생하지 않음

`int[]`를 `Array<Int>`로 표현 불가, primitive 타입.

## `vararg`

문법적인 차이,

## operator

자바 메서드를 연산자 재정의해서 호출 가능하다.

## checked exception

코틀린에선 이 개념이 없다. 

## `Object` 메서드

`Any`는 JVM만을 위한 타입이 아니다. (JS, Native...)

### wait() / notify()

Object로 캐스팅해서 사용

### getClass()

`::class.java`로 사용


## static member

## final variable

val로 적용

## 초기화되지 않은 클래스 멤버 이용

런타임시 에러 발생 가능성 있음

## 자바 클래스 확장

가능하다.