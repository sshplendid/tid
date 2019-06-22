# DynamoDB

## 개요

DynamoDB는?

* NoSQL 데이터베이스 서비스
* AWS에서 서비스
* [유휴시 암호화 제공](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/EncryptionAtRest.html)
* AWS management console을 통해 사용량 측정 가능
  * 프로비저닝 가능
* [온디맨드 백업기능](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/BackupRestore.html) 제공
* [특정 시점으로 복구](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/PointInTimeRecovery_Howitworks.html) 가능: 최근 35일 중 원하는 시점으로 복구
* 데이터에 TTL(Time To Live) 설정 가능
* 고가용성 및 내구성
  * 테이블의 데이털르 충분한 수의 서버로 자동 분산 -> 일관되게 빠른 성능 보장
  * 모든 데이터가 SSD에 저장되고 여러 리전에 걸쳐 복제 -> 고가용성 및 내구성 보장
  * [전역 테이블](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/GlobalTables.html)을 사용하여 여러 리전간에 테이블 동기화 가능

## 특징

### 읽기 일관성 (Consistency Read)

다이나모DB는 데이터를 읽을 때 최근에 변경내역이 반영되지 않을 수 있다. 아래 작업이 순차적으로 일어날 경우, 3번 작업에서 이름이 홍길동으로 나올 수도 있다.

1. 데이터를 쓴다. `{"Key": 1, "이름": "홍길동"}`
1. 데이터를 변경한다. `{"Key": 1, "이름": "홍두깨"}`
1. Key: 1인 항목을 조회한다. -> `{"Key": 1, "이름": ?}`

이를 최종적 읽기 일관성 (Eventually Consistency Read)라고 한다.

#### 강력한 읽기 일관성 (Strongly Consistency Read)

* 이전 쓰기작업의 업데이트를 모두 반영하여 조회하고 싶은 경우, 강력한 읽기 일관성을 사용한다.
* DynamoDB 읽기 API는 기본적으로 최종적 읽기 일관성을 사용한다. 강력한 읽기 일관성을 사용하고 싶으면 ConsistencyRead 파라미터를 true로 설정한다. 이 경우 읽기 요청단위가 달라진다. (읽기/쓰기 용량모드 참고)
* GSI는 강력한 읽기 일관성을 지원하지 않는다.

### 읽기 쓰기 용량모드

* 읽기 요청 유닛 1개는 강력한 읽기 일관성으로 4kb 데이터를 읽을 수 있다.
  * 최종적 읽기 일관성을 사용할 경우 0.5 유닛을 소비한다.
  * 8kb 데이터를 읽을 경우, 강력한 읽기 일관성 모드에서 유닛 2개, 최종적 읽기 일관성 모드에서 유닛 1개를 소비한다.
* 쓰기 요청 유닛 1개는 1kb 데이터를 쓸 수 있다.

### 파티션 및 데이터 배포

* DynamoDB는 테이블을 생성할 때 충분한 수의 파티션을 할당한다.
  * 파티션의 한도가 초과하여 테이블의 처리량을 늘려야 할때 파티션을 늘린다.
  * 추가적인 스토리지 공간이 필요햔 경우 파티션을 늘린다.
* 데이터를 쓸 때, 파티션 키값으로 해시값을 구해서 데이터를 저장할 파티션을 결정한다.
* 정렬키가 있는 경우, 파티션 키 값으로 데이터를 저장한 파티션을 찾은 다음, 정렬 키 값을 이용하여 순차적으로 데이터를 스캔한다.

## 작동방식: 핵심 구성요소

* [다이나모DB 기능 제한](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/Limits.html)에 대해서 알아보기

### 테이블, 항목 및 속성

* 테이블: 데이터의 집합, RDBMS의 테이블과 같다.
* 항목: 테이블은 0개 이상의 항목이 존재한다. RDBMS의 tuple, record
* 속성: 각 항목은 1개 이상의 속성을 가진다. RDBMS의 field, column

![예제-1](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/images/HowItWorksPeople.png)

위 People 테이블에서

* 테이블은 3건의 항목을 가지고 있다.
* 첫 번째 항목은 4건의 속성을 가지고 있다.
* *People* 테이블은 기본 키 *PersonId*를 가진다.
* 속성에 대해서
  * 테이블은 스키마가 없다. 속성을 미리 정의할 필요가 없다.
  * 대부분의 항목은 *스칼라* 형식이다. -> 스칼라 형식은 하나의 값만 가질 수 있음. 문자열, 숫자 등의 형식을 말함.
  * 일부 항목은 내포 속성(*Address* 속성)를 가진다. 다이나모DB는 32레벨까지 내포 속성을 지원한다. -> Map과 유사함

### 키

테이블을 생성할 때 기본 키 지정은 필수이다. 기본 키는 각 항목을 나타내는 고유 식별자이다. 복수 건의 항목이 동일한 기본 키를 가질 수 없다.  
다이나모DB는 두 가지 기본 키를 지원한다.

기본 키는 *스칼라* 타입이여야 한다. 즉, 키는 문자열, 숫자 혹은 이진수 데이터만 가질 수 있다.

#### 파티션 키 (해시 속성)

* 하나의 속성으로 구성되는 기본 키
* 파티션 키를 해시함수의 입력을 사용함 => 파티션 키에 따라 물리적 스토리지(파티션)이 결정됨
* 파티션 키로만 구성된 테이블에서 각 항목이 동일한 파티션 키를 가질 수 없음.
* 파티션 키로 항목 액세스가 가능함

#### 정렬 키 (범위 속성)

* 파티션 키와 함께 정렬 키를 사용할 경우, 각 항목은 동일한 파티션 키를 가질 수 있다. 단, 정렬 키는 달라야 한다.
* 정렬 키는 유연한 쿼리를 지원한다.
* 정렬 키의 쿼리 방식 조사

### 보조 인덱스

테이블은 하나 이상의 보조인덱스를 생성할 수 있다.
보조 인덱스의 대체 키를 사용하여 쿼리를 할 수 있다.
모든 인덱스는 테이블에 속해있다. 이를 **기본 테이블**이라 한다.
다이나모DB는 인덱스를 자동으로 유지한다. 즉, 기본 테이블의 항목이 변경되면 인덱스의 해당 항목도 변경된다.
인덱스를 생성할 때 기본 테이블에서 인덱스로 복사하거나 *프로젝션*할 속성을 지정한다. 기본 키 속성은 무조건 프로젝션된다.

### 다이나모 스트림

* 스트림은 다니아모DB 데이터의 변경 이벤트를 캡쳐한다.
* 캡쳐한 이벤트는 스트림 레코드에서 볼 수 있다.
* 스트림 레코드는 테이블 이름, 타임스탬프, 메타 데이터 등을 가지고 있다.
* 스트림 레코드의 수명은 24시간이다.
* 스트림과 람다를 이용해서 트리거를 생성할 수 있다.

## CLI

### 테이블 생성

```bash
aws dynamodb create-table \
    --table-name Member \
    --attribute-definitions \
        AttributeName=name,AttributeType=속성 타입 \
        ... \
    --key-schema \
        AttributeName=속성 이름,KeyType=키 타입 \
        ... \
    --provisioned-throughput \
        ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --endpoint-url http://localhost:8000
```