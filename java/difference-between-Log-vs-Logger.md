# `Log`와 `Logger` 차이

결론적으로 사용하는 API의 차이

## Commons Logging

```java
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Logger;

class Foo {
  private static final Logger logger = Logger.getLogger(Object.class);
}
```

## Log4j

```java
import org.apache.log4j.Logger;

class Foo {
	private static final Log LOGGER = LogFactory.getLog(IfRMeGstElementESBBApp.class);
}
```
