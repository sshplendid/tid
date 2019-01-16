# 11. 다양한 클래스

## `data` 클래스

* Value Object, Data Trasfer Object, ...
* `data` 키워드로 선언
* 주 생성자가 선언되야 하며, 매개변수 하나 이상 선언해야 함
  * 주 생성자의 모든 매개변수는 `var`  혹은 `val`로 선언해야 함
* `abstract`, `open`, `sealed`, `inner` 등 키워드를 사용할 수 없음

```kotlin
data class User()       // error, 주 생성자에 매개변수가 없음
data class User2(name: String) // error, val이나 var로 매개변수 선언해야 함
data abstract class User3(val name: String) // error, abstract와 같은 키워드를 사용할 수 없음
data class User4(val name: String, no: Int) // error, 모든 매개변수는 var 혹은 val로 선언해야 함

data class User(Val name: String, val age: Int) // OK
```

### `equals()`

* 객체 비교가 아닌, 객체의 데이터 비교를 도와주는 함수이다.
* 동일한 클래스, 주 생성자에 선언된 프로퍼티만 비교

```kotlin
data class User(val name: String, val age: Int) {
    var email: String = "your@email.com"
}

fun main(args: Array<String>) {
    val shawn: User = User("Shawn", 30)
    val jane: User = User("Shawn", 30)
    jane.email = "jane@gmail.com"

    println("${shawn.equals(jane)}) // true
}
```

### `toString()`

* 데이터 클래스의 데이터를 문자열로 반환
  * 일반 클래스는 인스턴스의 주소값을 반환
  * 주 생성자의 프로퍼티만 반환

### `componentN()`

* 데이터 클래스 프로퍼티 값을 획득
* 비구조화 할당(destructing assignment)

```kotlin
data class User(val name: String, val age: Int)

fun main(args: Array<String>) {
    var user = User("Shawn", 30)

    println("name: ${user.component1()}") // Shawn
    println("age: ${user.component2()}") // 30

    val (name, age) = user // 비구조화 할당
}
```

### `copy()`

* 객체를 복사

## `enum` 클래스

* 열거형 타입
* `enum` 예약어로 생성
* `name`, `ordinal` 내장 프로퍼티가 존재

### 기본형태

```kotlin
enum class Direction {
    NORTH, SOUTH WEST, EAST
}

fun main(args: Array<String>) {
    val direction: Direction = Direction.NORTH
    println("${direction.name} ... ${direction.ordinal}")
}
```

### 개발자 임의 데이터 타입

```kotlin
enum class Direction(val no: Int) {
    NORTH(0), SOUTH(1), WEST(2), EAST(3)
}
```

### 익명 클래스 이용

* 각 원소는 enum 클래스의 서브타입
* 열거상수는 객체
* 이름 없는 클래스를 직접 정의
* enum 상수 영역과 클래스 바디영역을 구분하기 위해 세미콜론(`;`)을 사용해야 함

```kotlin
enum class Direction(val no: Int) {
    NORTH {
        override val bar: Int = 10
        override fun foo() { println("North foo...") }
    },
    SOUTH {
        override val bar: Int = 20
        override fun foo() { println("South foo...") }
    }; // <-- 세미콜론으로 구분
    absract val bar: Int
    abstract fun foo()
}
```

## `sealed` 클래스

* `sealed` 예약어로 선언
* enum 클래스와 유사함
* vs class: sealed class는 인스턴스 생성이 불가능
* vs abstract class
  * abstract: 어디에서나 선언 가능
  * sealed: sealed class가 선언된 그 file 내에서만 선언 가능
* 내가 선언한 클래스만 사용해라!

### `enum` vs `sealed`

* enum: data, function 추가 가능
  * enum class에서 정의한 data, function만...
  * 모든 enum 상수가 동일 변수, 함수를 가지고 있음
* sealed: 상수(하위 class) 별 다양한 변수, 함수 가능

### 기본 형태

```kotlin
sealed class Shape {
    class Circle(val radius: Double): Shape()
    class Rect(val width: Int, val height: Int): Shape()
}

class Triangle(val bottom: Int, val height: Int): Shape()
```

## Nested 클래스

* 특정 클래스 내에 선언된 클래스를 지칭 -> 예약어가 없다
* Outer 클래스의 멤버에 접근할 수 없다.
  * Nested 클래스에서 Outer 클래스의 멤버에 접근하려면 `inner` 클래스를 선언해야 한다.
    * inner 클래스는 외부에서 객체 생성이 불가
    * 외부에서 이용하려면 outer 클래스에서 인스턴스를 생성해줘야 함

## 클래스 별 특징

|특징|nested|`inner`|`object`|`companion object`|
|---|:---:|:---:|:---:|:---:|
|예약어|x|o|o|o|
|outer 멤버 접근|x|o|o|-|
|outer에서 접근|o|o|△<br/>`private`|-|
|외부 접근|o|x|x|-|
|타입|class|class|`Any`|-|