# Oracle Flashback

Oracle Flashback 기술은 특정 과거 시점의 데이터 상태를 조회하거나 복원할 수 있는 기술을 제공한다.
하지만 너무 이전 시점의 데이터를 조회하면 `ORA-01555`같은 오류메시지를 받을 수 있다.

## 타임스탬프를 이용한 데이터 복원

1\. 정확한 시간을 설정하여 데이터 복원

```sql
SELECT *
  FROM EMP
       AS OF TIMESTAMP SYSTIMESTAMP TO_TIMESTAMP('2018-12-27 10:00:00', 'yyyy-mm-dd hh24:mi:ss');
```

2\. 현재로부터 특정 시간 전의 데이터 복원

```sql
SELECT *
  FROM EMP
       AS OF TIMESTAMP SYSTIMESTAMP - INTERVAL '3' HOUR -- DAY, HOUR, MINUTE, SECOND, ...
```
