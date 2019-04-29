# 동기/비동기, 블록/논블록

## Block vs Non-block

호출되는 함수가 (처리여부와 관계없이) 바로 리턴되느냐가 관심사이다.

호출한 함수가 처리될 때까지 기다리면 블록, 처리여부와 관계없이 바로 리턴하면 논-블록.

## Synchronous vs Asynchronous

함수의 작업 완료여부를 누가 신경쓰는가에 따라 나눌 수 있다. A 함수가 B 함수를 호출한다고 가정하자.

### 동기

호출하는 함수(A)는 B의 처리가 끝나기를 기다린 후에 다음 작업을 처리한다. 

### 비동기

호출되는 함수(B)에 콜백을 전달해서 처리 결과가 끝날 때 콜백을 실행하면 비동기, 이 경우엔 호출하는 함수(A)는 B의 완료여부를 신경쓰지 않는다. A 함수는 B 함수 호출 이후에 남은 작업을 바로 처리한다.

## 참고자료

* [Blocking-NonBlocking-Synchronous-Asynchronous](http://homoefficio.github.io/2017/02/19/Blocking-NonBlocking-Synchronous-Asynchronous/)