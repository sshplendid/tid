# 코틀린 프로그래밍 1일차

## 강사 소개

강성윤  
kkang104@gmail.com  
http://70.12.113.190:8080

## 왜 코틀린을 써야하는가

* Mobile App 개발
  * iOS: Objective C, Swift
  * Android: Java, Kotlin
* Java의 문제
  * 비교적 구형 문법
  * 유지보수 불편함

2017 Google I/O에서 **안드로이드 공식 언어**로 발표
> Android first class language

## 특징

* Java 100% 호환
* JVM 기반 언어(Run everywhere)
* Java/Kotlin 혼용 가능
* 개발 생산성: Java 10줄짜리 코드가 코틀린 2줄로...
* 함수형 프로그래밍, Null safety 등 언어 트렌드 지원
* 크로스 플랫폼 개발
  * Server-side 개발 가능(Spring 5부터 코틀린 지원)
  * Kotlin.js: 브라우져 개발
  * Kotlin/Native (v1.3부터): 크로스 플랫폼 개발 가능
* Google의 지원

## 개발환경

* intelliJ
* Android studio
* Java 1.8
* Gradle

## 코틀린 기본

### 특징

* `static` 예약어가 없다. Top-level에 선언하면 됨.
* 클래스 선언 없이 함수, 변수를 사용 가능
* 세미콜론(`;`)을 강제하지 않는다. (`enum` class 선언 제외)

### 코틀린 파일 정의

* 확장자는 *.kt
* 파일과 클래스를 구분

```java
class Student {
    int id;
    void getId() {
        return this.id;
    }
}
```

```kotlin
class Student {
    var id: int = 10
    fun getId() {
        ...
    }
}
```

클래스 없이 변수, 함수 단독으로 정의 가능하다.  
> 코틀린은 변수, 함수도 Top-level에 선언할 수 있다.  
함수 내 함수, 클래스도 선언 가능하다.  
Java의 경우, class만 Top-level에 선언할 수 있다.

```kotlin
package com.example.student

import java.util.*

var sum = 0

fun calSum() {
    for (i in 1..10) {
        sum += i
    }
}

class student {

    var id: int = 10

    fun getId() {
        id
    }
    
    fun hello() {
        println("hello")
    }
}

fun main(args: Array<String>) {
    calSum()
    println(sum)
    user
}
```

### 패키지

* 다른 패키지의 함수나 변수를 import하려면? 직접 import해서 사용하면 됨

```kotlin
package com.example.two

val threeVal = 10
fun threeFun() {

}
```

```kotlin
package com.example.one

import com.example.two.threeVal
import com.example.two.threeFun

...
```

* 가상패키지: 실제 위치와 다른 패키지명을 사용할 수 있다.

파일구조
```plain
src
└─one
  └─file.kt
```

```kotlin
package my.package

...
```

* 이름 변경해서 임포트할 수 있다.

```kotlin
import java.util.Date as MyDate
```

#### 기본 패키지

```plain
java.lang.*
kotlin.*
kotlin.io.*
kotlin.collections.*
...
```

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

### 기본 데이터 타입

* 숫자 타입
  * `char` 타입을 숫자로 인식하지 않음
  * 모든 숫자 타입 클래스는 `Number` 타입의 서브클래스이다
  * 자동 형변형을 지원하지 않음
  * 숫자 타입 데이터의 가독성을 위해서 underscore(`_`) 사용 가능.  
  `val positive: Int = 1_000_000`
* 문자열
  * 스트링 템플릿 리터럴 지원
    ```kotlin
    val name = "John"
    val greeting = "hello ${name}"
    ```
  * raw string 지원  
    ```kotlin
    val greeting = """hello
    world"""
    ```
* `Any` 타입: 코틀린의 최상위 클래스(Java `Object` 보다 상위 클래스)
    ```kotlin
    // Type check
    fun getLength(obj: Any): Int {
        if(obj is String) {
            return obj.length // `length`는 String의 property, `is` 타입체크가 true일 경우, String 타입으로 스마트 캐스팅
        }
        return 0
    }
    ```

    ```kotlin
    // switch 보다 기능이 많은 when
    fun cases(obj: Any): String {
        when(obj) {
            1 -> return "One"
            "Hello" -> return "Greeting"
            is Long -> return "Long"
        }
    }
* `Null` 허용 타입
    ```kotlin
    val a: Int = null  // error
    val b: Int? = null // OK

    fun parseInt(str: String): Int {
        return str.toIntOrNull()
    }
    ```
* `Any?` <- `Any`
  * `is`, `as`
    ```kotlin
    val myVal1: Any = 10
    val myVal2: Any? = myVal1

    ```

* `Unit` & `Noting`: 제네릭의 타입 명시를 위해서
  * Unit: 명시적인 리턴이 없다.
  * Nothing: 의미있는 리턴이 아니다, 코틀린의 최하위 클래스
  * Unit은 타입 클래스
      ```kotlin
      // OK
      fun myFun(): Unit {
          return Unit()
      }
      ```
  * Nothing: 함수의 리턴타입?
      ```kotlin
      // OK
      fun myFun(): Nothing {
          throw Exception()
      }
      ```
* 타입 확인과 캐스팅
  * 타입 체크를 위해 `is` 예약어 이용
  * 타입 체크결과가 `true`이면 **스마트 캐스팅**
  ```kotlin
  var a1: Int = 10
  var a2: Double = a1 // !error
  var a3: Double = a1.toDouble() // OK
  ```
* 배열: 배열도 클래스(`Array`)이다.
  ```kotlin
  fun main(args: Array<String>) {
      var array = arrayOf(1, "Shawn", true) // Array<Any>
      array[0] = 10
      array[2] = "hello"

      println("size: ${array.size}.. ${array[0]}, ${array.get(1)}, ${array.get(3)})
  }
  ```
* 컬렉션
  * mutable 클래스와 immutable 클래스로 구분
  