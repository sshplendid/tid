# `Log`와 `Logger` 차이, 그리고 다른 로깅 프레임워크

결론적으로 사용하는 API의 차이

## Commons Logging

```java
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

class Foo {
    private static final Logger LOG = Logger.getLogger(Foo.class);
}
```

## Log4J

```java
import org.apache.log4j.Logger;

class Foo {
    private static final Log LOGGER = LogFactory.getLog(Foo.class);
}
```

## Slf4J

  * `Log4J`를 만든 Ceki Gülcü가 만든 프레임워크.
  * Logging Facade로 [LOGback](), [LOG4J](), [Commons Logging]() 등 구현체 프레임워크와 상관 없이 일관된 코드 작성 가능
  * 참고: [logback 사용해야 하는 이유 (Reasons to prefer logback over log4j)](https://beyondj2ee.wordpress.com/2012/11/09/logback-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%95%BC-%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-reasons-to-prefer-logback-over-log4j/)

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class Foo {
    private static final Logger LOGGER = LoggerFactory.getLogger(Foo.class);
}
```
## LOGback

  * LOG4J의 아키텍쳐 기반
  * 메모리 점유율 및 속도 등 비약적인 성능 개선
