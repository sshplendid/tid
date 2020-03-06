> 원문: [Spring Framework 5.2.3 Core](https://docs.spring.io/spring-framework/docs/5.2.3.RELEASE/spring-framework-reference/core.html#spring-core)

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

단순히 `BeanFactory`는 기본적인 기능과 프레임워크 구성을 제공하고, `ApplicationContext`는 특정 엔터프라이즈 기능을 추가적으로 제공한다. `ApplicationContext`는 `BeanFactory`의 완전한 수퍼셋이고 이 챕터는 스프링 IoC 컨테이너를 다루는데 대부분을 사용한다. `BeanFactory`에 대한 더 많은 정보는 [1.16. BeanFactory](#1.16.-BeanFactory) 부분을 살펴보라.

스프링에서 애플리케이션의 기간을 구성하고 스프링 IoC 컨테이너가 관리하는 객체들을 빈(beans)이라고 부른다. 빈은 스프링 IoC 컨테이너에 의해 관리되고 인스턴스화하고 결합되는 객체이다. 또는 애플리케이션의 수많은 객체들 중 하나일 수도 있다. 그리고 객체들 간의 의존성에서 빈은 컨테이너에 의해 설정 메타데이터를 반영한다.

### 1.2. 컨테이너 오버뷰

`org.springframework.context.ApplicationContext` 인터페이스는 스프링 IoC 컨테이너를 대표하고 빈 인스턴스화, 구성, 결합에 대한 책임을 가지고 있다. 컨테이너는 설정 메타데이터(configuration metadata)를 읽어서 어떤 빈이 인스턴스화하고 구성하고 결합해야하는지에 대한 지시사항을 얻는다. 설정 메타데이터는 XML, 자바 어노테이션 혹은 자바 코드로 표현한다. 이는 객체들 사이의 수많은 상호의존성과 애플리케이션을 구성하는 객체들을 표현한다.

수많은 `ApplicationContext` 인터페이스의 구현체들은 스프링에 공급된다. Stand-alone 애플리케이션에서 `ClassPathXmlApplicationContext` 나 `FileSystemXmlApplicationContext`의 인스턴스를 생성하는 일은 빈번하다. 설정 메타데이터를 정의하기 위해 전통적인 포맷인 XML을 사용하는 것 대신, XML 설정을 최소화하면서 추가 메타데이터 형식에 대한 지원을 선언적으로 활성화해서 자바 어노테이션이나 코드를 메타데이터 포맷으로 사용할 수 있다.

대부분의 애플리케이션 시나리오에서, 특정 유저 코드는 스프링 IoC 컨테이너의 하나 이상의 인스턴스를 인스턴스화하는데 필요조건이 아니다. 한 예로, 웹 애플리케이션 시나리오에서, `web.xml` 의 웹 디스크립터 XML 보일러 플레이트 코드로 8 줄 정도의 라인이면 충분하다 ([웹 애플리케이션을 위한 편리한 애플리케이션 컨텍스트 인스턴스화](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#context-create) 부분을 참고하라). 만약 Spring Tool Suite을 사용한다면, 몇 번의 마우스 클릭과 키보드 클릭으로 보일러플레이트 설정코드 생성할 수 있다.

다음은 스프링이 어떻게 동작하는지에 대한 고수준의 다이어그램이다. 애플리케이션 클래스들은 설정 메타데이터로 결합되어 있기 때문에 `ApplicationContext`가 생성되어 초기화된 후 애플리케이션이나 실행 시스템이 완전히 구성되는 것이다.

<figure>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="243px" viewBox="-0.5 -0.5 243 228" content="&lt;mxfile host=&quot;www.draw.io&quot; modified=&quot;2020-02-19T04:26:29.549Z&quot; agent=&quot;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36&quot; etag=&quot;QpG8GJbHcqB8LZsMrUih&quot; version=&quot;12.7.1&quot; type=&quot;google&quot;&gt;&lt;diagram id=&quot;2QBm65H3RxrJj0wob88_&quot; name=&quot;Page-1&quot;&gt;1Zdbb5swFMc/jaXtYROXhJhHIOku6tSqlXp5dMAFTw6OjNOEffodg7kF0nabtq4vkc/fxzY+55dzALnR5vBJkm32TSSUI8dKDshdIsdxPAy/WihrYbGwayGVLKmlnnDNflAjWkbdsYQWA0clBFdsOxRjkec0VgONSCn2Q7cHwYenbklKR8J1TPhYvWWJymoVO4tO/0xZmjUn255fz2xI42xuUmQkEfue5K6QG0khVD3aHCLKdeyauNTrzk7Mtg8maa5esuDqS7zelezKC25us7ub+f5xd/7BXOOR8J25sHlYVTYRSKXYbY0blYoepuJO1o27NX4uu70tUELFhipZgkuzETZLyiaExt538bZ9o2W9WLdnEZPjtN27CwMMTCR+ISqzcVRWIQp9hGdoFaHAQxhrBYfVIEI4QAEsstAqQKGF/KUWQweFs3eXF18vivejqNIEMDOmkCoTqcgJX3VqCGHPE6of0wKr8zkXYguiDeJ3qlRp/jNkpwRImdpwM0sPTN3p5R/nxro3m+nx8tA3ysbIk0D/a8DMRU5r5Yzp8FXzhSJSNR4xJ0XB4kY2bvpowlmaw5jTB0hWWN9eX/kku0/RWYidjOkTfs40YJJyotjj8NApWMzSS8HgcTow3SO+4JIpVcbrCLH22N+nzpugDnCaoyCqGJuh0K4YC1HgIx9QXCLsIlwpeKnBAzdgL6ynZlp5Te761LUMTnP3Qq6ew5OTNeWXomCKCc1fDHxRCRO6cjGo6udHDkrfqcV15B6YibVQSmzeHsmmpPr/FmRnAuSmRgKYQK6uo0DxAuGaaCiWYOIK2znCUQ/kUDtjPAJ5iOk+Y4peb0kV3D28iQyRPNm+Xpa4k71rMWxd3kTnciY6l/e3Gpc7HXnHlBA/0JVDp2CO/KqDBVaVlFBnx686mONxXbLXEkZpVbz1wrb1WdUAdlhVSbEmShTsBsD5kcksNEk/GgAAKdazbyCh9qtndD7dFAbvGE2gXSOaTvG/vHHYT1Z+yJYse4u0ed+f65ZV1mTHMM2g3y6O3ma6ntJ1jNd6U4FPmKoAP/dH/oM+cII5MLsPjrrcd19t7uon&lt;/diagram&gt;&lt;/mxfile&gt;" onclick="(function(svg){var src=window.event.target||window.event.srcElement;while (src!=null&amp;&amp;src.nodeName.toLowerCase()!='a'){src=src.parentNode;}if(src==null){if(svg.wnd!=null&amp;&amp;!svg.wnd.closed){svg.wnd.focus();}else{var r=function(evt){if(evt.data=='ready'&amp;&amp;evt.source==svg.wnd){svg.wnd.postMessage(decodeURIComponent(svg.getAttribute('content')),'*');window.removeEventListener('message',r);}};window.addEventListener('message',r);svg.wnd=window.open('https://www.draw.io/?client=1&amp;lightbox=1&amp;edit=_blank');}}})(this);" style="cursor:pointer;max-width:100%;max-height:228px;"><defs/><g><path d="M 137 60.63 L 137 7" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 137 65.88 L 133.5 58.88 L 137 60.63 L 140.5 58.88 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe flex-start; width: 1px; height: 1px; padding-top: 37px; margin-left: 139px;"><div style="box-sizing: border-box; font-size: 0; text-align: left; "><div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; background-color: #ffffff; white-space: nowrap; ">비즈니스 객체(POJOs)</div></div></div></foreignObject><text x="139" y="40" fill="#000000" font-family="Helvetica" font-size="11px">비즈니스 객체(POJOs)</text></switch></g><path d="M 70.63 97 L 7 97" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 75.88 97 L 68.88 100.5 L 70.63 97 L 68.88 93.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-end; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 94px; margin-left: 42px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; background-color: #ffffff; white-space: nowrap; ">설정 메타데이터</div></div></div></foreignObject><text x="42" y="94" fill="#000000" font-family="Helvetica" font-size="11px" text-anchor="middle">설정 메타데이터</text></switch></g><rect x="77" y="67" width="120" height="60" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 97px; margin-left: 78px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">스프링 컨테이너</div></div></div></foreignObject><text x="137" y="101" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">스프링 컨테이너</text></switch></g><rect x="77" y="167" width="120" height="60" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 197px; margin-left: 78px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">사용하려는 <br />완전히 구성된 시스템</div></div></div></foreignObject><text x="137" y="201" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">사용하려는...</text></switch></g><path d="M 137 127 L 137 160.63" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 137 165.88 L 133.5 158.88 L 137 160.63 L 140.5 158.88 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe flex-start; width: 1px; height: 1px; padding-top: 147px; margin-left: 139px;"><div style="box-sizing: border-box; font-size: 0; text-align: left; "><div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; background-color: #ffffff; white-space: nowrap; ">객체 생성</div></div></div></foreignObject><text x="139" y="150" fill="#000000" font-family="Helvetica" font-size="11px">객체 생성</text></switch></g></g><switch><g requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"/><a transform="translate(0,-5)" xlink:href="https://desk.draw.io/support/solutions/articles/16000042487" target="_blank"><text text-anchor="middle" font-size="10px" x="50%" y="100%">Viewer does not support full SVG 1.1</text></a></switch></svg>
<figcaption>Figure 1. 스프링 IoC 컨테이너</figcaption>
</figure>

#### 1.2.1. 설정 메타데이터

앞선 다이어그램에서 봤듯이, 스프링 IoC 컨테이너는 설정 메타데이터를 사용한다. 이 설정 메타데이터는 애플리케이션 개발자가 스프링 컨테이너에게 애플리케이션의 객체를 인스턴스화, 구성, 결합을 지시하는 방법을 나타낸다.

> XML 기반의 메타데이터는 설정 메타데이터의 유일한 형식이 아니다. 스프링 IoC 컨테이너는 스스로 어떤 설정 메타데이터 형식으로 작성되었는지와 디커플링 관계에 있다. 요즘엔 많은 개발자가 [Java 기반 구성](#1.12.-Java-기반-컨테이너-구성)을 선택하고 있다.

스프링 컨테이너의 다른 메타데이터 형식에 대한 내용은 아래를 살펴봐라.:

* [어노테이션 기반 구성](#1.9.-어노테이션-기반-컨테이너-구성): 스프링 2.5 버전부터 어노테이션 기반 메타데이터 구성을 지원한다.
* [Java 기반 컨테이너 구성](1.12.-Java-기반-컨테이너-구성): 스프링 3.0 버전부터, 스프링 JavaConfig 프로젝트가 제공하는 많은 기능들이 Core 스프링 프레임워크의 일부분으로 포함되기 시작했다. 그래서 XML 파일 대신 Java를 이용해서 애플리케이션 클래스에 대한 추가적인 빈을 정의할 수 있다. 이런 새로운 기능들을 사용하려면, `@Configuration`, `@Bean`, `@Import` 그리고 `@DependsOn` 어노테이션을 참고해라.

스프링 구성은 컨테이너가 관리하는 최소 하나 이상의 빈 설정으로 이루어져 있다. XML 기반 설정 메타데이터는 이런 빈들을 `<beans/>` 태그로 이루어져 있었다. Java 구성은 `@Configuration` 어노테이션이 등록된 클래스 안에 `@Bean` 어노테이션이 등록된 메서드를 사용한다.

이런 빈 정의는 애플리케이션을 형성하는 실제 객체들과 일치한다. 일반적으로, 서비스 레이어 객체와 데이터 엑세스 객체(DAO) 등을 정의할 것이다. 일반적으로 컨테이너에서 세밀한 도메인 객체를 구성하지 않는다. 왜냐하면 일반적으로 도메인 객체를 생성하고 로드하는 것은 비즈니스 로직과 DAO 객체의 책임이기 때문이다. 그러나 스프링과 AspectJ의 통합으로 IoC 컨테이너의 제어범위 밖에서 생성한 객체를 구성할 수 있다. [스프링에서 AspectJ를 사용해서 도메인 객체 의존성 주입하기](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#aop-atconfigurable) 부분을 참고해라.

다음 예제는 XML 기반의 설정 메타데이터의 기본 구조를 나타낸다.:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="...">  (1) (2)
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <bean id="..." class="...">
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions go here -->

</beans>
```
* (1) `id` 속성은 개별 빈 정의 식별자이다.
* (2) `class` 속성은 빈의 타입을 정의하고, 적합한 클래스 명이어야 한다.

`id` 속성의 값으로 협력하는 객체들을 참조한다. 협력하는 객체들을 참조하기 위한 XML 설정은 이 예제엔 없다. [의존성](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-dependencies) 부분에서 더 많은 정보를 확인할 수 있다.

#### 1.2.2. 컨테이너 인스턴스화하기

`ApplicationContext` 생성자에게 제공하는 경로는 컨테이너가 다양한 외부 리소스로부터 로드한, 로컬 파일 시스템의 자바 `CLASSPATH`와 같은, 설정 메타데이터를 로드한 리소스 문자열이다.

```java
// Java
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");
```

```kotlin
// Kotlin
val context = ClassPathXmlApplicationContext("services.xml", "daos.xml")
```

> 스프링 IoC 컨테이너에 대해 배운 후에 스프링 ([Resource](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#resources)에 기술된) `Resource` 추상화에 대해 더 알고싶어 할지도 모르겠다. 이는 URI 문법으로 정의된 위치에 대한 인풋스트림을 읽기 위한 편리한 방식을 제공한다. `Resource` 경로는 애플리케이션 컨텍스트를 생성하는데 사용되고, 자세한 내용은 [Application Contexts and Resource Paths](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#resources-app-ctx)에 기술되어 있다.

 다음 예제는 서비스 레이어 객체들에 대한 구성 파일이다.:

 ```xml
 <?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- services -->

    <bean id="petStore" class="org.springframework.samples.jpetstore.services.PetStoreServiceImpl">
        <property name="accountDao" ref="accountDao"/>
        <property name="itemDao" ref="itemDao"/>
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions for services go here -->

</beans>
```

다음 예제는 데이터 엑세스 객체(DAO)들에 대한 구성 파일이다.:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="accountDao"
        class="org.springframework.samples.jpetstore.dao.jpa.JpaAccountDao">
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <bean id="itemDao" class="org.springframework.samples.jpetstore.dao.jpa.JpaItemDao">
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions for data access objects go here -->

</beans>
```

앞선 예제에서, 서비스 레이어는 `PetStoreServiceImpl` 클래스와 두 가지 데이터 엑세스 객체 - JPA ORM 표준에 기반한 -  `JpaAccountDao`와 `JpaItemDao`로 구성되어 있다. `property name` 요소는 자바 빈 속성의 이름을 참조한다. 그리고 `ref` 요소는 다른 빈 정의의 이름을 참조한다. `id`와 `ref` 사이의 연결은 협력하는 객체들 사이의 의존성을 표현한다. 더 자세한 내용은 [의존성](#1.4.-의존성) 부분을 살펴봐라.

##### XML 기반의 설정 메타데이터 구성하기

복수의 XML 파일에 걸친 빈 정의는 유용하다. 개별 XML 설정 파일은 때때로 애플리케이션 아키텍쳐의 논리적 레이어나 모듈을 대표하기도 한다.

애플리케이션 컨텍스트 생성자를 사용해서 모든 XML 파일들로부터 빈 정의를 읽어올 수 있다. 이 생성자는 복수의 `Resource` 위치를 획득한다. 대안으로 하나 이상의 `<import/>` 요소로 다른 파일들의 빈 정의를 로드할 수 잇다. 아래 예제는 어떻게 표현하는지 보여준다.:

```xml
<beans>
    <import resource="services.xml"/>
    <import resource="resources/messageSource.xml"/>
    <import resource="/resources/themeSource.xml"/>

    <bean id="bean1" class="..."/>
    <bean id="bean2" class="..."/>
</beans>
```

> 부모 디렉토리에 있는 파일을 참조하기 위해 상대 경로 "../" 를 사용하는 것은 가능하지만, 추천하지 않는다. 그렇게 하면 현재 애플리케이션 외부에 있는 파일에 대한 의존성이 생기게 된다. 특정한 `classpath:` 로 시작하는 URL(예: `classpath:../service.xml`)에 대한 참조도 지양해야 한다. 런타임 프로세스는 "가장 근접한" 클래스패스 루트를 선택한 뒤 상위 디렉토리를 찾는다. 잘못거나 다른 디렉토리를 클래스패스로 선택할 수 있다.  
>
> 상대 경로 대신 적합한 경로(예: `C:/config/service.xml` 혹은 `classpath:/config/services.xml.`)를 선택할 수 있다. 그러나 애플리케이션 설정과 특정 절대 경로 위치와 결합되는 점을 유의해야 한다. 특정 절대 경로를 간접적으로 유지하는 방법 - 예를 들어 "${...}" 표현과 같은 런타임에 JVM 시스템 프로퍼티를 플레이스 홀더로 대입하는 방법 - 이 선호된다.

네임스페이스는 임포트 지시 기능을 제공한다. 게다가 평범한 빈 정의를 넘어선 설정 기능을 스프링이 제공하는 XML 네임스페이스 선택을 통해 이용할 수 있다. 예를 들어 `context`와 `util` 네임스페이스와 같이 말이다.

##### 그루비(Groovy)빈 정의 DSL

추가적인 설정 메타데이터의 예제로서, 빈 정의는 Grails 프레임워크로 알려진 스프링 그루비 빈 정의 DSL로 표현할 수 있다. 일반적으로 이런 설정은 ".groovy" 파일에 있고 구조는 아래와 같다.

```groovy
beans {
    dataSource(BasicDataSource) {
        driverClassName = "org.hsqldb.jdbcDriver"
        url = "jdbc:hsqldb:mem:grailsDB"
        username = "sa"
        password = ""
        settings = [mynew:"setting"]
    }
    sessionFactory(SessionFactory) {
        dataSource = dataSource
    }
    myService(MyService) {
        nestedBean = { AnotherBean bean ->
            dataSource = dataSource
        }
    }
}
```

#### 1.2.3. 컨테이너 사용하기

`ApplicationContext`는 다른 빈들과 의존성 레지스트리를 관리하는 기능을 가진 팩토리를 위한 인터페이스이다. `T getBean(String name, Class<T> requiredType)` 메서드를 사용해서, 빈 인스턴스를 검색할 수 있다.

`ApplicationContext`는 빈 정의를 읽고 접근할 수 있게 해준다. 아래는 그 예제이다.

```java
// Java
// create and configure beans
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

// retrieve configured instance
PetStoreService service = context.getBean("petStore", PetStoreService.class);

// use configured instance
List<String> userList = service.getUsernameList();
```

```kotlin
// Kotlin
import org.springframework.beans.factory.getBean

// create and configure beans
val context = ClassPathXmlApplicationContext("services.xml", "daos.xml")

// retrieve configured instance
val service = context.getBean<PetStoreService>("petStore")

// use configured instance
var userList = service.getUsernameList()
```

Groovy 설정과 함께, 부트스트래핑하는 과정은 매우 유사하다. 이는 다른 컨텍스트 구현 클래스를 가지고 있다. 아래는 그루비 설정 예제이다.

```java
ApplicationContext context = new GenericGroovyApplicationContext("services.groovy", "daos.groovy");
```

가장 유연한 방법은 `GenericApplicationContext`를 사용해서 리더 권한을 위임하도록 구성하는 것이다. 한 예로 XML 파일을 위해 `XmlBeanDefinitionReader`을 사용한다.

```java
GenericApplicationContext context = new GenericApplicationContext();
new XmlBeanDefinitionReader(context).loadBeanDefinitions("services.xml", "daos.xml");
context.refresh();
```

`GroovyBeanDefinitionReader`를 사용해서 그루비 설정을 읽어올 수도 있다.

```java
GenericApplicationContext context = new GenericApplicationContext();
new GroovyBeanDefinitionReader(context).loadBeanDefinitions("services.groovy", "daos.groovy");
context.refresh();
```

이런 reader들을 혼합하거나 매칭하는 방법으로 `ApplicationContext`의 권한을 위임해서 다양한 설정 소스파일로부터 빈 정의를 읽을 수 있다. 

그러면 `getBean`을 사용해서 빈 인스턴스를 검색할 수 있다. `ApplicationContext` 인터페이스는 빈 인스턴스 검색을 위한 다른 메서드를 가지고 있다. 그러나 애플리케이션 코드에서 그런 메서드를 사용해선 안된다. 게다가 애플리케이션 코드는 `getBean` 메서드도 호출하지 말아야 한다. 이렇게 하여 스프링 API를 호출하는 의존성을 없애야 한다. 한 예로, 스프링과 웹 프레임워크의 통합은 JSF-managed beans와 컨트롤러와 같은 여러가지 웹 프레임워크 컴포넌트들을 위한 의존성 주입을 제공한다. 그리하여 `@Autowire` 어노테이션과 같은 기능을 사용해서 특정 빈에 대한 의존성을 선언할 수 있다.

### 1.3. Bean 오버뷰

스프링 IoC 컨테이너는 하나 이상의 빈을 관리한다. 이 빈들은 컨테이너에게 제공하는 설정 메타데이터로 생성된다. XML의 `<bean/>` 형식의로 정의된 것들 말이다.

컨테이너 안에서, 빈 정의는 아래 메타데이터를 `BeanDefinition` 객체로써 표시되어며, 여기엔 아래와 같은 메타데이터가 포함된다.:

* 패키지 경로가 포함된 클래스 이름: 일반적으로 정의된 빈의 실제 구현 클래스이다.
* 컨테이너 내에서 빈이 어떻게 행동해야 하는지에 대해 기술된 빈 행동 설정 요소 (스코프, 라이프사이클 콜백 등).
* 빈이 동작하는데 필요한 다른 빈에 대한 참조정보. 이 참조는 협력자(collaborators) 혹은 의존성(dependencies)이라고도 부른다.
* 새로 생성된 객체에서 구성할 기타 설정 - 예: 커넥션 풀을 관리하는 빈에서 사용할 커넥션의 수 혹은 풀의 사이즈 제한 등

이런 메타데이터는 개별 빈 정의를 구성하는 프로퍼티의 모음을 번연ㄱ한다. 다음 테이블은 이러한 프로퍼티한 기술한 것이다.:

**표 1. 빈 정의**

|프로퍼티|의미|
|---|---|
|Class|[빈 인스턴스화]()|
|Name|[빈 네이밍]()|
|Scope|[빈 스코프]()|
|Constructor arguments|[의존성 주입]()|
|Properties|[의존성 주입]()|
|Autowiring mode|[협력자 오토와이어링]()|
|Lazy initialization mode|[빈 지연 인스턴스화]()|
|Initialization method|[빈 인스턴스화 콜백]()|
|Destruction method|[빈 파괴 콜백]()|

특정 빈을 생성하는 방법에 대한 정보를 포함한 빈 정의 외에도, `ApplicationContext` 구현체는 (사용자에 의해) 컨테이너 외부에서 생성된 객체 등록도 허용한다. 이 것은 ApplicationContext의 BeanFactory를 `getBeanFactory()` 메서드가 반환하는 `DefaultListableBeanFactory`객체를 통해 접근함으로써 처리된다. `DefaultListableBeanFactory`는 `registerSingleton(..)` 메서드와 `registerBeanDefinition(..)` 메서드를 통해 빈 등록을 지원한다. 그러나 일반적으로 애플리케이션은 일반적인 빈 정의 메타데이터를 통해 정의된 빈들과 단독으로 동작한다.

> 빈 메타데이터와 수동으로 공급된 싱글턴 인스턴스는 컨테이너가 오토와이어링(autowiring) 단계와 기타 검사 단계에서 적절하기 추론하기 위해서 가능한 빨리 등록되어야 한다. 반면에 기존 메타데이터와 싱글턴 인스턴스를 오버라이딩한 것은 어느정도 지원되는 반면에, 런타임에서의 신규 빈 등록은 공식적으로 지원되지 않고 동시 접근 예외(concurrent access exception)와 빈 컨테이너의 모순된 상태를 유발할 수 있다. 


#### 1.3.1. 빈 네이밍

모든 빈은 하나 이상의 식별값을 가지고 있다. 이 식별값들은 빈의 호스트 컨테이너 내에서 유일해야 한다. 빈은 보통 유일한 식별값을 가지고 있다. 그렇지만 만약 하나 이상의 식별값이 필요한 경우, 추가적으로 별칭(alias)을 가질 수 있다.

XML 기반의 설정 메타데이터에서 빈 식별값으로 `id` 속성이나 `name` 속성, 혹은 두 속성 모두 사용했을 것이다. `id` 속성은 정확히 하나의 id만을 명시하게 한다. 관습적으로, id 값은 문자+숫자(alphanumeric, e.g. 'myBean', 'someService' 등)로 명명한다. 그러나 특별한 문자를 포함하는 것도 가능하다. 만약 빈에 대한 다른 별칭(alias)를 도입하길 원한다면, 빈의 `name` 속성에 명시할 수 있다. 이는 쉼표(,), 세미콜론(;) 혹은 공백문자(whitespace)로 구분한다. 스프링 3.1 버전 이전에는 `id` 속성은 입력 가능한 문자를 제한하는 `xsd:ID` 타입으로 정의되었다. 3.1 버전부터, `xsd:string` 타입으로 정의되었다. 더이상 XML 파서를 사용하지 않더라도 빈의 `id` 유일성은 컨테이너에 의해 강요된다.

빈의 `id` 속성이나 `name` 속성을 지정할 필요는 없다. 만약 명시적으로 지정하지 않는 경우, 컨테이너는 빈의 유일한 명칭을 생성한다. 그러나 만약 `ref` 요소나 서비스 로케이터 스타일의 룩업 방식을 사용해서 이름으로 빈을 참조하려면, 빈의 이름을 지정해야 한다. 이름을 제공하지 않는 이유는 [inner beans](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-inner-beans)와 [autowiring collaborators](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-autowire)와 관련이 있다.

> #### 빈 명명 규칙  
> 빈을 이름을 명명할 때 인스턴스 필드 이름에 대해 표준 자바 규칙을 사용한다. 빈 이름은 소문자로 시작하고 카멜 케이스를 사용한다. 예를 들어 `accountmanager`, `accountService`, `userDao` 등 처럼 말이다.  
> 빈 명명은 지속적으로 설정에 대한 가독성과 이해를 쉽게 만든다. 스프링 AOP를 사용할 때도, 이름으로 관련된 빈들에 대한 어드바이스를 적용하는데 도움을 준다.

> 클래스패스를 컴포넌트 스캔하면, 스프링은 이름이 없는 컴포넌트들에 대한 빈 이름을 앞서 기술한 것과 같이 생성한다.: 근본적으로, 클래스 이름을 획득하여 첫 번째 문자열을 소문자로 변환한다. 그러나 드물게 클래스 명의 첫 번째와 두 번째 문자 모두 대문자인 특별한 경우엔 원래의 케이스가 유지된다. 이는 `java.beans.Introspector.decapitalize`에 의해 정의된 규칙과 동일하다. (스프링은 이를 사용한다.)

##### 빈 정의 외부의 빈에 대한 별칭 정하기

빈을 정의할 때, 빈의 `id` 속성과 `name` 속성을 조합하여 하나 이상의 이름을 지정할 수 있다. 이 이름들은 동일한 빈에 별칭을 지정하는 것과 동등하고 특별한 상황에서 유용하다. 예를 들어 애플리케이션의 개별 컴포넌트가 컴포넌트에 명시된 빈 이름을 사용해서 공통의 의존성을 참조해야 할 때 말이다.

실제로 정의된 빈에 대한 모든 별칭을 명시하는 것은 항상 적절한 것은 아니다. 때때로 다른 곳에 빈에 대한 별칭에 대한 방식을 정의하는 것이 바람직하다. 다음은 대규모 시스템에서 흔히 사용하는, 개별 하위 시스템의 객체 정의에 대한 설정을 나누는 방법이다. XML 기반의 설정 메타데이터에서, `<alias/>` 요소를 사용해서 이를 적용할 수 있다. 다음 예제는 적용 방법에 대해 보여준다.:

```xml
<alias name="fromName" alias="toName"/>
```

이 예에서, 동일 컨테이너의 `fromName`이라고 명명된 빈은, `toName`이라는 별칭으로 정의되어 참조될 수 있다.

예를 들어, 하위시스템 A에 대한 설정 메타데이터는 `subsystemA-dataSource`라는 이름으로 명명된 데이터소스를 참조할 수 있다. 하위 시스템 B에 대한 설정 메타데이터는 `subsystemB-dataSource`라고 명명된 데이터 소스를 참조할 수 있다. 모든 하위시스템을 사용해서 메인 애플리케이션을 구성할 때, 메인 애플리케이션은 `myApp-dataSource`로 명명된 데이터소스를 참조할 수 있다. 세 개의 이름들이 모두 동일한 객체를 참조하도록 하려면, 다음의 별칭 정의를 설정 메타데이터에 추가하여 사용할 수 있다.:

```xml
<alias name="myApp-dataSource" alias="subsystemA-dataSource"/>
<alias name="myApp-dataSource" alias="subsystemB-dataSource"/>
```

이제 개별 컴포넌트와 메인 애플리케이션은 (네임스페이스를 효과적으로 작성하여) 다른 정의와 충돌하지 않도록 보장된 고유한 이름을 통해 데이터 소스를 참조할 수 있지만, 여전히 동일한 빈을 참조한다.

> ##### 자바 설정
> 자바 설정을 사용하려면, `@Bean` 어노테이션을 사용해서 별칭을 제공할 수 있다. [`@Bean` 어노테이션 사용하기](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-java-bean-annotation)를 참고하라.

#### 1.3.2. 빈 인스턴스화

빈 정의는 본질적으로 하나 이상의 객체를 생성하기 위한 레시피(방법)이다. 컨테이너는, 실제 객체를 생성하거나 가져오기 위한 빈 정의에 의해 캡슐화된 설정 메타데이터를 사용하거나 요청할 때, 이름을 가진 빈을 위한 레시피(빈 정의)를 본다.

만약 XML 기반의 설정 메타데이터를 사용한다면, `<bean/>` 요소의 `class` 속성으로 인스턴스화 된 객체의 타입(클래스)를 명시해야 한다. 이 `class` 속성 (내부적으로 `BeanDefinition` 인스턴스의 `Class`프로퍼티이다.)은 대개 필수요소이다. (예외 경우는 [인스턴스 팩토리 메서드로 인스턴스화하기](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-class-instance-factory-method)와 [빈 정의 상속](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-child-bean-definitions)을 살펴보라.) `Class` 속성은 두 가지 방법 중 하나로 사용할 수 있다.:

* 일반적으로, 컨테이너가 직접 빈의 생성자 - 자바 코드의 `new` 연산자와 동등한 - 를 호출(reflectively)하여 생성한, 빈 클래스를 지정한 것
* 객체를 생성하기 위해 호출되는 `static` 팩토리 메서드를 포함하는 실질적인 클래스를 명시한 것, 컨테이너가 빈을 생성하는 클래스의 `static` 팩토리 메서드를 호출하는 흔하지 않은 케이스이다. `static` 팩토리 메서드 호출로 반환된 객체 타입은 동일한 클래스이거나 다른 클래스일 수 있다.

> #### 내부 클래스 이름
> 만약 `static` 중첩 클래스의 빈 정의를 설정하려면, 중첩 클래스의 바이너리 이름을 알아야 한다.  
> 예를 들어, 만약 `com.example` 패키지의 `Something` 클래스를 가지고 있고 `Something` 클래스가 `OtherThing`이란 `static` 중첩 클래스를 가지고 있다면, 빈 정의의 `class` 속성의 값은 `com.example.Something$OtherThing`이 될 것이다.  
> `$` 문자는 외부 클래스와 중첩 클래스의 이름을 구분하기 위해 사용한다.

##### 생성자로 인스턴스화하기

생성자를 사용하여 빈을 생성할 때, 일반적인 모든 클래스들은 스프링과 호환되며 사용 가능하다. 개발중인 클래스는 특정한 인터페이스를 구현하거나 특정 방식으로 코딩할 필요가 없다는 것이다. 단순히 빈  클래스를 명시하는 것 만으로 충분하다. 그러나 사용하는 IoC 컨테이너의 타입에 따라 기본 생성자가 필요할 수도 있다.

스프링 IoC 컨테이너는 관리하고자 하는 어떤 클래스라도 관리할 수 있다. 실ㅈ레 자바빈을 관리하는 것에 제한은 없다. 대부분의 스프링 사용자는 (인자가 없는) 기본 생성자가 있고 적절한 세터/게터가 있는 자바 빈을 선호한다. 컨테이너에서 빈 스타일이 아닌 클래스를 사용할 수 있다. 예를 들어, 만약에 자바빈 규격에 맞지않는 레거시 커넥션 풀을 사용해야 한다면, 스프링은 그것을 잘 관리할 것이다.

XML 기반 설정 메타데이터에서 아래와 같이 빈 클래스를 명시할 수 있다.

```xml
<bean id="exampleBean" class="examples.ExampleBean"/>

<bean name="anotherExample" class="examples.ExampleBeanTwo"/>
```

생성자 인자를 공급하는 방식과 객체가 생성된 후에 인스턴스 프로퍼티를 구성하는 방식에 대한 자세한 내용은 [의존성 주입](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-collaborators)을 참고하라.

##### 스태틱 팩토리 메서드로 인스턴스화하기

스태틱 팩토리 메서드로 생성한 빈을 정의할 때, `class` 속성을 사용해서 `static` 팩토리 메서드를 포함하는 클래스를 명시하고, `factory-method` 속성으로 팩토리 메서드의 이름을 명시할 수 있다. (나중에 기술할 선택적 인자와 함께) 이 메서드를 호출할 수 있고, 생성자를 통해 생성된 것처럼 처리되는 오브젝트를 반환할 수 있다. 이런 빈 정의의 용도 중 하나는 레거시 코드에서 `static` 팩토리를 호출하는 것이다.

다음 빈 정의는 팩토리 메서드를 호출해서 생성된 빈에 대해 명시하는 것이다. 정의는 반환된 객체의 타입 (클래스)를 명시하지 않고, 오직 팩토리 메서드를 포함한 클래스만 알 수 있다. 이 예제에서, `createInstance()` 메서드는 스태틱 메서드여야 한다. 다음 예제는 팩토리 메서드를 명시하는 방법을 보여준다.:

```xml
<bean id="clientService"
    class="examples.ClientService"
    factory-method="createInstance"/>
```

다음 예제는 앞선 빈 정의와 동작하는 클래스이다.:

```java
public class ClientService {
    private static ClientService clientService = new ClientService();
    private ClientService() {}

    public static ClientService createInstance() {
        return clientService;
    }
}
```

팩토리 메서드에 선택적 인자를 공급하고 팩토리 메서드로부터 반환된 오브젝트에 프로퍼티를 설정하는 방식은 [의존성과 설정에 대한 상세내용](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-properties-detailed)을 참고하라.

##### 인스턴스 팩토리 메서드를 사용해서 인스턴스화하기

스태틱 팩토리 메서드를 통해 인스턴스화하는 것과 유사하게, 인스턴스 팩토리 메서드는 컨테이너가 생성한 빈의 논 스태틱 메서드를 호출한다. 이 방식을 사용하려면, `class` 속성을 비우고, `factory-bean` 속성에 인스턴스 메서드를 포함한 빈의 이름을 명시해야 한다. `factory-method` 속성에 메서드 이름을 추가한다. 다음은 그 예제이다.:

```xml
<!-- createInstance() 메서드를 포함한 팩토리 빈 -->
<bean id="serviceLocator" class="examples.DefaultServiceLocator">
    <!-- 로케이터 빈이 요구하는 의존성을 주입 -->
</bean>

<!-- 팩토리 빈을 통해 생성뙨 빈 -->
<bean id="clientService"
    factory-bean="serviceLocator"
    factory-method="createClientServiceInstance"/>
```

다음 예제는 상응하는 클래스 예제이다.:

```java
public class DefaultServiceLocator {

    private static ClientService clientService = new ClientServiceImpl();

    public ClientService createClientServiceInstance() {
        return clientService;
    }
}
```

팩토리 클래스는 하나 이상의 팩토리 메서드를 가질 수 있다. 다음은 그 예제이다.:

```xml
<bean id="serviceLocator" class="examples.DefaultServiceLocator">
    <!-- inject any dependencies required by this locator bean -->
</bean>

<bean id="clientService"
    factory-bean="serviceLocator"
    factory-method="createClientServiceInstance"/>

<bean id="accountService"
    factory-bean="serviceLocator"
    factory-method="createAccountServiceInstance"/>
```

다음은 상응하는 클래스이다.:

```java
public class DefaultServiceLocator {

    private static ClientService clientService = new ClientServiceImpl();

    private static AccountService accountService = new AccountServiceImpl();

    public ClientService createClientServiceInstance() {
        return clientService;
    }

    public AccountService createAccountServiceInstance() {
        return accountService;
    }
}
```

이런 접근은 팩토리 빈이 의존성 주입(DI)를 통해 구성되고 관리됨을 보여준다.

> 스프링 문서에서, "팩토리 빈"은 스프링 컨테이너에서 구성되고 인스턴스 팩토리 메서드 혹은 스태틱 팩토리 메서드를 통해 생성한 객체를 말한다. 이와 대조적으로, `FactoryBean` (대문자 사용을 유심히 보라.)은 스프링의 특정한 `FactoryBean`을 말한다.

### 1.4. 의존성

일반적인 엔터프라이즈 애플리케이션은 하나의 객체로 구성되지 않는다. 심지어 간단한 애플리케이션도 최종 사용자가 보는 것처럼 일관성 있는 애플리케이션으로 보여주려면 서로 상호작용하는 여러 객체를 가지고 있어야 한다. 다음 섹션은 객체가 목표를 달성하기 위해 상호작용하는 완전 실질적인 스탠드-얼론 애플리케이션을 위한 수많은 빈 정의 방법을 설명한다.

#### 1.4.1. 의존성 주입

의존성 주입은 객체가 그들과 동작하는 다른 객체에 대한 의존성을 정의하는 프로세스이다. 생성자 인자, 팩토리 메서드의 인자, 혹은 팩토리 메서드로부터 반환되거나 생성된 후 인스턴스에 주입될 수도 있다. 그 다음 컨테이너는 빈을 생성할 때 의존성을 주입한다. 이 프로세스는 근본적으로 빈 자신이 인스턴스화 과정이나 클래스의 직접 생성을 이용한 의존 혹은 서비스 로케이터 패턴 등으로 제어하는 방식에서 역전된다. 그래서 제어의 역전(Inversion of Control)이란 이름이다.

DI 원리에 의해 코드는 더 깔끔해지고, 객체가 의존성을 제공받음으로써 디커플링은 더 효과적이다. 객체는 그들의 의존성을 탐색하지 않고 의존할 클래스나 위치도 알지 못한다. 결과적으로, 클래스는 특히 의존성이 인터페이스나 추상 클래스 기반이면 더 테스트하기 쉬워지고, 유닛 테스트에서 사용되는 스텁(stub)이나 목(mock) 구현체를 허용한다.

의존성 주입엔 두 가지 방법이 있다.: [생성자 기반 의존성 주입](#생성자-기반-의존성-주입)입 [세터 기반 의존성 주입](#세터-기반-의존성-주입)

##### 생성자 기반 의존성 주입

생성자 기반 의존성 주입은 컨테이너가 의존성을 나타내는 여러 인자를 가진 생성자를 호출함으로 써 동작한다. 빈을 생성하기 위한 특정한 인자를 가진 `static` 메서드를 호출하는 것과 거의 동등하고, 이 주제는 생성자의 인자와 `static` 팩토리 메서드를 유사하게 다룬다. 다음 예제는 생성자로 의존성 주입만이 가능한 클래스를 보여준다.:

```java
public class SimpleMovieLister {

    // the SimpleMovieLister has a dependency on a MovieFinder
    private MovieFinder movieFinder;

    // a constructor so that the Spring container can inject a MovieFinder
    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // business logic that actually uses the injected MovieFinder is omitted...
}
```

이 클래스엔 특별한게 없다. 이는 특정 컨테이너에 종속되거나, 특정 인터페이스, 기본 클래스, 어노테이션이 없는 POJO(Plain Old Java Object)이다.

###### 생성자 인자 결정

생성자 인자 결정 방식은 인자의 타입을 사용함으로써 발생한다. 만약 빈 정의의 생성자 인자가 잠재적으로 모호한 경우가 아니라면, 빈 정의에 의해 정의된 생성자 인자가 정의되는 순서는 빈이 인스턴스화할 때 해당 인자가 적절한 생성자에 의해 제공되는 순서이다. 다음 클래스를 살펴보자.:

```java
package x.y;

public class ThingOne {

    public ThingOne(ThingTwo thingTwo, ThingThree thingThree) {
        // ...
    }
}
```

`ThingTwo`와 `ThingThree` 클래스가 상속과 관련된 것이 없고, 잠재적으로 모호함이 없다고 가정하자. 그럼련 다음 설정은 제대로 동작할 것이다. 그리고 특정 생성자 인자의 순서나 타입을 명시적으로 `<constructor-arg/>` 요소에 명시할 필요가 없다.

```xml
<beans>
    <bean id="beanOne" class="x.y.ThingOne">
        <constructor-arg ref="beanTwo"/>
        <constructor-arg ref="beanThree"/>
    </bean>

    <bean id="beanTwo" class="x.y.ThingTwo"/>

    <bean id="beanThree" class="x.y.ThingThree"/>
</beans>
```

타입이 알려진 다른 빈이 참조될 때, (이전 예제의 케이스로) 매칭이 발생한다. `<value>true</value>`와 같은 단순한 타입이 사용될 때, 스프링은 값의 타입을 결정할 수 없고, 도움 없인 매칭 작업을 할 수 없다. 다음 예제를 살펴보자.:

```java
package examples;

public class ExampleBean {

    // Number of years to calculate the Ultimate Answer
    private int years;

    // The Answer to Life, the Universe, and Everything
    private String ultimateAnswer;

    public ExampleBean(int years, String ultimateAnswer) {
        this.years = years;
        this.ultimateAnswer = ultimateAnswer;
    }
}
```

**생성자 인자 타입 매칭**

이전 시나리오에서, 명시적으로 생성자의 타입을 `type` 속성으로 명시한다면 컨테이너는 단순한 타입으로 타입 매칭을 사용할 수 있다. 다음의 예제를 보면 알 수 있다.:

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg type="int" value="7500000"/>
    <constructor-arg type="java.lang.String" value="42"/>
</bean>
```

**생성자 인자의 순서**

`index` 속성을  사용해서 생성자 인자의 순서를 명시할 수 있다.:

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg index="0" value="7500000"/>
    <constructor-arg index="1" value="42"/>
</bean>
```

추가로 여러 개의 단순한 값의 모호성을 해결하려면, 순서를 명시하여 생성자가 가진 동일한 두 개 이상의 인자의 모호성을 해결할 수 있다.

> 순서는 0부터 시작한다.

**생성자 인자의 이름**

값을 명확히 설정하기 위해 생성자 파라미터 이름을 사용할 수 있다. 다음의 예제를 보자.:

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg name="years" value="7500000"/>
    <constructor-arg name="ultimateAnswer" value="42"/>
</bean>
```

이 작업을 즉시 수행하려면, 코드가 디버그 플래그로 컴파일되어야 스프링이 생성자로부터 파라미터 이름을 찾을 수 있다. 만약 디버그 플래그로 컴파일하길 원치 않으면, [@ConstructorProperties] JDK 어노테이션을 사용해서 명시적으로 생성자 인자에 이름을 붙일 수 있다. 샘플 클래스를 보자.:

```java
package examples;

public class ExampleBean {

    // Fields omitted

    @ConstructorProperties({"years", "ultimateAnswer"})
    public ExampleBean(int years, String ultimateAnswer) {
        this.years = years;
        this.ultimateAnswer = ultimateAnswer;
    }
}
```

##### 세터 기반 의존성 주입

세터 기반 의존성 주입은 컨테이너가 기본 생성자로 빈을 생성하거나 인자가 없는 `static` 팩토리 메서드로 빈 인스턴스를 생성한 후 세터 메서드를 호출하는 경우에 사용한다.

다음 예제는 순수한 세터 주입을 사용해서 의존성 주입을 해야하만 하는 클래스를 보여준다. 이 클래스는 관습적인 자바 코드이다. 아무런 의존성이 없는 POJO이다.

```java
public class SimpleMovieLister {

    // the SimpleMovieLister has a dependency on the MovieFinder
    private MovieFinder movieFinder;

    // a setter method so that the Spring container can inject a MovieFinder
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // business logic that actually uses the injected MovieFinder is omitted...
}
```

`ApplicationContext`는 생성자 기반/세터 기반 의존성 주입을 지원한다. 생성자 주입 후 세터 주입을 해야하는 경우도 지원한다. 어떤 형식에서 다른 형식으로 프로퍼티를 변환하는 `PropertyEditor` 인스턴스와 함께 사용해서 `BeanDefinition`의 형식으로 의존성을 설정해야 한다. 그러나 대부분의 스프링 사용자는 이런 클래스들을 직접 다루기보단 XML 빈 정의, (`@Controller`, `@Component` 등의 어노테이션이 달린) 컴포넌트 등을 다루거나 자바 기반의 `@Configuration` 클래스의 `@Bean` 메서드를 다룰 것이다. 이런 소스는 내부적으로 `BeanDefinition` 인스턴스로 변환되고 전체 스프링 IoC 컨테이너 인스턴스를 로드하는데 사용한다.

> ##### 생성자 기반 의존성 주입과 세터 기반 의존성 주입?
> 생성자 주입과 세터 주입을 적절하게 섞어 사용할 수 있기 때문에, 생성자를 사용해서 필수적인 의존성을 주입하고 세터 메서드나 설정 메서드로 선택적인 의존성을 주입하는 방법은 적절하다. 세터 메서드에 `@Required` 어노테이션을 사용해서 프로퍼티를 필수적으로 의존받아야 함을 나타낼 수 있다. 그러나 생성자 주입이 더욱 선호된다.  
>
> 스프링 팀은 일반적으로 생성자 주입을 지지한다. 이는 애플리케이션 컴포넌트를 불변 객체로 구현할 수 있게 하고 필수적인 의존성을 `null`이 아니게 할 수 있다. 게다가 생성자 주입 컴포넌트는 항상 (호출하는) 클라이언트 코드에게 완전히 초기화된 객체를 반환한다. 부수적으로, 너무 많은 생성자 인자는 나쁜 코드 냄새이고, 클래스가 너무 많은 책임을 가지고 있다는걸 암시한다. 그래서 적절한 관심사의 구분으로 더 나은 코드로 리팩토링해야 한다.  
>
> 세터 주입은 주로 선택적 인자에 한해 사용해야 한다. 이런 인자는 클래스가 적절한 기본 값을 가지고 있어야 한다. 반면에 not-null 확인은 의존성 있는 모든 코드에서 반드시 수행되어야 한다. 세터 주입의 한 가지 장점은 세터 메서드가 클래스의 객체를 차후에 재설정하거나 재 주입 가능하게 한다는 것이다. 그러므로 [JMX MBeans](https://docs.spring.io/spring-framework/docs/5.2.3.RELEASE/spring-framework-reference/integration.html#jmx)를 통한 관리는 세터 주입의 강력한 사용 사례이다.  
>
> 특정 클래스에 가장 적합한 의존성 주입 방법을 사용해야 한다. 가끔 소스를 가지고 있지 않은 써드파디 클래스를 다뤄야 할 때, 선택을 해야한다. 예를 들어, 만약 써드파티 클래스가 세터 메서드를 노출하지 않으면, 오로지 생성자 주입만이 사용 가능할 것이다.

##### 의존성 주입의 예

다음 예제는 세터 의존성 주입을 위한 XML 기반의 설정 메타데이터이다. 스프링 XML 설정 파일의 일부분이 다음과 같다.:

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <!-- setter injection using the nested ref element -->
    <property name="beanOne">
        <ref bean="anotherExampleBean"/>
    </property>

    <!-- setter injection using the neater ref attribute -->
    <property name="beanTwo" ref="yetAnotherBean"/>
    <property name="integerProperty" value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

다음은 연관된 `ExampleBean` 클래스이다.:

```java
public class ExampleBean {

    private AnotherBean beanOne;

    private YetAnotherBean beanTwo;

    private int i;

    public void setBeanOne(AnotherBean beanOne) {
        this.beanOne = beanOne;
    }

    public void setBeanTwo(YetAnotherBean beanTwo) {
        this.beanTwo = beanTwo;
    }

    public void setIntegerProperty(int i) {
        this.i = i;
    }
}
```

앞선 예제에서, XML 파일의 특정한 프로퍼티에 대응하여 세터를 선언했다. 다음 예는 생성자 기반 의존성 주입을 사용한다.:

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <!-- constructor injection using the nested ref element -->
    <constructor-arg>
        <ref bean="anotherExampleBean"/>
    </constructor-arg>

    <!-- constructor injection using the neater ref attribute -->
    <constructor-arg ref="yetAnotherBean"/>

    <constructor-arg type="int" value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

다음 예는 연관된 `ExampleBean` 클래스이다.:

```java
public class ExampleBean {

    private AnotherBean beanOne;

    private YetAnotherBean beanTwo;

    private int i;

    public ExampleBean(
        AnotherBean anotherBean, YetAnotherBean yetAnotherBean, int i) {
        this.beanOne = anotherBean;
        this.beanTwo = yetAnotherBean;
        this.i = i;
    }
}
```

빈 정의에 명시된 생성자 인자는 `ExampleBean`의 생성자의 인자로 사용된다.

이제 생성자를 사용하는 대신 객체의 인스턴스를 반환하는 `static` 팩토리 메서드를 호출하는 예제를 다룬다.:

```xml
<bean id="exampleBean" class="examples.ExampleBean" factory-method="createInstance">
    <constructor-arg ref="anotherExampleBean"/>
    <constructor-arg ref="yetAnotherBean"/>
    <constructor-arg value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

다음 예는 `ExampleBean` 클래스이다.:

```java
public class ExampleBean {

    // a private constructor
    private ExampleBean(...) {
        ...
    }

    // a static factory method; the arguments to this method can be
    // considered the dependencies of the bean that is returned,
    // regardless of how those arguments are actually used.
    public static ExampleBean createInstance (
        AnotherBean anotherBean, YetAnotherBean yetAnotherBean, int i) {

        ExampleBean eb = new ExampleBean (...);
        // some other operations...
        return eb;
    }
}
```

`static` 팩토리 메서드의 인자는 `<constructor-arg/>` 요소에 의해 공급된다. 정확히는 생성자가 실제로 사용된 것과 동일하다. 팩토리 메서드에 의해 반환된 클래스 타입은 `static` 팩토리 메서드를 포함하는 클래스의 타입과 동일할 필요는 없다. (논-스태틱) 인스턴스 팩토리 메서드는 본질적으로 동일한 방식으로 사용할 수 있다. 그래서 여기선 이에 대해 다루진 않는다.

#### 1.4.2. 의존성과 설정의 상세내용

이전 섹션에서 언급한 것 처럼, 빈 프로퍼티와 생성자 인자를 다른 빈(협력자)의 참조로 사용하거나, 인라인으로 정의된 값으로 사용할 수 있다. 스프링의 XML 기반 설정 메타데이터는 `<property/>` 와 `<constructor-arg/>` 요소를 제공한다.

##### 값 (Primitive, String 등)

`<property/>` 요소의 `value` 속성은 사람이 읽을 수 있는 문자열 값으로써 프로퍼티 혹은 생성자 인자를 명시하게 한다. 스프링의 [변환 서비스(conversion service)](https://docs.spring.io/spring-framework/docs/5.2.3.RELEASE/spring-framework-reference/core.html#core-convert-ConversionService-API)는 `String` 타입의 값을 실제 속성이나 인자의 타입의 값으로 변환하는데 사용한다. 다음은 다양한 값을 설정하는 예제이다.:

```xml
<bean id="myDataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <!-- results in a setDriverClassName(String) call -->
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/mydb"/>
    <property name="username" value="root"/>
    <property name="password" value="masterkaoli"/>
</bean>
```

다음은 [p-네임스페이스]()를 사용해서 더욱 간단한 XML 설정하는 예제이다.:

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:p="http://www.springframework.org/schema/p"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="myDataSource" class="org.apache.commons.dbcp.BasicDataSource"
        destroy-method="close"
        p:driverClassName="com.mysql.jdbc.Driver"
        p:url="jdbc:mysql://localhost:3306/mydb"
        p:username="root"
        p:password="masterkaoli"/>

</beans>
```

이전 XML은 더욱 간단하다. 그러나 IDE의 자동 완성 기능을 사용하지 않는 한, 오타가 설계 시점이 아닌 런타임 시점에 발견된다. IDE의 어시스턴스 기능을 강력히 권고한다.

다음과 같이 `java.util.Properties` 인스턴스를 설정할 수 있다.:

```xml
<bean id="mappings"
    class="org.springframework.context.support.PropertySourcesPlaceholderConfigurer">

    <!-- typed as a java.util.Properties -->
    <property name="properties">
        <value>
            jdbc.driver.className=com.mysql.jdbc.Driver
            jdbc.url=jdbc:mysql://localhost:3306/mydb
        </value>
    </property>
</bean>
```

스프링 컨테이너는 `<value/>` 요소의 텍스트를 자바 빈 `PropertyEditor` 방식을 사용하는 `java.util.Properties` 인스턴스로 변환한다. 이는 유용한 축약어로, 스프링 팀이 중첩된 `<value/>` 요소 사용보다 선호하는 몇 안되는 방법 중 하나이다.

###### `idref` 요소

`idref` 요소는 다른 빈의 `id` 문자열 값을 `<constructor-arg/>` 혹은 `<property/>` 요소로 전달하는 오류방지 방법이다. 다음 예제는 사용하는 방법에 대해 보여준다.:

```xml
<bean id="theTargetBean" class="..."/>

<bean id="theClientBean" class="...">
    <property name="targetName">
        <idref bean="theTargetBean"/>
    </property>
</bean>
```

앞선 빈 정의에서 스니핏은 다음 스니핏과 완전히 동등하다.:

```xml
<bean id="theTargetBean" class="..." />

<bean id="client" class="...">
    <property name="targetName" value="theTargetBean"/>
</bean>
```

전자는 후자보다 선호되는데, `idref` 태그를 사용함으로써 컨테이너는 배포 시점에 참조된 빈이 실제로 존재하는지 검증한다. 후자의 경우, `client` 빈의 `targetName` 프로퍼티를 전달하면서 어떤 검증도 수행하지 않는다. 오타는 `client` 빈을 생성할 때 발견된다. 만약 `client` 빈이 [프로토타입](https://docs.spring.io/spring-framework/docs/5.2.3.RELEASE/spring-framework-reference/core.html#beans-factory-scopes) 빈인 경우, 오타와 야기되는 예외는 컨테이너가 배포되고 한참 지난 후에 발견된다.

> `idref` 요소의 `local` 속성은 4.0 beans XSD에서 더이상 지원되지 않는다. 4.0 명세로 업그레이드할 때 `idref local` 참조를 `idref bean`으로 변경하라.

스프링 2.0 버전 이전에서 `<idref/>` 요소가 가져오는 값들은 `ProxyFactoryBean` 빈 정의 안의 [AOP 인터셉터](https://docs.spring.io/spring-framework/docs/5.2.3.RELEASE/spring-framework-reference/core.html#aop-pfb-1) 설정에 위치한다. 인터셉터 이름을 명시할 때 `<idref/>` 요소를 사용하는 것은 인터셉터 ID를 잘못쓰는 것을 방지하게 한다.

##### 다른 빈 (협력자) 참조

`ref` 요소는 `<constructor-arg/>`와 `<property/>` 정의 요소 내 마지막 요소이다. 빈의 특정 프로퍼티에 컨테이너가 관리하는 다른 빈(협력자)의 참조값을 설정한다. 이 참조된 빈은 프로퍼티로 설정한 빈이 의존한다. 그리고 이는 프로퍼티 값으로 설정하기 전에 필요할 때 초기화된다. (만약 협력자가 싱글턴 빈이라면, 컨테이너에 의해 이미 초기화됐을 것이다.) 모든 참조는 결국 다른 객체의 참조이다. 범위와 검증은 `bean`, `local`, `parent` 요소를 통해 어떤 객체의 ID 혹은 이름을 명시하냐에 따라 결정된다.

`<ref/>` 태그의 `bean` 요소를 통해 타겟 빈을 명시하는 것은 일반적인 형식이고 동일한 XML 파일에 있지 않더라도 동일 컨테이너나 부모 컨테이너의 어떤 참조된 빈이라도 생성할 수 있게 허용한다. `bean` 속성의 값은 타겟 빈의 `id` 속성이나 `name` 속성과 동일하다. 다음 예제는 `ref` 요소를 어떻게 사용하는지 보여준다.:

```xml
<ref bean="someBean"/>
```

`parent` 속성을 통해서 타겟 빈을 명시하는 것은 현재 컨테이너의 부모 컨테이너에 있는 빈의 참조를 생성한다. `parent` 속성의 값은 타겟 빈의 `id` 속성이나 `name` 속성의 값 중 하나와 같다. 타겟 빈은 부모 컨테이너에 있어야 한다. 컨테이너의 계층이 있고 부모 컨테이너에 존재하는 빈을 동일한 이름의 프록시로 감싸고 싶다면 주로 이런 빈 참조 변형을 사용해야 한다. 다음 리스트 쌍은 `parent` 속성을 사용하는 방법을 보여준다.:

```xml
<!-- in the parent context -->
<bean id="accountService" class="com.something.SimpleAccountService">
    <!-- insert dependencies as required as here -->
</bean>
```

```xml
<!-- in the child (descendant) context -->
<bean id="accountService" <!-- bean name is the same as the parent bean -->
    class="org.springframework.aop.framework.ProxyFactoryBean">
    <property name="target">
        <ref parent="accountService"/> <!-- notice how we refer to the parent bean -->
    </property>
    <!-- insert other configuration and dependencies as required here -->
</bean>
```

> `idref` 요소의 `local` 속성은 4.0 beans XSD에서 더이상 지원되지 않는다. 4.0 명세로 업그레이드할 때 `idref local` 참조를 `idref bean`으로 변경하라.

##### 내부 빈

`<property/>` 혹은 `<constructor-arg/>` 요소 내 `<bean/>` 요소는 다음ㄱ뫄 같이 내부 빈을 정의한다.:

```xml
<bean id="outer" class="...">
    <!-- instead of using a reference to a target bean, simply define the target bean inline -->
    <property name="target">
        <bean class="com.example.Person"> <!-- this is the inner bean -->
            <property name="name" value="Fiona Apple"/>
            <property name="age" value="25"/>
        </bean>
    </property>
</bean>
```

내부 빈 정의는 ID나 이름가 필요없다. 만약 명시한다면, 컨테이너는 식별자로써 그 값을 사용하지 않는다. 컨테이너는 `scope` 플래그도 생성 과정에서 무시한다. 왜냐하면 내부 빈은 항상 익명이고 오로지 외부 빈과 함께 생성하기 때문이다. 내부 빈에 독립적으로 접근하거나, 이를 포함하는 (외부) 빈 외에 협력자로 주입하는 것은 불가능하다.

코너 케이스로, 임의의 범위 - 예를들어 싱글턴 빈을 포함한 요청 범위(request-scoped)의 내부 빈 - 로부터의 소멸 콜백(destruction callback)을 받는 것도 가능하다. 내부 빈 인스턴스의 생성은 그 빈이 포함한 빈과 동일하다. 그러나 소멸 콜백은 요청 범위의 라이프사이클 안에서 참여하게 한다. 이는 일반적인 시나리오는 아니고, 내부 빈은 일반적으로 포함하는 빈의 범위를 단순하게 공유한다.

##### 컬렉션

`<list/>`, `<set/>`, `<map/>` 그리고 `<props/>` 요소들은 각각 프로퍼티와 인자로써 Java의 `Collection` 타입 - `List`, `Set`, `Map`, `Properties` - 을 설정한다. 다음 예는 이 것들을 사용하는 방법을 보여준다.:

```xml
<bean id="moreComplexObject" class="example.ComplexObject">
    <!-- results in a setAdminEmails(java.util.Properties) call -->
    <property name="adminEmails">
        <props>
            <prop key="administrator">administrator@example.org</prop>
            <prop key="support">support@example.org</prop>
            <prop key="development">development@example.org</prop>
        </props>
    </property>
    <!-- results in a setSomeList(java.util.List) call -->
    <property name="someList">
        <list>
            <value>a list element followed by a reference</value>
            <ref bean="myDataSource" />
        </list>
    </property>
    <!-- results in a setSomeMap(java.util.Map) call -->
    <property name="someMap">
        <map>
            <entry key="an entry" value="just some string"/>
            <entry key ="a ref" value-ref="myDataSource"/>
        </map>
    </property>
    <!-- results in a setSomeSet(java.util.Set) call -->
    <property name="someSet">
        <set>
            <value>just some string</value>
            <ref bean="myDataSource" />
        </set>
    </property>
</bean>
```

Map의 Key/Value 값, 혹은 Set 값은 다음 요소 중 무엇이라도 가능하다.:

```plain
bean | ref | idref | list | set | map | props | value | null
```

###### 컬렉션 병합

스프링 컨테이너는 컬렉션 병합을 지원한다. 애플리케이션 개발자는 부모 요소인 `<list/>`, `<set/>`, `<map/>` 혹은 `<props/>` 를 정의하고 자식 요소 `<list/>`, `<set/>`, `<map/>` 그리고 `<props/>` 등을 부모 컬렉션으로부터 상속받고 값을 덮어쓸 수 있다. 이는 자식 컬렉션의 값이 부모 컬렉션과 자식 컬렉션의 병합 결과가 되는 것이다. 부모 컬렉션의 특정 값을 자식 요소가 덮어쓸 수 있다.

병합에 대한 이 섹션은 부모-자식 빈 방식에 대해 다룬다. 부모-자식 빈 정의에 대해 낯선 독자는 계속 읽기 전에 [관련 섹션](https://docs.spring.io/spring-framework/docs/5.2.3.RELEASE/spring-framework-reference/core.html#beans-child-bean-definitions)에 대해 먼저 읽어보길 권한다.

다음 예제는 컬렉션 병합을 구현한다.:

```xml
<beans>
    <bean id="parent" abstract="true" class="example.ComplexObject">
        <property name="adminEmails">
            <props>
                <prop key="administrator">administrator@example.com</prop>
                <prop key="support">support@example.com</prop>
            </props>
        </property>
    </bean>
    <bean id="child" parent="parent">
        <property name="adminEmails">
            <!-- the merge is specified on the child collection definition -->
            <props merge="true">
                <prop key="sales">sales@example.com</prop>
                <prop key="support">support@example.co.uk</prop>
            </props>
        </property>
    </bean>
<beans>
```

`adminEmails` 프로퍼티에 `<props/>` 요소에 `merge=true` 속성이 사용된 것을 유심히 봐라. `child` 빈을 생성할 때, 인스턴스는 `adminEmails`라는 `Properties` 컬렉션을 가지고 있다. 이는 자식과 부모의 `adminMails`의 병합 결과를 가지고 있다. 다음 리스트는 그 결과를 나타낸다.:

```properties
administrator=administrator@example.com
sales=sales@example.com
support=support@example.co.uk
```

자식 `Properties` 컬렉션의 값은 부모 `<props/>` 로부터 모든 요소를 상속받아 설정한다. 그리고 자식 컬렉션의 값의 `support` 프로퍼티 값은 부모 컬렉션의 값을 덮어쓰게 된다.

이 병합 행위는 `<list/>`, `<set/>`, `<map/>` 컬렉션 타입들에서 유사하게 지원한다. `<list/>`의 특정한 상황에서, 리스트 컬렉션 타입과 관련된 의미(값이 정렬된 컬렉션과 같은 개념)의 경우 유지된다. 부모 값은 모든 자식 리스트의 값을 앞선다. `Map`, `Set`, `Properties` 컬렉션 타입의 경우, 순서가 존재하지 않는다. 그러므로, 순서라는 의미는 컨테이너가 내부적으로 사용하는 이 타입들의 구현체에선 사실상 없다.

###### 컬렉션 병합의 제한

다른 컬렉션 타입간의 병합은 할 수 없다. 만약 시도한다면, 적절한 예외가 발생할 것이다. `merge` 속성은 자식 정의에 명시해야 한다. 부모 컬렉션 정의에 `merge` 속성을 명시하는 것은 불필요하고 기대하는 병합 결과가 나타나지 않을 것이다.

###### 강타입 컬렉션

Java 5에서 제네릭 타입의 도입으로, 컬렉션의 타입을 제한할 수 있다. 이는 `String` 타입으로 구성된 컬렉션을 선언할 수 있다는 것이다. 만약 스프링을 사용할 때 타입이 명시된 컬렉션을 빈의 의존성으로 주입하면, 스프링 타입 변환 지원 기능의 도움을 얻을 수 있다. 다음 자바 클래스와 빈 정의는 사용 방법을 보여준다.:

```java
public class SomeClass {

    private Map<String, Float> accounts;

    public void setAccounts(Map<String, Float> accounts) {
        this.accounts = accounts;
    }
}
```

```xml
<beans>
    <bean id="something" class="x.y.SomeClass">
        <property name="accounts">
            <map>
                <entry key="one" value="9.99"/>
                <entry key="two" value="2.75"/>
                <entry key="six" value="3.99"/>
            </map>
        </property>
    </bean>
</beans>
```

`something` 빈의 `accounts` 속성이 주입받을 준비가 됐을 때, `Map<String, Float>` 타입의 요소에 대한 제네릭 정보가 리플렉션에 의해 사용 가능해진다. 그러므로 스프링의 타입 변환 기능은 `Float` 타입이 되어야 할 다양한 값 요소와 문자열 값들 (`9.99`, `2.75` 등)을 실제 `Float` 타입으로 변환되어야 함을 인식한다.

##### Null과 빈 문자열 값

스프링은 비어있는 인자를 빈 문자열 `""`처럼 다룬다. 다음 스니핏은 `email` 프로퍼티에 빈 문자열 ("")를 설정하는 예제이다.:

```xml
<bean class="ExampleBean">
    <property name="email" value=""/>
</bean>
```

이전 예제는 다음 자바 코드와 동일하다.:

```java
exampleBean.setEmail("");
```

`<null/>` 요소는 `null` 값을 다룬다. 다음 예제가 이를 보여준다.:

```xml
<bean class="ExampleBean">
    <property name="email">
        <null/>
    </property>
</bean>
```

앞선 설정은 다음 자바 코드와 동등하다.:

```java
exampleBean.setEmail(null);
```

##### p-네임스페이스 XML 축약어

p-네임스페이스는 빈 요소의 속성을 협력하는 빈 프로퍼티를 기술하는 용도로 사용하게 한다.

스프링은 XML 스키마 정의 기반의 [네임스페이스](https://docs.spring.io/spring-framework/docs/5.2.3.RELEASE/spring-framework-reference/core.html#xsd-schemas)로 확장성을 가진 설정 포맷을 지원한다. 이 챕터의 `bean` 설정 포맷은 XML 스키마 문서로 정의된다. 그러나 p-네임스페이스는 XSD 파일로 정의되지 않고 오직 스프링 코어에만 존재한다.

다음 예제는 두 가지 XML 스니핏을 보여준다. 첫 번째는 표준 XML 형식을 사용하고 두 번째는 p-네임스페이스를 사용한다. 두 경우의 결과는 같다.:

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:p="http://www.springframework.org/schema/p"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean name="classic" class="com.example.ExampleBean">
        <property name="email" value="someone@somewhere.com"/>
    </bean>

    <bean name="p-namespace" class="com.example.ExampleBean"
        p:email="someone@somewhere.com"/>
</beans>
```

예제는 `email`이라는 p-네임스페이스의 속성을 빈 정의로 나타낸다. 이는 스프링에게 프로퍼티를 선언하라고 명령하는 것이다. 앞서 말한대로, p-네임스페이스는 스키마 정의에 없기 때문에, 속성의 이름을 프로퍼티 이름으로 설정해야 한다.

다음 예제는 다른 빈을 참조하는 두 가지 이상의 빈 정의를 포함한다.:

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:p="http://www.springframework.org/schema/p"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean name="john-classic" class="com.example.Person">
        <property name="name" value="John Doe"/>
        <property name="spouse" ref="jane"/>
    </bean>

    <bean name="john-modern"
        class="com.example.Person"
        p:name="John Doe"
        p:spouse-ref="jane"/>

    <bean name="jane" class="com.example.Person">
        <property name="name" value="Jane Doe"/>
    </bean>
</beans>
```

이 예제는 p-네임스페이스를 사용하는 프로퍼티 값 뿐만이 아니라 프로퍼티 참조를 선언하는 특별한 형식도 사용한다. 첫 번째 빈 정의가 `<property name="spouse" ref="jane" />` 코드를 사용해서 `john` 빈이 `jane` 빈에 대한 참조를 생성한 반면에, 두 번째 빈 정의는 `p:spouse-ref="jane"` 을 속성으로 사용해서 동일한 작업을 수행한다. 이 경우에 `-ref` 부분은 직접 값을 주입하는게 아니라 다른 빈에 대한 참조를 가리키는 반면에, `spouse` 는 프로퍼티의 이름이다.

> p-네임스페이스는 표준 XML 형식만큼 유연하지 않다. 한 예로, 프로퍼티 참조를 선언하는 형식은 `Ref`로 끝나는 이름을 가진 프로퍼티와 충돌한다. 반면에 표준 XML 포맷은 그렇지 않다. 우린 팀 멤버와 커뮤니케이션 한뒤 조심스럽게 접근하여 모든 방법을 동시에 사용하는 XML 문서 작성을 피할 것을 추천한다.

##### c-네임스페이스 XML 축약어

p-네임스페이스 XML 축약어와 유사하게, c-네임스페이스는 스프링 3.1부터 도입되어, 중첩된 `constructor-arg` 요소 대신 생성자 인자를 인라인 속성으로 설정하는 것을 허용한다.

다음 예제는 `c:` 네임스페이스를 사용해서 [생성자 기반 의존성 주입](#생성자-기반-의존성-주입)과 동일한 작업을 수행한다.:

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:c="http://www.springframework.org/schema/c"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="beanTwo" class="x.y.ThingTwo"/>
    <bean id="beanThree" class="x.y.ThingThree"/>

    <!-- traditional declaration with optional argument names -->
    <bean id="beanOne" class="x.y.ThingOne">
        <constructor-arg name="thingTwo" ref="beanTwo"/>
        <constructor-arg name="thingThree" ref="beanThree"/>
        <constructor-arg name="email" value="something@somewhere.com"/>
    </bean>

    <!-- c-namespace declaration with argument names -->
    <bean id="beanOne" class="x.y.ThingOne" c:thingTwo-ref="beanTwo"
        c:thingThree-ref="beanThree" c:email="something@somewhere.com"/>

</beans>
```

`c:` 네임스페이스는 생성자 인자를 이름으로 설정하는데 `p:` 네임스페이스와 동일한 규칙을 사용한다. 유사하게 XSD 스키마가 정의되어 있지 않지만 XML 파일에 선언되어야 한다. (스프링 코어 내부에 존재한다.)

생성자 인자의 이름이 허용되지 않는 드문 케이스에서, 인자의 순서를 사용할 수 있다.:

```xml
<!-- c-namespace index declaration -->
<bean id="beanOne" class="x.y.ThingOne" c:_0-ref="beanTwo" c:_1-ref="beanThree"
    c:_2="something@somewhere.com"/>
```

> XML 문법에 따라, 인덱스 표기는 `_`를 먼저 써야 한다. XML 속성은 숫자로 시작할 수 없기 때문이다(몇몇 IDE에선 이를 허용함). 상응하는 익덱스 표기는 `<constructor-arg>` 요소에서도 사용할 순 있으나 일반적인 방법으로 충분하다.

실제로 생성자 처리 방식은 인자를 매칭하는데 꽤 효율적이어서, 정말 필요하지 않으면 이름 표기법을 사용하는 것이 좋다.


##### 복합 프로퍼티 이름

빈 프로퍼티를 설정할 때, 마지막 프로퍼티 이름을 제외한 경로 값이 `null`이 아닌 모든 컴포넌트에 대해 복합되거나 중첩판 프로퍼티 이름을 사용할 수 있다. 다음 빈 정의를 고려하라.:

```xml
<bean id="something" class="things.ThingOne">
    <property name="fred.bob.sammy" value="123" />
</bean>
```

`something` 빈은 `bob` 프로퍼티를 가진 `fred` 프로퍼티를 가지고 있다. `bob`은 값이 `123`인 `sammy` 프로퍼티를 가지고 있다. 이 작업에서 `fred`와 `bob` 프로퍼티가 null이 아니어야 한다. 아니면 `NullPointerException`이 발생한다.

#### 1.4.3. `depends-on` 사용하기

만약 다른 빈에서 의존하고 있는 빈이라면 대개 빈이 다른 빈의 프로퍼티로 설정되어 있다는 의미이다. 일반적으로 XML 기반 설정 메타데이터에서 `<ref/>` 요소를 사용해서 해결한다. 그러나 가끔 빈들 사이에 덜 직접적인 의존성이 있을 때가 있다. 데이터베이스 드라이버 등록과 같은, 트리거되어야 하는 클래스의 정적 초기화 블록이 그 예이다. `depends-on` 요소는 빈이  명시적으로 하나 이상의 빈이 초기화되어야 함을 강요한다. 다음 예제는 `depends-on` 속성을 사용해서 단일 빈의 의존성을 표현한다.:

```xml
<bean id="beanOne" class="ExampleBean" depends-on="manager"/>
<bean id="manager" class="ManagerBean" />
```

여러 빈에 대한 의존성을 표현하려면, `depends-on` 속성에 빈 이름의 리스트를 작성한다. (콤마, 공백 그리고 세미콜론이 유효한 구분자임):

```xml
<bean id="beanOne" class="ExampleBean" depends-on="manager,accountDao">
    <property name="manager" ref="manager" />
</bean>

<bean id="manager" class="ManagerBean" />
<bean id="accountDao" class="x.y.jdbc.JdbcAccountDao" />
```

> `depends-on` 속성은 초기화 시점, 그리고 싱글턴 빈의 경우 상응하는 소멸 시점 의존 성의 경우 명시할 수 있다. 먼저 소멸하는 주어진 빈과 `depends-on` 관계를 정의해서 의존하는 빈은 소멸하는 빈에 앞서 소멸한다. 그러므로 `depends-on`은 소멸 명령을 제어하기도 한다.

#### 1.4.4. 지연 초기화 빈 (Lazy-initialized Beans)

기본적으로 `ApplicationContext` 구현체는 초기화 과정의 일부로써 싱글턴 빈을 구성하고 생성한다. 이 인스턴스화 전 단계는 바람직하다. 왜냐하면 몇 시간 혹은 며칠 뒤가 아닌 구성 혹은 주위 환경의 에러가 즉각 발생하기 때문이다. 이 행위가 바람직하지 않을 때, 빈 정의에 지연 초기화로 표시함으로써 싱글턴 빈의 인스턴스화 전 단계를 방지할 수 있다. 지연 초기화 빈은 IoC 컨테이너에게 (구동할 때가 아닌) 빈의 요청이 최초 발생할 때 빈을 생성하라고 지시한다.

XML에서 `<bean/>` 요소의 `lazy-init` 속성에 의해 행동을 제어한다. 다음 예제를 봐라.:

```xml
<bean id="lazy" class="com.something.ExpensiveToCreateBean" lazy-init="true"/>
<bean name="not.lazy" class="com.something.AnotherBean"/>
```

앞선 설정이 `ApplicationContext`에 의해 사용될 때, `lazy` 빈은 `ApplicationContext`가 시작할 때 인스턴스화 되지 않는다. 반면에 `not.lazy` 빈은 인스턴스화한다.

그러나 지연 초기화 빈이 다른 빈에 의존될 때, `ApplicationContext`는 지연 초기화 빈을 구동 시점에 생성한다. 왜냐하면 싱글턴의 의존성을 채워야하기 때문이다. 지연 초기화 빈은 지연 초기화 빈이 아닌 곳으로 주입된다.

`<beans/>` 요소의 `default-lazy-init` 속성을 사용해서 컨테이너 레벨에서 지연 초기화를 제어할 수 있다. 다음 예제를 보자.:

```xml
<beans default-lazy-init="true">
    <!-- no beans will be pre-instantiated... -->
</beans>
```

#### 1.4.5. 협력자 자동주입 (Autowiring Collaborators)

스프링 컨테이너는 협력하는 빈 사이의 관계를 자동 구성한다. `ApplicationContext`의 내용을 검사해서 스프링이 자동으로 협력자(다른 빈)을 주입하게 할 수 있다. 자동 구성은 다음과 같은 장점이 있다.:

* 자동 구성을 사용해서 프로퍼티나 생성자 인자를 명시해야 하는 필요를 줄일 수 있다. ([다른 곳](https://docs.spring.io/spring-framework/docs/5.2.3.RELEASE/spring-framework-reference/core.html#beans-child-bean-definitions)에서 다루는 빈 템플릿과 같은 방식 역시 이와 관련하여 가치있다.)
* 자동 구성은 객체가 발전함에 따라 설정을 업데이트할 수 있다. 한 예로, 만약 클래스에 의존성을 추가해야 한다면, 설정을 수정할 필요 없이 의존성이 자동으로 충족된다. 그러므로 자동 구성은 개발 단계에서 특히 유용하다(코드가 안정적일 때 명시적으로 연결하는 옵션을 부정하지 않는).

XML 기반 설정 메타데이터를 사용할 때([의존성 주입](#1.4.1.-의존성-주입) 참고), `<bean/>` 요소의 `autowire` 속성을 통해 빈 정의에서 자동구성 모드를 명시할 수 있다. 자동 구성 모드는 네 가지가 있다. 빈마다 자동 구성 방법을 선택해서 명시할 수 있다. 다음 표는 네 가지 방법을 기술한다.:

**표 2. 자동구성 모드**

|모드|설명|
|---|---|
|`no`|(기본설정) 자동구성을 하지 않는다. 빈 참조는 `ref` 요소에 의해 정의되어야 한다. 대규모 배포에서 기본 설정을 바꾸는 것은 권고되지 않는다. 왜냐하면 협력자를 명시하는 것은 통제력과 명확성이 향상되기 때문이다. 이는 어느정도 시스템의 구조를 문서화한다.|
|`byname`|프로퍼티 이름으로 자동 구성한다. 스프링은 자동 구성해야하는 프로퍼티와 동일한 이름을 가진 빈을 탐색한다. 예를 들어 빈 정의에 `master` 프로퍼티를 포함하고 이름으로 자동 구성하게 설정되어 있으면, 스프링은 `master`라는 이름을 가진 빈 정의를 찾고 프로퍼티를 설정할 때 그 빈을 사용한다.|
|`byType`|컨테이너에서 자동구성하려는 프로퍼티가 타입 당 하나의 빈만 존재할 때 사용하자. 만약 여러개으이 빈이 존재한다면, 치명적인 예외가 발생할 것이다. 만약 일치하는 빈이 존재하지 않으면, 아무 일도 일어나지 않는다. (프로퍼티는 설정되지 않음)|
|`constructor`|`byType`과 유사하지만 생성자 인자에 적용된다. 만약 생성자 인자 타입의 빈이 정확히 하나가 아니라면 치명적인 오류가 발생한다.|

##### 자동 구성의 제약과 단점

자동 구성은 프로젝트 전체에서 일관되게 사용할 때 잘 작동한다. 만약 자동 구성이 일반적으로 사용되지 않는다면, 개발자는 몇몇 빈 정의에서 구성할 때 사용하는건지 혼란스러울 것이다.

자동 구성의 제약과 단점에 대해 고려하라.:

* 프로퍼티와 생성자 인자의 명시적 의존성 설정은 항상 자동 구성을 우선한다. 원시 타입, 스트링, 클래스, 배열 등과 같은 단순 프로퍼티는 자동 구성할 수 없다. 이는 설계상의 제약이다.
* 자동 구성은 명시적 구성보다 덜 정확하다. 앞선 표에 기술한 것 처럼 스프링이 예상치 못한 결과를 가진 모호한 경우를 피하려고 애쓴다. 스프링이 관리하는 객체들 사이의 관계는 명시적으로 문서화되지 않을 것이다.
* 스프링 컨테이너로부터 문서를 생성하는 도구는 구성이 불가능할 수 있다.
* 컨테이너의 여러 빈 정의들은 세터 메서드나 생성자 인자에 의해 타입이 자동 구성해야 할 빈과 일치해야 한다. 배열, 컬렉션 혹은 맵 인스턴스의 경우 이는 문제가 아니지만, 단일 값을 가지는 경우, 모호함이 의도한대로 해결되지 않을 수 있다. 만약 유일한 빈 정의가 없다면, 예외가 발생할 것이다.

마지막 시나리오에서 여러 옵션이 있다:

* 명시적인 구성으로 바꾼다.
* [다음 섹션](https://docs.spring.io/spring-framework/docs/5.2.3.RELEASE/spring-framework-reference/core.html#beans-factory-autowire-candidate)에서 기술할, 자동 구성 속성을 `false`로 설정하여 자동 구성을 회피한다.
* 하나의 빈 정의를 `<bean/>` 요소의 `primary` 속성을 true로 설정하여 우선 순위로 지정한다.
* [어노테이션 기반 컨테이너 설정](https://docs.spring.io/spring-framework/docs/5.2.3.RELEASE/spring-framework-reference/core.html#beans-annotation-config)에서 기술할, 어노테이션 기반 설정으로 더욱 세밀한 제어가 가능하게 구현한다.

##### 자동 구성으로부터 빈 제외하기

빈마다 자동 구성으로부터 설정을 비활성화 할 수 있다. 스프링의 XML 포맷에서 `<bean/>` 요소의 `autowire-candidate` 속성을 `false`로 설정한다. 컨테이너는 특정 빈 정의를 (`@Autowired`와 같은 어노테이션 스타일 설정을 포함해서) 자동 구성하지 못하도록 한다.

> `autowire-candidate` 속성은 타입 기반 자동구성에서만 적용하도록 설계되었다. 이는, 특정 빈이 자동 구성 빈이 아니라고 표시되어 있어도, 이름에 의한 참조에선 적용되지 않는다. 그럼에도 불구하고 결과적으로 이름에 의한 자동 구성은 이름이 일치해도 주입될 것이다.

빈 이름 패턴 매칭을 기반으로 자동 구성 빈을 제한할 수 있다. 탑 레벨 `<beans/>` 요소는 `default-autowire-candidates` 속성 내에 하나 이상의 패턴을 허용한다. 예를 들어, `Repository`로 끝나는 이름을 가진 빈을 자동 구성 요소에서 제외하려면, `*Repository` 값을 패턴에 설정한다. 여러 패턴을 사용하려면, 쉼표(`,`)를 구분자로 사용한다. 빈 정의 `autowire-candidate` 속성애 `true`나 `false`같은 명시적인 값은 항상 우선한다. 특정 빈에선 패턴 매칭 규칙은 적용되지 않는다.

이런 기술은 특정 빈이 자동 구성에 의해 주입되길 원하지 않을 때 유용하다. 이는 자동 구성을 사용해서 제외된 빈 자체를 구성할 수는 없다. 빈 스스로 자동구성할 빈의 후보가 될 순 없다.

#### 1.4.6. 메서드 주입 (Method Injection)

대개의 애플리케이션 시나리오에서, 대부분의 빈들은 싱글턴이다. 싱글턴 빈이 다른 싱글턴 빈이나 싱글턴이 아닌 빈들과 협력해야 할 때, 보통 다른 빈의 프로퍼티로 의존성을 다룰 것이다. 빈 라이프사이클이 상이할 때 문제가 발생할 것이다. 싱글턴 빈 A가 각 메서드를 호출할 때마다 프로토타입 빈 B를 사용한다고 가정하자. 컨테이너는 싱글턴 빈 A를 1회 생성한다. 그러므로 프로퍼티를 설정할 기회는 오로지 한 번이다. 컨테이너는 필요할 때 마다 새로운 빈 인스턴스 B를 제공할 수 없다.

솔루션은 어떤 제어 역전을 선행하는 것이다. `ApplicationContext` 인터페이스를 구현하고 `getBean("B")` 코드로 빈 인스턴스 B가 필요할 때마다 컨테이너에게 요청해서 빈 인스턴스 A를 만들 수 있다. 다음 예제는 이런 접근을 보여준다.:

```java
// a class that uses a stateful Command-style class to perform some processing
package fiona.apple;

// Spring-API imports
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class CommandManager implements ApplicationContextAware {

    private ApplicationContext applicationContext;

    public Object process(Map commandState) {
        // grab a new instance of the appropriate Command
        Command command = createCommand();
        // set the state on the (hopefully brand new) Command instance
        command.setState(commandState);
        return command.execute();
    }

    protected Command createCommand() {
        // notice the Spring API dependency!
        return this.applicationContext.getBean("command", Command.class);
    }

    public void setApplicationContext(
            ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
```

앞선 예제는 바람직하지 않다, 왜냐하면 비즈니스 코드가 스프링 프레임워크를 인지하고 결합되어 있기 때문이다. 스프링 IoC 컨테이너의 기능인 메서드 주입은 이런 상황을 깔끔하게 정리한다.

> 메서드 주입의 동기에 대해 알고 싶다면 [이 블로그](https://spring.io/blog/2004/08/06/method-injection/)를 참고하라.

##### 탐색 메서드 주입 (Lookup Method Injection)

탐색 메서드 주입은 메서드를 컨테이너가 관리하는 빈의 메서드를 다른 빈을 이름으로 탐색해서 반환하게 하는 컨테이너의 기능이다. 일반적으로 탐색은 프로토타입 빈도 포함한다. 스프링 프레임워크는 CGLIB 라이브러리의 바이트 코드 생성 기능을 사용해서 메서드 주입을 구현한다. 동적으로 메서드를 오버라이드하는 서브클래스를 생성한다.

> * 동적으로 서브클래스를 생성하는 작업을 할 때, `final` 클래스, `final` 메서드는 오버라이드 할 수 없다.
> * `abstract` 메서드를 가진 클래스의 단위테스트는 클래스 자신의 서브클래스를 생성하고 `abstract` 메서드에 대한 stub을 구현해야 한다.
> * 구체 메서드는 구체 클래스 탐색을 위한 컴포넌트 스캔을 위해 필요하다.
> * 추가적인 제한사항으로 탐색 메서드가 팩토리 메서드에서 동작하지 않으며, 특히 `@Bean` 메서드에서 작동하지 않는다. 왜냐하면 이 경우에 컨테이너는 인스턴스를 생성할 책임이 없어서 런타임 시점에 서브클래스를 생성할 수 없다.

`CommandManager` 클래스의 경우, 스프링 컨테이너는 동적으로 `createCommand()` 메서드를 오버라이드해서 구현한다. `CommandManager` 클래스는 스프링 의존성이 없다.:

```java
package fiona.apple;

// no more Spring imports!

public abstract class CommandManager {

    public Object process(Object commandState) {
        // grab a new instance of the appropriate Command interface
        Command command = createCommand();
        // set the state on the (hopefully brand new) Command instance
        command.setState(commandState);
        return command.execute();
    }

    // okay... but where is the implementation of this method?
    protected abstract Command createCommand();
}
```

주입될 메서드를 포함하는 클라이언트 클래스 (이 경우엔 `CommandManager` 클래스) 는 다음과 같은 형식의 시그니쳐가 필요하다.

```plain
<public|protected> [abstract] <return-type> theMethodName(no-arguments);
```

만약 추상 메서드라면, 동적으로 생성된 서브클래스가 메서드를 구현한다. 아니면, 원래 클래스에 정의된 구체 메서드를 덮어쓴다. 다음 예를 고려해라.:

```xml
<!-- a stateful bean deployed as a prototype (non-singleton) -->
<bean id="myCommand" class="fiona.apple.AsyncCommand" scope="prototype">
    <!-- inject dependencies here as required -->
</bean>

<!-- commandProcessor uses statefulCommandHelper -->
<bean id="commandManager" class="fiona.apple.CommandManager">
    <lookup-method name="createCommand" bean="myCommand"/>
</bean>
```

`commandManager`로 식별되는 빈은 `myCommand` 빈이 필요 할 때마다 `createCommand()` 메서드를 호출한다. 실제로 필요한 경우 `myCommand` 빈을 프로토타입으로 다뤄야한다. 만약 싱글턴이라면, 매번 동일한 인스턴스인 `myCommand` 빈이 반환될 것이다.

어노테이션 기반 컴포넌트 모델의 경우, 다음 예제와 같이 `@Lookup` 어노테이션을 통해 탐색 메서드를 선언할 수 있다.:

```java
public abstract class CommandManager {

    public Object process(Object commandState) {
        Command command = createCommand();
        command.setState(commandState);
        return command.execute();
    }

    @Lookup("myCommand")
    protected abstract Command createCommand();
}
```

관용적으로, 탐색 메서드의 반환 타입으로 타겟 빈을 식별할 수 있다. 

```java
public abstract class CommandManager {

    public Object process(Object commandState) {
        MyCommand command = createCommand();
        command.setState(commandState);
        return command.execute();
    }

    @Lookup
    protected abstract MyCommand createCommand();
}
```

추상 클래스가 기본적으로 무시되는 스프링 컴포넌트 스캔 규칙에 호환되려면, 일반적으로 어노테이션 탐색 메서드는 구체 스텁 구현을 통해 선언해야 한다. 이 제한은 명시적으로 등록되었거나 명시적으로 클래스 등록된 빈 클래스엔 적용하지 않는다.

상이한 범위가 적용된 타겟 빈에 접근하는 다른 방법으로 `ObjectFactory`/`Provider` 주입 포인트가 있다. [Scoped Beans as Dependencies](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-other-injection) 부분을 참고하라.  
`org.springframework.beans.factory.config` 패키지의 `ServiceLocatorFactoryBean`도 유용하다.

##### 임의의 메서드 교체 (Arbitrary Method Replacement)

탐색 메서드 주입보다 덜 유용한 방법으로 빈의 또다른 메서드 구현을 통한 임의의 메서드 교체가 있다. 실제로 이 기능이 필요하지 않으면 나머지 부분을 건너뛰어도 된다.

XML 기반 설정 메타데이터에서, `replaced-method` 요소를 사용해서 배치된 빈에 존재하는 메서드 구현을 다른 것으로 교체할 수 있다. 오버라이드하려는 `computeValue` 메서드를 가진 다음 클래스를 살펴보아라.:

```java
public class MyValueCalculator {

    public String computeValue(String input) {
        // some real code...
    }

    // some other methods...
}
```

`org.springframework.beans.factory.support.MethodReplacer` 인터페이스를 구현한 클래스는 새 메서드 정의를 제공한다. 다음 예를 보자.:

```java
/**
 * meant to be used to override the existing computeValue(String)
 * implementation in MyValueCalculator
 */
public class ReplacementComputeValue implements MethodReplacer {

    public Object reimplement(Object o, Method m, Object[] args) throws Throwable {
        // get the input value, work with it, and return a computed result
        String input = (String) args[0];
        ...
        return ...;
    }
}
```

원래 클래스를 배포하고 메서드 오버라이드를 명시하는 빈 정의 예제는 다음과 같다.:

```xml
<bean id="myValueCalculator" class="x.y.z.MyValueCalculator">
    <!-- arbitrary method replacement -->
    <replaced-method name="computeValue" replacer="replacementComputeValue">
        <arg-type>String</arg-type>
    </replaced-method>
</bean>

<bean id="replacementComputeValue" class="a.b.c.ReplacementComputeValue"/>
```

하나 이상의 `<arg-type/>` 요소를 `<replaced-method/>` 요소 내에 사용해서 오버라이드하려는 메서드의 시그니쳐를 지정할 수 있다. 인자에 대한 시그니쳐는 클래스 내에 존재하는 오직 메서드가 오버로드되어 여러 경우가 존재할 때만 필요하다. 편의상 인자의 타입 문자열은 적절한 타입 명의 부분문자열이 될 수 있다. 예를 들어 `java.lang.String`은 다음과 일치한다.:

```plain
java.lang.String
String
Str
```

인자의 수는 가끔 개별 가능한 선택을 구별하기에 충분하기 때문에, 이 축약어는 타이핑을 줄일 수 있다.

### 1.5. 빈 범위 

빈 정의를 작성할 때, 빈 정의의 클래스 실제 인스턴스를 생성하는 레시피를 작성한다. 빈 정의가 레시피라는 아이디어는 중요하다, 이는 하나의 레시피로 많은 객체 인스턴스를 만들 수 있다는 의미이다. 

특정 빈 정의로 생성된 객체에 연결할 의존성이나 설정 값과 같은 것뿐만이 아니라, 객체의 범위까지 제어할 수 있다. 이 접근은 강력하고 유연하다. 자바 클래스 레벨에서의 객체 범위를 다루지 않고, 작성한 설정을 통해 객체의 범위를 선택할 수 있기 때문이다. 빈은 많은 범위 중 하나를 선택하여 정의할 수 있다. 스프링 프레임워크는 여섯 종류의 범위를 제공한다, 그 중 네 가지는 웹과 관련된 `ApplicationContext`에서만 사용 가능하다. 또한 커스텀 범위를 만들 수도 있다.

다음 표는 제공되는 범위를 기술한 것이다.

**표 3. 빈 범위**

|범위|설명|
|---|---|
|싱글턴(singleton)|(기본) 스프링 IoC 컨테이너마다 빈 정의당 하나의 객체 인스턴스만을 가진다.|
|프로토타입(prototype)|빈 정의당 여러 객체 인스턴스를 가질 수 있다.|
|요청(request)|빈 정의당 단일 HTTP 요청의 라이프사이클을 범위로 가진다. 각각의 HTTP 요청은 빈 정의로 생성된 하나의 인스턴스 빈을 가진다. 오직 웹 관련 `ApplicationContext`에서만 유효하다.|
|세션(session)|빈 정의당 HTTP `Session`의 라이프사이클을 범위로 가진다. 오직 웹 관련 `ApplicationContext`에서만 유효하다.|
|애플리케이션(application)|빈 정의당 `ServletContext`의 라이프사이클을 범위로 가진다. 오직 웹 관련 `ApplicationContext`에서만 유효하다.|
|웹소켓(websocket)|빈 정의당 `WebSocket`의 라이프사이클을 범위로 가진다. 오직 웹 관련 `ApplicationContext`에서만 유효하다.|

> 스프링 3.0부터, 쓰레드 범위가 사용 가능하지만 기본적으로 등록되어있진 않다. 더 만흥ㄴ 정보는 `SimpleThreadScope` 문서를 살펴봐라. 이 범위를 등록하는 방법이나 다른 커스텀 범위에 대한 내용은 [커스텀 범위 사용하기](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-scopes-custom-using)를 살펴봐라.

#### 1.5.1. 싱글턴 범위

오직 싱글턴 빈 하나의 인스턴스만이 관리되고, 스프링 컨테이너에 의해 빈에 대한 모든 요청이 하나의 빈 인스턴스만 반환한다.

빈을 정의하고 범위가 싱글턴일 때, 스프링 IoC 컨테이너는 빈 정의에 의해 객체당 정확히 하나의 인스턴스만 생성한다. 이 인스턴스는 싱글턴 빈 캐시에 저장된다. 그리고 이후 빈에 대한 요청과 참조는 캐시된 객체를 반환한다. 다음은 싱글턴 범위가 동작하는 방법을 나타낸다.:

![싱글턴 작동원리](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/images/singleton.png)

싱글턴 빈에 대한 스프링 컨셉은 GoF 디자인 패턴에 정의된 싱글턴과 다르다. GoF 싱글턴은 객체의 범위를 하드코드로 제한하고 클래스로더 당 특정 클래스의 하나의 인스턴스만 가지게 한다. 스프링 싱글턴의 범위는 컨테이너 당, 빈 당 하나로 제한된다. 이는 단일 스프링 컨테이너에서 특정 클래스의 하나의 빈을 정의한다면, 스프링 컨테이너는 빈 정의에 의해 하나의 클래스의 인스턴스를 생성한다는 것이다. 싱글턴 범위는 스프링 기본 범위이다. XML로 싱글턴 빈을 정의하려면, 다음 예제처럼 정의하면 된다.:

```xml
<bean id="accountService" class="com.something.DefaultAccountService"/>

<!-- the following is equivalent, though redundant (singleton scope is the default) -->
<bean id="accountService" class="com.something.DefaultAccountService" scope="singleton"/>
```

##### 1.5.2. 프로토타입 범위

싱글턴이 아닌 프로토타입 범위는 특정 빈에 대한 매 요청마다 새로운 빈 인스턴스를 생성한다. 빈이 다른 빈에 주입되거나 `getBean()` 메서드로 컨테이너에게 호출해서 빈을 요청한다. 규칙에 따라, 상태를 가진(stateful) 빈은 프로토타입 범위를 사용해야 하고, 상태가 없는(stateless) 빈은 싱글턴 범위를 사용해야 한다.

다음 다이어그램은 스프링 프로토타입 범위를 나타낸다.:

![prototype](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/images/prototype.png)

(Data Access Object(DAO)는 보통 프로토타입으로 구성되지 않는다. 왜냐하면 DAO는 특정 상태를 가지고 있지 않기 때문이다.)

다음 예는 XML에서 프로토타입 빈을 정의한다.:

```xml
<bean id="accountService" class="com.something.DefaultAccountService" scope="prototype"/>
```

다른 범위와 대조적으로, 스프링은 프로토타입 빈의 모든 라이프사이클을 관리하지 않는다. 컨테이너는 프로토타입 객체를 인스턴스화하고, 구성한다. 그리고 빈을 클라이언트에게 건낸다. 그리고 이 과정에서 아무런 기록이 없다. 그러므로 모든 범위의 객체에서 초기화 라이프사이클 콜백 메서드가 호출됨에도, 프로토타입의 경우 소멸(destsruction) 콜백이 호출되지 않는다. 클라이언트 코드는 프로토타입 객체에 대해 스스로 정리해야 하고, 객체가 소유한 자원을 해제해야 한다. 스프링 컨테이너가 프로토타입 빈을 해제하려면 [bean post-processor](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-extension-bpp)를 사용해라.  이는 정리해야 할 빈의 참조를 가지고 있다.

어떤 점에서 스프링 컨테이너 프로토타입 빈의 역할은 자바 `new` 연산자를 대체하는 것이다.모든 생명주기는 클라이언트가 관리해야 한다. (스프링 컨테이너 빈의 생명주기는 [생명주기 콜백](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/core.html#beans-factory-lifecycle)을 참고하라.)

> Work In Process

##### 1.5.3. 프로토타입 빈을 의존하는 싱글턴 빈
##### 1.5.4. 요청, 세션, 애플리케이션, 웹소켓 범위
##### 1.5.5. 커스텀 범위

### 1.6. 빈 생태계 커스터마이징
### 1.7. 빈 정의 상속
### 1.8. 컨테이너 확장 지점
### 1.9. 어노테이션 기반 컨테이너 설정
### 1.10. 클래스패스 스캐닝과 컴포넌트 관리
### 1.11. JSR 330 표준 어노테이션 사용하기
### 1.12. Java 기반 컨테이너 설정
### 1.13. 환경 추상화
### 1.14. LoadTimeWeaver 등록하기
### 1.15. ApplicationContext의 추가 기능
### 1.16. BeanFactory