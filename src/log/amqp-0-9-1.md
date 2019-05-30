# AMQP 0-9-1

## 개요

AMQP 0-9-1(Advanced Message Queueing Protocol)는 메세징 프로토콜이다. 메세징 브로커를 따르는 클라이언트들(producer, consumer, publisher, subscriber, ...) 간의 통신을 가능하게 한다.

## 브로커

메세징 브로커는 publisher(or producer)로부터 메세지를 받는다. 그리고 메세지를 이용하려는 consumer(or subscriber)에게 전달한다. AMQP는 네트워크 프로토콜이기 때문에, 생산자와 소비자, 그리고 브로커는 각각 다른 네트워크 환경에서 존재하고 서로 통신할 수 있다.

## 모델

1. 생산자로부터 메세지가 생성되어 *exchange*로 전송한다.
  * Exchange: 메세지가 브로커에 도착하는 공간, 메세지 브로커에 존재하는 개념
1. Exchange와 연결된 *queue*에 메시지 복사본을 배포한다.
  * Queue: 메세지를 적재하는 큐, 큐에 적재된 메세지는 큐와 연결된 소비자에 의해 소비된다.
  * Binding: exchange와 queue를 연결하는 일종의 규칙
1. 브로커는 큐에 연결된 소비자에게 메세지를 전달한다. 혹은 소비자가 의도한 때에 큐에게 fetch/pull 방식으로 메세지를 꺼내온다.

![AMQP Model](https://www.rabbitmq.com/img/tutorials/intro/hello-world-example-routing.png)

메세지를 발행할 때, 생산자는 여러가지 메세지 속성(message attribute, meta-data)을 명시한다. 몇몇 메타 데이터는 브로커에 의해 사용된다. 그러나 나머지는 브로커에게 완벽하게 가려지고 오직 메세지를 수령하는 애플리케이션에 의해서만 사용된다.

네트워크는 불안정할 수 있고 애플리케이션은 메세지 처리에 실패할 수 있다. 그래서 AMQP는 acknowledgement 개념이 존재한다. 소비자는 메세지를 받으면 브로커에게 잘 받았다고 알려준다. 혹은 자동적으로 알림처리하거나 애플리케이션 개발자가 선택할 수 있다. acknowledgement를 사용하면, 브로커는 알림을 받은 메세지를 큐에서 제거한다.

## Exchange

Exchange는 메세지를 전송한 곳이다. exchange는 생산자로부터 메세지를 받아서 특정한 큐로 메세지를 전달한다. exchange type에 따라 라우팅 방식이 달라지고 이런 규칙을 바인딩이라고 한다.

* Direct: 라우팅 키를 기반으로 메세지를 전달한다.
  * 정확히 키가 일치해야 메세지가 소비자에게 전달된다.
  * 동일한 키를 가진 큐가 여러개 존재할 수 있다. (multicast)
* Fanout: 라우팅 키를 무시하고 바인딩 된 모든 큐에 메세지를 전달한다.(broadcast)
* Topic: 라우팅 키 패턴매칭 방식으로 큐에 메세지를 전달한다.
  * Pub/Sub 패턴에 응용된다.
* Headers: 메세지 헤더로 전달방식을 결정한다.
  * 라우팅 키를 무시한다.
  * `x-match` 헤더는 `all` 혹은 `any`값을 가지며 모든 헤더 조건이 일치(all)하거나 하나라도 일치하는 조건(any)를 구분한다.

> 주의사항
> 메세지 로드밸런스는 소비자 간에 라운드로빈 방식으로 이루어진다. 큐 간에 이루어지는게 아니다.
> 만약 큐 'a'에 소비자 애플리케이션이 2개 연결되어 있는 경우, 큐에 전달되는 메세지는 라운드로빈 방식으로 두개의 애플리케이션에 분배된다. 

exchange는 다양한 속성과 함께 정의된다. 아래는 중요한 속성들의 목록이다.

* Name: exchange의 이름
* Durability: 브로커를 재기동한 후에도 exchange를 유지한다.
* Auto-delete: exchange에 바인딩 된 큐가 없는 경우 삭제된다.
* Arguments



## 키워드

* exchange
* queue
* binding
* message meta-data
* Acknowledgement