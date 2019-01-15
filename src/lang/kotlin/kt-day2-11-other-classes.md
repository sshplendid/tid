# 11. 다양한 클래스

## 데이터 클래스

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
