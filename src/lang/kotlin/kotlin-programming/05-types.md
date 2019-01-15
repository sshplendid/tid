# 기본 데이터 타입

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
  