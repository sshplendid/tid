# MVC 패턴과 Spring 프레임워크

사실과 다른 내용이 있으면 피드백 부탁드립니다.

## MVC 패턴

* [MVC 패턴](https://opentutorials.org/course/697/3828)이 무엇인가?
* 왜 MVC 패턴을 써야하는가?
  * 비즈니스가 복잡해지니까
  * 모델/뷰/컨트롤러를 분리할 필요성 제기
    * 하나의 복잡한 프로그램보단 단순한 여러개의 프로그램의 모음이 유지보수하기 용이하다.

### MVC 패턴이 왜 나왔을까?

#### 정적 웹페이지

* 말 그대로 **정적** 웹사이트
  * [월드와이드웹은 문서를 공유하기 위해 탄생한 공간](https://ko.wikipedia.org/wiki/%EC%9B%94%EB%93%9C_%EC%99%80%EC%9D%B4%EB%93%9C_%EC%9B%B9#%EC%97%AD%EC%82%AC)
  * [정적인 웹사이트 예: Douglas Crockford](https://www.crockford.com/blog.html)
* Q. 정적 웹페이지의 단점?

#### 동적 웹페이지 (MVC 1도 포함)

* WWW은 문서 이상의 기능을 수행한다.
  * 쇼핑몰, 게임, 비디오, ...
* 이제 다이나믹 웹 페이지를 만들 수 있음
* 데이터 저장소도 따로 있음 (DBMS)
* 서블릿: [Java 소스코드 안에 HTML이](https://pradnyanaik.files.wordpress.com/2009/08/javacode1.jpg?w=780)
* JSP: [HTML 안에 Java 코드가](https://archive.cnx.org/resources/08f1337f66482fcca8068627d1eca6d5340137ac/Code-viewSessionData.jsp.png)
* 프로그램이 커지면 코드 가독성이 떨어진다.
* 뷰(HTML) 코드와 서버(Java) 코드를 분리하고 싶다
   * 1 source/20,000 lines vs 200 sources/100 lines

Q. MVC 패턴인 좋은건 알겠는데 어떻게 구현하지?

## Spring 프레임워크


![Spring framework architecture](https://docs.spring.io/spring/docs/4.2.x/spring-framework-reference/html/images/spring-overview.png)


* IoC, Inversion of Control
  * Q1. 프레임워크와 라이브러리의 차이?
  * Q2. 인스턴스 생성 주체
  * 스프링 IOC 컨테이너
    * 인스턴스의 생명주기를 관리: 객체 생성은 누가?
  * [스프링 Bean](https://gmlwjd9405.github.io/2018/11/10/spring-beans.html)
    * Lifecycle of Spring Beans  ![빈 라이프사이클](https://qph.fs.quoracdn.net/main-qimg-f77ca60f3c1a69580e3bd32408663a49)
    * Singleton, Stateless?
* DI, Dependency Injection
  * @Autowired @Inject
    * Q. 주입받는 인스턴스가 생성되지 않는다면?
  * 인스턴스를 생성하는데 필요한 또다른 인스턴스들
  * Injection 방법들
     * Field Injection: Autowired
     * Constructor Injection: Contructor argument
* [AOP, Aspect Oriented Programming](https://ko.wikipedia.org/wiki/%EA%B4%80%EC%A0%90_%EC%A7%80%ED%96%A5_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)
  * 비즈니스와 별개의 동작: 로깅, 보안, ...
  * 원하는 부분에 Point-cut을 추가
  * AOP를 Controller 레이어에서 구현 가능?: `@ControllerAdvice`
* Spring MVC  ![Spring MVC 구조](https://terasolunaorg.github.io/guideline/1.0.1.RELEASE/en/_images/RequestLifecycle.png)
  * [Dispatcher Servlet](https://mangkyu.tistory.com/18)
    * Q. 이미지, html 같은 정적(static) 파일들의 처리는?
  * [Handler](https://joont92.github.io/spring/HandlerMapping-HandlerAdapter-HandlerInterceptor/)
    * AnnotationMethodHandlerAdapter
  * Controller
    * [filter, interceptor, controller advice 순서?](https://cornswrold.tistory.com/56)
  * Model (include business logic)
  * View Resolver
    * JSP, XML, JSON, Velocity, ...
    * Content Negotiation
* 어노테이션
  * [어노테이션 종류](https://jeong-pro.tistory.com/151)
    * `@Controller`
    * `@Service`
    * `@Repository`
    * `@Component`
    * `@Bean`
    * `@Autowired`
    * `@Configuration`
    * `@SpringBootApplication`
  * Q. 컨트롤러 클래스에 @Controller 대신 @Service를 붙이면 어떻게 될까?
  * Q. [Component와 Bean의 차이?](https://jojoldu.tistory.com/27)
  * [어노테이션만 붙이면 다 알아서 되나?](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-using-springbootapplication-annotation.html)
* Spring Boot: https://start.spring.io/
  * Spring XML 설정
  * Default 설정
    * [Boot Default Servlet Container](https://docs.spring.io/spring-boot/docs/1.1.8.RELEASE/reference/html/howto-embedded-servlet-containers.html)
    > ...    
    59.9 Use Jetty instead of Tomcat
    The Spring Boot starters (spring-boot-starter-web in particular) **use Tomcat as an embedded container by default**. You need to exclude those dependencies and include the Jetty one instead. Spring Boot provides Tomcat and Jetty dependencies bundled together as separate starters to help make this process as easy as possible.    
    ...


## 참고자료

* [생활코딩 - MVC 패턴](https://opentutorials.org/course/697/3828)
* [[JSP/Servlet] CGI 그리고 Servlet과 JSP와의 관계](https://m.blog.naver.com/PostView.nhn?blogId=goddlaek&logNo=220901890910&proxyReferer=https%3A%2F%2Fwww.google.com%2F)
* [spring - 1주차 IoC와 DI](https://www.slipp.net/wiki/pages/viewpage.action?pageId=25527606)
* [백기선 - 더 나은 개발자로 성장하는 팁 "어! 에러가 났네? 어떡하지?"](https://youtu.be/srQR0Qb7Joo)
* [백기선 - 더 나은 개발자로 성장하는 팁 "개발자라면 디버거 사용법은 꼭 알아야죠"](https://youtu.be/BfyegHhCh_g)
* [백기선 - 예제로 배우는 스프링 입문](https://www.youtube.com/playlist?list=PLfI752FpVCS8_5t29DWnsrL9NudvKDAKY)
* [Spring Docs](https://docs.spring.io/spring/docs/current/spring-framework-reference/index.html)
* 그 외 본문 내 링크들을 참고하세요.