# 상속

## `Any` 클래스

* 코틀린의 최상위클래스
* 모든 코틀린의 클래스는 Any의 서브클래스이다.

## 상속을 통한 클래스 정의

* 코틀린의 모든 클래스는 기본적으로 `final`
* `open` 예약어로 선언한 클래스만 상속 가능하다
* `extends` 예약어가 없음, 콜론(`:`)으로 상속관계를 표현

```kotlin
class Rect: Shape() {
    var width: Int = 0
        set(value) {
            if(value < 0) field = 0
            else field = value
        }
    var height: Int = 0
        set(value) {
            if(value < 0) field = 0
            else field = value
        }
}
```

## 오버라이드

### 함수

* 함수를 선언하면 기본적으로 final
* 함수 오버라이드를 허용하려면 `open`으로 명시
* `override` 예약어로 상위 함수 재정의한 것을 명시
  * `override`된 함수는 자동으로 `open` 상태이다

### 프로퍼티

* 프로퍼티는 기본적으로 `final`
* 상위 클래스의 프로퍼티와 이름, 타입이 동일함
* 규칙
  * 상위 `val`로 선언된 프로퍼티 -> 하위에서 `val`, `var` 재정의 가능
  * 상위 `var` 선언 프로퍼티는 -> 하위에서 `var` 재정의 가능, `val` 불가
  * 상위 Nullable 선언 -> 하위 Non-nullable로 재정의 가능
  * 상위 Non-nullable 선언 -> 하위 Nullable 재정의 불가

### 생성자

* 주 생성자가 선언되어 있다면 보조 생성자에선 주 생성자와 연결하기 위한 `this()` 구문이 추가되어야 함
* 객체 생성시, 어떤 식으로든 상위 클래스의 생성자가 호출되어야 함
* 생성자 수행흐름
  1. `this()` or `super()`
  1. `init` 블록 실행
  1. 생성자 블록 실행

## 캐스팅

* 기초 데이터 타입은 자동 형변환 안되고 함수에 의해서 변환 가능

### 스마트 캐스팅

* `is` 예약어 이용 시: is 연산 결과가 true이면 타입 변환
* 하위 -> 상위 타입으로: 암시적 캐스팅
* `as`를 이용한 캐스팅: 상위 -> 하위로 변환할 때

## 접근제한자

* `public`, `internal`, `protected`, `private`
* `public`: 접근제한자 명시가 없으면 기본으로 적용
* `protected`: top-level에서 사용 불가
* `private`: 동일 **file** 내에서만 사용 가능
* `internal`: 동일 모듈 내에서 사용 가능

### 프로퍼티 접근제한자

* `get()`: 프로퍼티 접근 제한자와 항상 동일하게 적용
* `set()`: 프로퍼티 접근제한자보다 범위를 넓혀서 설정할 수 없다.


### 상속과 접근제한

* `open`과 `private`은 같이 사용할 수 없음
* 하위 클래스에서 상위 멤버를 `override` 할 때 접근범위를 줄일 수 없음
