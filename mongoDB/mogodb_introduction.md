# MongoDB 소개

## MongoDB는?
MongoDB는 고성능, 고가용성, 자동 스케일링을 제공하는 오픈소스 Document Database입니다.

## Document Database?
MongoDB의 레코드(Field, Value 쌍으로 구성된 자료구조)를 Document라고 부릅니다. MongoDB의 document는 JSON 객체와 유사합니다. 필드의 값은 다른 document나 array, document array를 포함할 수 있습니다.

    // document 예제
    {
      name: "Jim",                  // field:value pair
      age: 20,                      // field:value pair
      subjects: ["English", "Math"] // field:value pair
    }

### Document의 장점

  * document는 많은 프로그래밍 언어의 자료형에 부합한다.(객체)
  * 내장된 document와 array는 join의 비용을 감소시킨다.
  * 동적 스키마는 유연한 다형성을 지원한다.

## 주요 특성 (차후 자세히 봐야할 내용)
### 고성능
MongoDB는 고성능의 데이터 [영속성](http://homo-ware.tistory.com/4)을 제공한다. 특히,

* 데이터베이스 시스템의 입출력 행위 감소
* 질의를 더 빠르게 지원하고 내장된 document와 array로부터의 Key를 포함한 인덱스

### Rich Query Language
MongoDB는 읽기/쓰기 동작을 지원하는 Rich Query Language를 제공한다.

* Data Aggregation
* Text Search & Geospatial Queries

### High Availability
### Horizontal Scalability
### 여러 스토리지 엔진 지원
MongoDB는 아래와 같은 스토리지 엔진을 지원한다.

* WiredTiger Storage Engine
* MMAPv1 Storage Engine.

추가적으로 MongoDB를 위한 스토리지 엔진을 개발하는 서드 파티를 지원하는 API를 제공하고 있다.



  https://docs.mongodb.com/manual/introduction/
