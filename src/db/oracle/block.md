# Block

DBMS의 I/O 단위이다. DBMS에 따라 페이지(page)라고 부르기도 한다.

## 특징

* I/O의 단위이다.
* 
* 컬럼 단위 I/O를 지원하는 DBMS도 있다.
* 오라클의 허용 블록 크기는 2k, 4k, 8k(default), 16k, 32k 이다.
  * 테이블 스페이스별 블록 사이즈와 버퍼풀을 구성할 수 있다.

## Oracle에서 테이블 스페이스의 블록 사이즈 조회

```sql
-- 오라클 블록의 사이즈 조회
SELECT tablespace_name, block_size/1024 as block_size_kb FROM dba_tablespaces;
```

## 참고

* [데이터베이스 IO 원리](http://wiki.gurubee.net/pages/viewpage.action?pageId=26744692)
* [블록 단위 IO - 구루비](http://wiki.gurubee.net/pages/viewpage.action?pageId=26739100)
* [블록 사이즈별 성능 비교 - 구루비](http://www.gurubee.net/lecture/2924)