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

특정 빈을 생성하는 방법에 대한 정보를 포함한 빈 정의 외에도, `ApplicationContext` 구현체는 (사용자에 의해) 컨테이너 외부에서 생성된 객체 등록도 허용한다. 

> Work In Process

### 1.4. 의존성
### 1.5. 빈 범위 
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