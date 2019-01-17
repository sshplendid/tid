# 18 Reflection

런타임시 프로그램의 구조를 분석해내는 기법

## 클래스 타입과 레퍼런스

* 런타임 시 동적인 클래스 분석
* 클래스에 대한 정보를 클래스 reference, 클래스 reference가 대입되는 곳은 클래스 타입
* 클래스 타입은 `KClass<*>`로 표현하며, 클래스 reference는 `클래스명::class`로 표현

> 코틀린 리플렉션 타입에 Java 클래스를 넘길땐 `클래스명::class.java`로 표현

```kotlin
val foo: KClass<*> = String::class

fun bar(arg: KClass<*>) {
    // ...
}
```

### 클래스 정보 분석

* `val isAbstract: Boolean`: 클래스 reference가 abstract로 선언되었는가?

### 클래스 생성자 정보 분석

### 클래스 프로퍼티 분석

### 클래스 함수 분석

## 레퍼런스 분석

* 함수 레퍼런스는 `::함수명`을 이용
* 함수는 `KFunction<*>`으로 사용

### 고차함수 호출시 이용

```kotlin
fun isOdd(x: Int): Boolean = x%2 != 0
```

## 프로퍼티 레퍼런스 분석

* 타입은 `KProperty<*>`와 `KMutableProperty<*>`

## 어노테이션

* 몸통을 가질 수 없음
* 용도
  * 컴파일러에게 코드 문법에러를 체크: `@override`
  * 개발 툴이나 빌더에게 코드 자동 추가: Lombok(`@getter`, ...)
  * 실행시 특정 기능을 실행: `@Autowired`
* `annotation` 예약어로 만드렁진다
* 인스턴스 생성 불가
* 실행영역을 가질 수 없다

### 어노테이션 설정

#### 데이터 설정

* 주 생성자를 이용해 데이터 설정
* val만 허용
* 허용 타입
  * Primitive type
  * String
  * class 리플렉션 정보
  * enum, annotations, ... -> 개발자가 생성한 클래스를 제외하고

### 어노테이션 선언 옵션

* `@Target`: 어노테이션 허용 위치 설정
* `@Retention`: 런타임에 접근할 수 있는지, 
* `@Repeatable`: 한 곳에서 반복사용 가능여부
* `@MustBeDocumented`: api 문서에 포함시켜야 하는지

### 어노테이션 적용대상 지정

