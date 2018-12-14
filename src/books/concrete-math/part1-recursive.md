# 1. 재귀적인 문제들

## 1.1 하노이의 탑

### 문제를 해결하는 방법

1\. 작은 사례들을 살펴본다.

* 원반 이동 횟수
  * 원반이 1개일 때, 1번
  * 원반이 2개일 때, 3번
  * 원반이 3개일 때, 5번

2\. 적절한 표기법을 도입한다.(명명정복, name and conquer)

1개의 원반을 옮길 때의 총 이동횟수를 **T**라고 명명하자. 그러면 아래와 같이 표현할 수 있다.

<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML' async></script>

$$ T_1 = 1 $$
$$ T_2 = 3 $$
$$ T_3 = 5 $$
$$ T_0 = 0 $$

3\. 크게 생각해보자.

**n**개의 원반이 있을 때, 모든 원반을 옮기는 최소 이동횟수는 아래와 같은 수식을오 표현할 수 있다.

$$ T_n = 2(n-1) + 1 $$

### 점화식 (recurrence formula or recurrence relation)

* 구성요소
  * 경곗값 (boundary value)
  * 등식: 일반항의 값을 이전 값들로 서술

경곗값이 있어야 점화식이 완성된다.