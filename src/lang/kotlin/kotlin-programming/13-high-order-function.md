# 고차함수 (high-order function)

함수의 매개변수로 함수를 전달받거나, 리턴할 수 있는 함수


```kotlin
fun foo
```

## 함수타입 매개변수

## 함수 반환

## 익명함수

## 코틀린 API의 고차함수

### `run()`

* 람다함수를 실행하고 그 결과값을 획득
* 객체의 멤버에 접근
  * 반복적으로 인스턴스명을 입력하지 않아도 된다?
    ```kotlin
    val user = User()
    val runResult = user.run {
        name = "Kim"
        age = 10
        true
    }
    ```

### `apply()`

* 대입한 객체를 다시 리턴받음

### `let()`

* `let`을 이용하는 객체를 매개변수로 전달

### `with()`

* 객체를 매개변수로 전달받아 멤버들에 접근

## 인라인 함수

* 고차함수의 런타임 시, 성능이슈 문제 (JVM)
* `inline` 예약어를 함수 선언 앞에 추가하면 컴파일 단계에서 정적으로 포함


고차함수를 컴파일 할 때 
```kotlin
fun foo(calc: (a: Int, b: Int) -> Int) {
    calc(10, 20)
}

fun main(args: Array<String>) {
    foo { x, y -> x + y }
}
```

```java
// Java decompile
// 성능이슈 발생
public final class Ch12Kt {
   public static final void foo(@NotNull Function2 calc) {
      Intrinsics.checkParameterIsNotNull(calc, "calc");
      calc.invoke(10, 20);
   }

   public static final void main(@NotNull String[] args) {
      Intrinsics.checkParameterIsNotNull(args, "args");
      foo((Function2)null.INSTANCE);
   }
}
```

### `noinline`

`noinline` 예약어로 inline에 포함하지 않아도 되는 매개변수를 명시적으로 선언

### 논 로컬 반환

* 


### `crossinline`

### `label`을 통한 람다함수 반환

* 임의의 label로 람다함수 반환이 가능
* 하지만 고차함수 이름으로도 반환 가능
  * 모든 고차함수는 고차함수 이름으로 label이 지정되어 있음

