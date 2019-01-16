# Null 안정성

> The billion dollor mistake

값이 아무것도 대입되지 않은 상태

## null 허용과 불허

## Null 확인 연산자 `?.`

```kotlin
val foo: String? = "hello"
var length: Int? = if(foo != null) {
    foo.length
} else {
    null
}
```
```kotlin
val foo: String? = "hello"
var length: Int? = foo?.length
println(length)

val bar: String? = null
var length: Int? = bar?.length
println(length)
```

## 엘비스 연산자 `?:`

Null인 경우에 처리를 명시

```kotlin
val foo = "hello"

var length: Int = if(foo != null) {
    foo.length
} else {
    -1
}
```


## 예외 발생 연산자 `!!`

* Null인 경우 Exception을 발생시키기 위한 연산자
* Java와 함께 사용할때

## 안전한 캐스팅 `as?`

* `as` 연산자 이용시 `ClassCastException` 발생
* `as?` 연산자는 null 리턴

# 예외처리

* `try` - `catch` - `final` 구문으로 예외 처리
* `try` - `catch` 구문의 마지막 표현식은 반환 값으로 사용
* `throw`는 표현식
* Java의 `throws` 예약어가 코틀린에선 없음
  * 이게 꼭 필요한가?