# Calling Kotlin from Java

어노테이션을 열심히 붙이자!

## Property

## Top-level function / property

파일명+Kt 클래스의 스태틱 멤버

### 어노테이션을 이용해서 클래스명을 명명 가능

```kotlin
@file:JvmName("KotlinClass")
```

동일 패키지 내의 여러 파일을 동일 이름으로 지정하려면 `multiclass` 어쩌고를 등록해야 한다.

## 인스턴스 필드

코틀린 프로퍼티는 private 변수로 선언되지만 `@JvmField`를 붙이면 일반 필드로 선언된다,

## 함수명 바꿔서 공개

`@JvmName`으로 함수명을 바꿀수 있다. 코틀린에는 전혀 영향 없음

## overload 생성

코틀린에선 오버로드가 없다. default argument가 존재한다. 자바로 변환할땐 full signature로 공개한다. `@JvmOverloads`로 오버로드 가능

## checked exception

어노테이션 붙이자

## Null Safety

개발자 몫이다

## 확장함수

이건 애매
