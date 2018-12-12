# Mock Framework를 사용한 Test case 작성 - 잠실 Refactoring Meetup

## Overview

### 테스트의 목적

* 소프트웨어 테스트의 목적 => `돈`
  * 소프트웨어는 비즈니스에 악영향을 끼칠 수 있음
  * 나쁜 소프트웨어는 가장 비싼 이슈
  * 소프트웨어 품질 이슈가 있는 프로젝트는 동일 규모, 유형의 프로젝트보다 15% 많은 비용을 소모
  * 소프트웨어 품질은 모든 산업계의 이슈
  * 낮은 품질의 소프트웨어 개발은 테스트/유지보수 단계에서 많은 비용이 소모됨

### 테스트의 분류

* 유형별
  * White box test: 프로젝트 초반에 가능, 낮은 결함 검출율
  * Black box test: 프로젝트 후반에 가능, 높은 결함 검출율
* 단계별 분류 => 단계가 올라갈수록 문제 해결 비용이 더 많이 필요함
  1. Design Review
  2. Code Review, Code Inspection
  3. Unit Testing
  4. Integration Testing
  5. System Integration Testing
  6. User Accceptance Testing
  7. Operational Acceptance Testing

### 테스트 케이스의 정의

[How to write a good test case](https://wiki.openoffice.org/wiki/QA/Testcase/How_to_write_test_case)

> A set of test inputs, execution conditions, and expected results developed for a particular objective, such as to exercise a particular program path or to verify compliance with a specific requirement.  
IEEE Standard 610 (1990)

* 테스트 케이스의 주요 요소
  * 테스트 입력값
  * (응용프로그램 혹은 시스템의) 실행 조건 및 상태
  * 예상되는 결과 값
* 테스트 자동화의 핵심 => 예상 결과 값을 아는 것!

### 테스트 원칙

* Tripe A
  * Arrange: 테스트를 위한 사전 조건 세팅
  * Act: 응용프로그램 혹은 단위 기능 수행
  * Assert: 예상결과와 실제 수행된 결과값 비교 검증
* Quadruple A
  * Arrange: 테스트를 위한 사전 조건 세팅
  * Assert: 사전 조건에 대한 검증
  * Act: 응용프로그램 혹은 단위 기능 수행
  * Assert: 예상결과와 실제 수행된 결과값 비교 검증

### 테스트 효과

* 코드 수정에 대한 생산성 향상
* 디버깅 용이
* **리팩토링의 조건이 됨**
* 전체 시스템의 이해 없이 부분에 대한 수정 가능
* 설계와 구현의 분리
* 코드리뷰에 대한 부담 감소
* 요구사항 변경에 대한 안정적 개발 가능

### 테스트 커버리지

테스트 케이스, 테스트 커버리지는 리팩토링의 조건이 되지만 100% 신뢰할 수 없다.

* 테스트를 위한 테스트 코드
  * 테스트 케이스 작성과 커버리지가 조직의 KPI라면?

### 테스트 더블

테스트 하고 싶은 클래스를 상속받아 대역(double) 메소드를 오버라이드 구현

* Mock: 실제 객체의 행동을 의도한 방향으로 흉내 내도록 설계 된 객체. 객체의 행동을 테스트 하기 위해 사용

```java
// SmsSender, 문자메시지 송신 기능을 수행
// 오리지널 클래스인데 메소드 미구현 상태여서 구체적 내용을 검증하기가 어려움
class SmsSender {
  public void send(Schedule schedule) {
    // 일정의 전화번호로 메시지를 송신
  }
}
```

```java
// TestableSmsSender, 문자메시지 송신 기능을 수행
// Testable클래스에서 테스트 케이스에서 사용 가능한 최소한의 기능만 구현
class TestableSmsSender extends SmsSender {

  private boolean sendMethodIsCalled;

  @override
  public void send(Schedule schedule) {
    // 메소드가 호출된 경우 isSendMethodCalled를 true로 변경
    sendMethodIsCalled = true;
  }

  // 테스트 코드에서 send메소드 호출여부를 검증하는 spy 메소드
  public void isSendMethodIsCalled() {
    return sendMethodIsCalled;
  }

}
```

하지만 나의 관심사는 SmsSender 클래스가 아님에도 불구하고 테스트를 위한 Testable클래스를 만드는게 부담스럽다. 

### Mock Framework를 이용한 상태/행위 검증

* Test double을 사용 목적
  * Library, Legacy와의 의존관계를 끊고 싶을 때
  * 테스트 대상이 아직 구현되지 않았을 때
  * 기능 구현이 되어 있지만 수행시간이 오래 걸리거나 테스트 환경에 영향을 받을 때
  * 테스트 할 때 실제 클래스를 호출하면 안될 때 (ex. DB CRUD)


## 이클립스 단축키

* `Alt + Shift + T`: Refactoring
* `Alt + Shift + E`: Execution
  * `T` => Run test

## 테스트 방법

* 테스트 사이클
  * Arrange: 사전 실행조건, 상태 구성
  * Act: 실행
  * Assert: 평가