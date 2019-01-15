# 클래스

* `class` 예약어로 선언
* 클레스 몸체(`{}`)가 없다면 생략 가능
* `new` 연산자가 없다.
* 생성자
  * `constructor` 키워드로 생성
  * 주 생성자(primary constructor)
    * 클래스 선언부분에 작성
    * 하나의 클래스에 하나의 주 생성자만 정의 가능
    * 보조 생성자(secondary constructor)가 있다면 주 생성자는 없어도 됨
  * 보조 생성자(secondary constructor)
    * 클래스 body 영역에 선언
  * class 내에 무조건 1개의 생성자가 존재
  * 선언하지 않으면 컴파일러가 주 생성자(매개변수 없는) 선언
  * 개발자에의해 주 생성자, 보조 생성자 선언 가능
  * **모두 선언되었다면, 보조 생성자에선 무조건 주 생성자 호출**
  * 생성자 매개변수
    * 클래스의 초기화(`init`) 블록, 클래스 프로퍼티에서는 접근이 되지만, 클래스에 정의된 함수에서는 사용불가
    ```kotlin
    class User(name: String, age: Int) {
        init {
            // 객체가 생성되는 순간 생성자 초기화
            println("init... name: $name, age: $age") // OK
        }

        val upperName = name.toUpperCase() // OK

        fun sayhello() {
            println("hello $name") // [!] error
        }
    }
    ```
    * 주 생성자 내에서 `var`, `val`을 이용해서 매개변수를 선언하면 **클래스 멤버**가 됨 (보조 생성자는 해당안됨)
    ```kotlin
    class User(val name: String, val age: Int) { // name, age는 멤버변수가 됨
        val upperName = name.toUpperCase()
        init {
            println("init... name: $name, age: $age") // OK
        }

        fun sayHello() {
            println("hello $name") // OK
        }


## 결론

* 클래스 생성자 한개만 생성(권장사항) => **주 생성자 이용**
  * 멤버 변수 선언하기 편하다
  * 매개변수들 중 필수 매개변수만 주 생성자로 선언
  * 보조 생성자에서는 주 생성자 연결