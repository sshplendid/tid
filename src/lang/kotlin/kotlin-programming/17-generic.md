# 제네릭

* 제네릭은 형식타입
* 타입을 예측할 수 없거나
* 하나의 타입으로 고정할 수 없거나
* 제네릭으로 형식 타입을 선언하고 실제 사용할 때 정확한 타입 부여
* 타입 유추에 의해 이용 가능

## 선언 및 이용

```kotlin
class MyClass<T> {
    var foo: T? = null
}

fun <T> bar(arg: T): T? {
    ...
}
```

## 타입 제약

* 제네릭을 선언하면서 특정 타입만 대입되도록 제약

```kotlin
class MathUtil<T: Number> {
    fun plus(a: T, b: T): Double {
        return a.toDouble() + b.toDouble()
    }
}
```

여러 타입의 제약도 가능하다

```kotlin
interface foo
interface bar

class MyClass1: Foo, Bar
class MyClass2: Foo

class MyClass<T> where T: Foo, T: Bar {
    // ...
}

fun main(args: Array<String>) {
    var obj = MyClass<MyClass1>() // OK
    var obj1 = MyClass<MyClass2>() // error
}
```

## Null 불허 제약

* 제네릭의 형식타입은 기본적으로 Nullable
  * 기본적으로 `<T: Any?>`로 선언한 것과 같음

## Variance

제네릭에서 variance(공변)는 상하위관계에서 타입 변형과 관련되어 있다.

* 제네릭은 타입이지 클래스가 아니다: invariance
* 기본적으로 invariance(불공변)
* 공변을 지원하기 위해 `out`과 `in` 어노테이션 필요
* out 어노테이션을 이ㅛㅇ하여 하위 타입으로 선언된 객체를 상위 타입에 대입

```kotlin
open class Super

class Sub: Super()

class Foo<T>

fun testVariance() {
    Super obj = Sub() // OK, variance
}

fun testInvariance() {
    val obj = Foo<Sub>()

    val obj2: Foo<Super> = obj // error, invariance
}
```

```kotlin
open class Super

class Sub: Super()

class Foo<out T> // 하위타입으로 선언된 객체를 상위 타입에 대입

fun testVariance() {
    Super obj = Sub() // OK, variance
}

fun testInvariance() {
    val obj = Foo<Sub>()
    val obj1 = Foo<Super>()

    val obj2: Foo<Super> = obj // OK
    val obj3: Foo<Sub> = obj1 // error
}
```

### `out` 어노테이션을 사용하는 규칙

* 하위 제네릭 타입이 상위 제네릭 타입에 대입 가능
* 상위 제네릭 타입이 하위 제네릭 타입에 대입 불가능
* 함수 리턴 타입으로 선언 가능
* 함수 매개변수 타입으로 선언 불가능
* `val` 프로퍼티에 선언 가능
* `var` 프로퍼티에 선언 불가능

> Covariance

### `in` 어노테이션

상위 제네릭 타입이 하위 제네릭 타입에 대입되어 사용

* 하위 제네릭 타입이 상위 제네릭 타입에 대입 불가능
* 상위 제네릭 타입이 하위 제네릭 타입에 대입 가능
* 함수 리턴 타입으로 선언 불가
* 함수 매개변수 타입으로 선언 가능
* `val`, `var` 프로퍼티에 선언 불가

|특징|in|out|
|---|---|---|
|하위->상위 대입|x|o|
|상위->하위 대입|o|x|
|함수 리턴타입|x|o|
|함수 매개변수 타입|o|x|
|`val`프로퍼티 사용|x|o|
|`var`프로퍼티 사용|x|x|


### 이용측 variance

실제 제네릭을 사용하는 곳에서 in, out을 사용할 ㅅ ㅜ있다.

## 스타(*) 프로젝션

* 제네릭 타입을 `<*>`로 표현하는 것을 의미
* 선언위치에선 불가, 사용위치에서만 가능
* 제네릭 타입을 모른다는 의미
* `<Any?>`는 정확한 타입을 명시한 것이고, `<*>`은 타입을 모른다는 것

### 제네릭과 `as`, `is`

* 제네릭 정보는 컴파일러를 위한 정보
* 컴파일이 끝나면 제네릭 정보는 모두 사라짐
* 런타임 시에 타입 체크 or 타입 캐스팅이 유지되어야 하는 상황이라면?

#### 인라인 함수와 `reinfied` 이용

* 제네릭 타입을 런타임까지 유지

## `Unit` 타입

* Java의 `void`와 유사하지만
* `void`는 예약어
* `Unit`은 객체 타입

```kotlin
fun foo() {
    return Unit // OK
}

val bar: Unit = Unit
```

### 제네릭에서의 `Unit` 이용

* 상위 타입의 구현 함수의 리턴타입을 사용하지 않고 싶으면? Unit을 사용

```kotlin
interface Foo<T> {
   fun some(): T 
}
```


## `Nothing` 타입

* Nothing 타입이 선언되면 null만 대입
* 값이 없다는 것을 명시적으로 표현
  * Null이나 Exception 리턴할 때

### 제네릭에서의 `Nothing` 이용

* Nothing의 코틀린의 **최하위 타입**이다.
* 어떤 타입의 프로퍼티에도 대입 가능
  * `in`(반공변)을 사용할 때 사용
