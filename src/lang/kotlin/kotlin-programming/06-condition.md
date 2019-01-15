# 조건문

## `if` 표현식

> #### expression vs statement
> statement: 문장이 실행됐을 때 결과값이 발생하지 않음  
> expression: 결과값이 발생함

* Java의 `if`는 statement, Kotlin의 `if`는 표현식
  * if 표현식의 결과를 할당 가능함
    ```kotlin
    val number = 5
    var isEven = if(number%2 == 0) {
        true
    } else {
        false
    }
    ```
  * `if` 표현식을 변수에 할당하려면 `else`문을 꼭 정의해야 한다.
    ```kotlin
    var isEven = if(number%2 == 0) true // [!] error
    ```

## `when` 표현식

* `in`: 범위 지정
  ```kotlin
  val data = 15
  when(data) {
      !in 1..100 -> println("invalid data")
      in 1..10 -> println("1 <= data <= 10")
      in 11..20 -> println("11 <= data <= 20")
  }
  ```
* 다양한 타입의 데이터에 대한 조건 지원
  ```kotlin
  fun testWhen(data: Any) {
      when(data) {
          1 -> println("data is 1")
          "hello" -> println("data value is 'hello'")
          is Boolean -> println("data value is Boolean")
      }
  }
  ```
* `if`-`else` 대체용
  ```kotlin
  val data = 10
  when {
      data <= 10 -> println("data <= 10")
      else -> println("none")
  }
  ```
* 표현식
  ```kotlin
  val data = 3
  val result = when(data) {
      1 -> "result is 1"
      2 -> "result is 2"
      else -> "out of range"
  }
  ```

## `for` 반복문

* `in` 연산자를 사용, 전통적인 `for(초기값;반복조건;증감) {}` 문법은 지원하지 않는다.
  ```kotlin
  ```
* index 값을 획득하고자 한다면 `indices`를 이용
  ```kotlin
  val list = arrayOf(1, 2, 3)
  for(i in list.indices) {
      println(list[i])
  }
  ```
* index와 값을 함께 받고 싶으면 `withIndex()`를 이용
  ```kotlin
  val list = listOf(1, 2, 3)
  for((index, value) in list.withIndx()) {
      println("the element at $index is $value)
  }
  ```
* 반복 조건
  * `for(i in 1..100) { }`: 1 <= x <= 100
  * `for(i in 1 until 100) { }`: 1<= x **<** 100
  * `for(i in 1 step 100) { }`: ?
  * `for(i in 1 down to 100) { }`: ?

## `while` 반복문: Java와 차이가 없음

## `break`, `continue` 그리고 `label`

* `label`의 사용방법
  ```kotlin
  aaa@ for(i in 1..3) {
      for(j in 1..3) {
          if(j > 1) break@aaa
          println("i: $i, j: $j")
      }
  }
  ```

## 연산자

* **\*** 연산자: **배열**(not list)의 원소 나열, 가변인수의 함수를 호출할때 사용하면 편함
  ```kotlin
  val asis = arrayOf(10, 20, 30)
  val list = asList(1, 2, asis[0], asis[1], asis[3], 100, 200)
  ```
  ```kotlin
  val asis = arrayOf(10, 20, 30)
  val list = asList(1, 2, *asis, 100, 200)
  ```
* `==` vs `===`
  * `==`: 값
  * `===`: 레퍼런스
* Integer 타입은 -128 ~ 127까지 캐싱
* `Null` 안전 관련 연산자
  * `?`: 
  * `?:`
  * `?.`
  * `!!`
* 연산자 재정의 가능


