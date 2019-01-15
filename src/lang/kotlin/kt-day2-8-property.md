# 프로퍼티

## property vs field

* 코틀린에서는 Top-level과 클래스의 변수를 **프로퍼티(property)** 라고 부름(함수 내부의 지역변수는 property가 아님)
* Java에선 field, Kotlin에선 property
* Property는 자체적으로 accessor(`getter`, `setter`)를 내장
* `var`로 선언하면 `get()` 추가
* `get`, `set` 내의 `field`(배킹 필드)는 프로퍼티에 저장된 값 자체를 지칭하는 예약어
* `val`의 경우, `get()`을 정의하였다면, **초기값을 명시하지 않아** 도 된다.
* 주 생성자의 `var`, `val`은 프로퍼티 커스터마이징이 불가능
  * 클래스 바디에 새로운 프로퍼티를 생성해서 커스터마이징
    ```kotlin
    class User(val name: String) {
        val myName = name
          get() = field
          set(Value) { field = value }
    }
    ```



기본 형태
```kotlin
val name: String = "Shawn"
    get() = field
    set(value) = { field = value }
```



>캡슐화  
>클래스의 멤버변수는 외부에서 접근을 못하게 해야한다.  
>`private` 접근자로 변수 접근을 제한하고 다른 방법(method)을 통해서 핸들링하자.

## 프로퍼티 초기화: 선언시 할당하지 않아도 되는 경우

### `init` 블록에서 초기화

```kotlin
class User {
    var name: String
    val id: Int

    init {
        name = "Shawn"
        id = 0
    }
}
```

### `Null` 허용으로 선언

```kotlin
class User {
    var name: String? = null
    var age: Int? = null

    constructor()
}
```

### 늦은 초기화(late init)

* `var`에서만 사용 가능하다
* 주 생성자에서 사용할 수 없다
* custom getter/setter를 사용하지 않은 프로퍼티에만 사용할 수 있다.
* `nullable` 프로퍼티에서 사용할 수 없다.
* 기초 타입에서 사용할 수 없다.
* **Dependency Injection 사용성 증대**
  * Nullable 없이 DI 사용 가능

```kotlin
class User {
    lateinit var lateAge: Int
}

fun main(args: Array<String>) {
    val user = User()
    user.lateAge = 10
    println(user.lateAge)
}
```

### 초기화 미루기(lazy)

* 프로퍼티를 이용할 때로 초기화를 미룬다
* lazy는 일종의 실행 영역
* `by lazy { }`로 선언
* 퍼포먼스 이슈가 있을 때 사용

```kotlin
val foo: String by lazy {
    println("lazy foo...")
    "hello"
}
```

## 프로퍼티 값 변경 감지

```kotlin
class User {
    var name: String by Delegates.observable("초기값", {props, old, new -> println("$old .. $new")})
}