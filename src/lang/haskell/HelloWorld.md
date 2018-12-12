# Hello, Haskell!

Haskell은 순수 함수형 프로그래밍 언어이다.

## 주요 특징
  * 패턴 맞춤
  * 커링
  * 조건 제시법
  * 가드
  * 연산자 정의
  * 느긋한 계산법

  * 단일체
  * 타입클래스

하스켈만의 특징들은 절차적 프로그래밍 언어에서 매우 힘들었던 함수 정의를 아주 손쉽게 만들어버린다.


## 예제

1. Hello World 출력 프로그램

```haskell
main = putStrLn "Hello World!"
```

2. 재귀함수를 이용한 팩토리얼 연산 프로그램

```Haskell
fac x 
    | x == 0 = 1
    | x > 0 = x * (fac (x-1))
```

https://ko.wikipedia.org/wiki/%ED%95%98%EC%8A%A4%EC%BC%88
