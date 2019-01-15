# 추상클래스

## 선언

```kotlin
abstract class Super {
    val no: Int = 10
    abstract val message: String

    fun foo() {
        println("abstract foo... $no")
    }

    abstract fun bar()
}

class Sub: Super() {
    override val message: String = "hello"
    override fun bar() {
        println("sub bar... ${message}")
    }
}
```


# 인터페이스

* 객체 생성 불가
* 추상 함수 선언이 주 목적 (has-a)
* 함수 기능 구현 가능(is-a...?)

```kotlin
interface Walkable {
    var numberOfLegs: Int

    fun walk();
    fun getShoes(): String { // 함수 구현 가능
        return "Nike"
    }
}

interface Eatable {
   fun eat(food: String)
}

class Animal {
    
}
class Human: Walkable, Animal(), Eatable { // 인터페이스는 생성자를 호출하지 않는다.
    override fun walk() {
        println("human is walking...")
    }
    override fun eat(food: String) {
        println("human is eating ${food}...")
}
```

## 프로퍼티

* 인터페이스에 프로퍼티 추가 가능
* 추상형으로 선언되어 있거나, getter/setter를 정의해야 한다.
* 추상 프로퍼티가 아니라면 
  * `val`은 getter를 선언해야 한다.
  * `var`는 getter/setter를 선언해야 한다
* 인터페이스의 프로퍼티 getter/setter는 `field`를 사용할 수 없다.
  * 컴파일할 때, 인터페이스의 프로퍼티는 실제 필드로 정의하지 않는다.