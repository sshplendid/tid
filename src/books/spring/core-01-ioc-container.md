# Core technologies

Version `5.2.3.RELEASE`

이 장은 스프링 프레임워크에 필수적인 모든 기술에 대해 다루고 있다.

이 중에서 가장 중요한 것은 스프링 프레임워크의 제어 역전(IoC, Inversion of Control) 컨테이너이다. 스프링 프레임워크 IoC 컨테이너의 철저하게 다룬 후 스프링 관점 지향 프로그래밍(AOP) 기술에 대해 포괄적으로 다루고 있다. 스프링 프레임워크는 고유의 AOP 프레임워크를 가지고 있고 이는 이해하기 슆고 Java Enterprise AOP 요건의 80%에 대해 참조하고 있다.

스프링과 AspectJ의 통합에 대한 범위 역시 제공하고 있다.

## 1. IoC 컨테이너

이 챕터는 스프링의 제어 역전 (IoC, Inversion of Control) 컨테이너에 대해 다룬다.

### 1.1. 스프링 IoC 컨테이너와 빈 도입부

이 챕터는 스프링 프레임워크에서 제어 역전을 적용하는 원리에 대해 다룬다. IoC는 의존성 주입(DI, Dependency Injection)이라고도 한다. 이는 오로지 생성자 인자, 팩토리 메서드에 대한 인자 혹은 팩토리 메서드로부터 반환거나 (생성자에 의해) 생성된 객체 인스턴스에 설정된 프로퍼티에 대한 의존성에 대한 프로세스이다. 컨테이너는 빈을 생성할 때 의존성을 주입한다. 이 프로세스는 근본적으로 빈 스스로 인스턴스 생성 과정이나 그들의 의존성을 직접 클래스를 생성해서 의존성을 제어하거나 서비스 로케이터 패턴과 같은 방식을 통해 생성되는 빈과 정 반대의 방식이다. (그래서 이름이 제어의 역전이다.)

`org.springframework.beans`, `org.springframework.context` 패키지는 스프링 프레임워크의 IoC 컨테이너의 기반이다. `BeanFactory` 인터페이슨느 객체의 타입을 관리하는 방식에 대해 고급 구성 방식을 제공한다. `ApplicationContext`는 `BeanFactory`의 하위 인터페이스이고 아래와 같은 추가 기능을 가지고 있다.:

* 스프링 AOP 기능과의 통합
* (국제화 같은) 메시지 리소스 핸들링
* 이벤트 발행
* 웹 애플리케이션을 위한 `WebApplicationContext`와 같은 특정 애플리케이션 레이어의 컨텍스트

단순히 `BeanFactory`는 기본적인 기능과 프레임워크 구성을 제공하고, `ApplicationContext`는 특정 엔터프라이즈 기능을 추가적으로 제공한다. `ApplicationContext`는 `BeanFactory`의 완전한 수퍼셋이고 이 챕터는 스프링 IoC 컨테이너를 다루는데 대부분을 사용한다. `BeanFactory`에 대한 더 많은 정보는 1.16. BeanFactory 부분을 살펴보라.
