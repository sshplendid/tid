# 변수와 함수

### 변수

* 변수 타입은 생략 가능하며, 초기값으로 **타입 추론**이 가능하다. 
* 변수는 `var` `val`로 시작해야 한다.
  * `var`: mutable
  * `val`: assign-once. immutable?
* Top-level, 클래스의 멤버 변수는 모두 초기화를 해야함.
  * 로컬 변수는 초기값을 지정하지 않아도 되지만, 기본으로 설정되진 않는다.
  * 코틀린에선 모든 것이 **객체**이다.
* Null safety: 변수 선언시 명시적(`?`)으로 *nullable*/ *non-nullable* 구분해야 함.

* `const` vs `val`
  * 값 변경은 불가
  * `val`은 property
    * getter/setter를 내장하고 있음 (커스터마이징 가능함)


* Java 스타일

```java
class student {
    int id;
    String name;
    void hello() {
        return "Hello, " + this.name;
    }
}
```

* Kotlin 스타일

```kotlin
a: Int = 10

class Student {
    val id: Int = 10
    val name: String = "John"

    void hello() {
        "hello $name"
    }
}
```

### 함수

* 매개변수는 기본으로 `val`
* 의미있는 반환값이 없을때는 `Unit`
* `Unit`은 생략할 수 있으며 리턴타입이 선언되지 않으면 기본적으로 적용
* Java의 `void`는 예약어, Kotlin의 `Unit`은 타입  
`val emptyValue: Unit = Unit()`으로 사용 가능
* Single expression function
* default argument: 인자가 없는 경우
* named argument: 연산자 오버로딩의 대안
* 중위표현식(infix): 연산자를 피연산자 중간에 위치시킨다
  * object 멤버함수만 가능
  * 매개변수 하나만 존재해야 함
* 가변인수
* 재귀함수: `tailrec` 예약어를 붙이면 효율적인 재귀함수를 만들 수 있다.
  * `tailrec` 예약어는 바이트코드로 변환시 반복문으로 변환한다.
  * 꼬리재귀함수의 경우에만 추가 가능

```kotlin
// 기본 함수 형태
fun sum(a: Int, b: Int): Int {
    return a + b
}
```

```kotlin
// Single expression function with return type
fun sum(a: Int, b: Int): Int = a + b
```

```kotlin
Single expression function without return type
fun sum(a: Int, b: Int) = a + b
```

```kotlin
// Default argument
fun hello(name: String = "John") {
    println("Hello, " + name)
}
```

```kotlin
// Default & Named argument
fun hello(name: String = "John", id: Int) {
    println("Hello, " + name)
}

...
fun main(args: Array<String>) {
    hello("Jane", 10);
    hello(no = 10, name = "Jane");
    hello(no = 10);
}
```

```kotlin
// 중위표현식

  // 함수 확장
infix fun Int.add(a: Int): Int {
    return 
}

```

```kotlin
// 가변인수
fun <T> printAll(a1: Int, vararg array: T) { // Array<Any>
    for(a in array) {
        println(a)
    }
}

fun main(args: Array<String>) {
    printAll(10, "Hello", "world")
    printAll(10, 20, false)
}
```