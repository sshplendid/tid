## 코틀린 기본

### 특징

* `static` 예약어가 없다. Top-level에 선언하면 됨.
* 클래스 선언 없이 함수, 변수를 사용 가능
* 세미콜론(`;`)을 강제하지 않는다. (`enum` class 선언 제외)

### 코틀린 파일 정의

* 확장자는 *.kt
* 파일과 클래스를 구분

```java
class Student {
    int id;
    void getId() {
        return this.id;
    }
}
```

```kotlin
class Student {
    var id: int = 10
    fun getId() {
        ...
    }
}
```

클래스 없이 변수, 함수 단독으로 정의 가능하다.  
> 코틀린은 변수, 함수도 Top-level에 선언할 수 있다.  
함수 내 함수, 클래스도 선언 가능하다.  
Java의 경우, class만 Top-level에 선언할 수 있다.

```kotlin
package com.example.student

import java.util.*

var sum = 0

fun calSum() {
    for (i in 1..10) {
        sum += i
    }
}

class student {

    var id: int = 10

    fun getId() {
        id
    }
    
    fun hello() {
        println("hello")
    }
}

fun main(args: Array<String>) {
    calSum()
    println(sum)
    user
}
```

### 패키지

* 다른 패키지의 함수나 변수를 import하려면? 직접 import해서 사용하면 됨

```kotlin
package com.example.two

val threeVal = 10
fun threeFun() {

}
```

```kotlin
package com.example.one

import com.example.two.threeVal
import com.example.two.threeFun

...
```

* 가상패키지: 실제 위치와 다른 패키지명을 사용할 수 있다.

파일구조
```plain
src
└─one
  └─file.kt
```

```kotlin
package my.package

...
```

* 이름 변경해서 임포트할 수 있다.

```kotlin
import java.util.Date as MyDate
```

#### 기본 패키지

```plain
java.lang.*
kotlin.*
kotlin.io.*
kotlin.collections.*
...
```