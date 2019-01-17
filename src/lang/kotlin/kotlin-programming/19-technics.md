# 19 다양한 기법

## Delegation, 위임 패턴

코틀린에선 위임을 `by` 예약어를 사용

* 인터페이스가 있어야됨
* 인터페이스를 구현한 delegatee가 존재
* delegator도 동일 인터페이스를 상속
  * 구현은 하지 않고 `by`로 표현

### Delegation property

* 프로퍼티 위임도 가능
* 위임을 위한 클래스는 `getValue()`와 `setvalue()`가 있어야 함
* 프로퍼티 `get()`에 의해 `getValue() 호출, `set()`에 의해 `setValue()` 호출

## SAM(Single Abstract Method) 전환

* 한개의 함수만 정의된 클래스를 구현해야 하는 경우, 람다표현식으로 짧게 작성 가능

## Type alias

* inner 타입도 정의 가능
