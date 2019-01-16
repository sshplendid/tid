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

