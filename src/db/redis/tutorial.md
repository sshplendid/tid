# REDIS 튜토리얼

레디스는 `key`:`value` 저장방식의 NoSQL 데이터베이스이다.

## 환경 구성

### docker

```bash
$ docker run -p 6379:6379 redis # 6379 포트로 redis 서버 구동
```

### redis-cli (by npm)

```bash
$ npm i redis-cli
$ rdcli # 127.0.0.1:6379로 connection
```

## 기본 저장/조회 명령

* set: 키 값에 데이터 저장, 값이 존재하면 덮어쓴다.
* get: 값 조회, 없으면 nil 반환
* del: 키 삭제
* incr: 값 증가
* expire: 키 유효효기간 설정(단위: 초)
* ttl: 키 유효기간 확인

```redis
$ SET server:name "fido"
$ GET server:name
"fido"
$ DEL server:name
(integer) 1
```
foo 키의 값에 10을 넣고, incr 명령어로 값 1 증가시킨다.
데이터가 정수형인 경우에만 가능하다.

```redis
$ set bar 10
$ incr bar => 11
$ get bar => 11
```

expire 명령어로 데이터의 유효기간을 설정할 수 있다.
아래는 특정 값을 추가한 뒤에 60초 후에 만료되는 키를 생성하는 코드이다.

```redis
$ SET foo "60초 후에 삭제된다."
$ expire foo 60
```

## 다양한 데이터 타입

### 리스트

#### 데이터 추가: LPUSH, RPUSH

LPUSH는 리스트의 맨 앞에, RPUSH는 리스트의 맨 끝에 추가한다. lpop, rpop 명령어로 리스트 양쪽의 값을 순차적으로 제거한다.

```redis
$ lpush friends "bob"
$ lpush friends "jane"
$ lpush friends "shawn"
$ lrange friends 0 -1 =>
1) shawn
2) jane
3) bob
$ llen friends => 3
```

### 셋(set)

셋은 리스트와 유사하지만, **비순차적**이고 **요소값이 유일**하다.
sadd, srem으로 값 추가/삭제를 하고, 

* sadd: 요소 추가
* srem: 요소값 삭제
* smembers: 요소값 조회
* sismember: 값이 존재하는지 확인 
* sunion: 데이터 병합(중복되는 데이터는 없다. 왜? set이니까)

### Sorted set

set 자료형과 유사하지만, 순서가 존재한다.

* zadd: 요소 추가
* zrange: 요소 조회

### Hash

Hash는 필드:값으로 구성된 자료형이다.

* `hset user name "john"`: user의 name 필드에 john이라는 값을 추가
* `hgetall user`: user의 모든 데이터 조회
* `hget user name`: user의 name 필드값 조회
* `hmset user name "Mary" age "30" password "s3cret"`: 복수필드 값 추가
* `hdel user age`: age 필드 삭제
* `hincrby user age 1`: age 필드 1만큼 증가


## 참고자료

* https://goodgid.github.io/Redis/
