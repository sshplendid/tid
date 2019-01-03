# 1. 재귀적인 문제들

## 1.1 하노이의 탑

> 하노이의 탑은 원반 여덟 개로 된 탑으로 시작한다. 원반들은 세 개의 기둥 중 하나에 큰 것부터 크기순으로 쌓여 있다. 목표는 원반을 하나씩 이동해서 탑 전체를 다른 기둥으로 옮기는 것이다. 단, 작은 원반 위에 큰 원반을 놓아서는 안된다.

### 문제를 해결하는 방법

1\. 작은 사례들을 살펴본다.

* 원반 이동 횟수
  * 원반이 1개일 때, 1번
  * 원반이 2개일 때, 3번
  * 원반이 3개일 때, 7번

2\. 적절한 표기법을 도입한다.(명명정복, name and conquer)

1개의 원반을 옮길 때의 총 이동횟수를 (( T ))라고 명명하자. 그러면 아래와 같이 표현할 수 있다.

\\[ T_0 = 0 \\]
\\[ T_1 = 1 \\]
\\[ T_2 = 3 \\]
\\[ T_3 = 7 \\]

3\. 크게 생각해보자.

**n**개의 원반이 있을 때, 모든 원반을 옮기는 최소 이동횟수는 아래와 같은 수식으로 표현할 수 있다.

\\[ T_0 = 0 \\]
\\[ T_n = 2T_{n-1} + 1, n \geq 0 \\]


#### 코드

```js
function tower_of_hanoi_recursive(n) {
    if(n == 0) {
        return 0;
    }
    return 2 * tower_of_hanoi_recursive(n-1) + 1
}

console.time('하노이의탑-재귀:n=3');
console.log(tower_of_hanoi_recursive(3));
console.timeEnd('하노이의탑-재귀:n=3');
```

### 점화식 (recurrence formula or recurrence relation)

* 구성요소
  * 경곗값 (boundary value)
  * 등식: 일반항의 값을 이전 값들로 서술
* 경곗값이 있어야 점화식이 완성된다.
* 점화식이 있으면 임의의 \\( n \\)에 대해 \\( T_n \\)을 계산할 수 있다.
  * \\( n \\)이 크면 점화식으로 값을 계산하는데 시간이 많이 걸린다.
  * **점화식의 해**가 있다면 \\( T_n \\)을 빠르게 계산할 수 있다.
  * **닫힌 형식(clsoed form)** 의 공식

### 수학적 귀납법 (mathematical induction)

정수 \\( n \\) 에 관한 어떤 명제가 모든 \\( n \geq n_0 \\) 에 대해 참임을 증명하는 일반적인 방법

* 기초(basic): 명제를 \\( n \\)의 가장 작은 값 \\( n_0 \\)에 대해 증명
* 귀납(induction): 명제가 \\( n_0 \\)에서 \\( n-1 \\)까지 증명되었다는 가정 하에 \\( n \geq n_0 \\)에 대해 명제를 증명

계속해서 작은 사례를 살펴보자.

\\[ T_4 = T_3 + 8 = 15 \\]
\\[ T_5 = T_4 + 16 = 31 \\]
\\[ ... \\]
\\[ T_n = 2^n - 1, n > 0 \\]

#### 코드

```js
function tower_of_hanoi_closed(n) {
    return Math.pow(2, n) -1;
}

console.time('하노이의탑-닫힌 형식:n=3');
console.log(tower_of_hanoi_closed(3));
console.timeEnd('하노이의탑-닫힌 형식:n=3');
```

## 1.2. 평면의 선들

> 칼로 피자를 \\( n \\) 번 자른다고 할 때, 피자 조각이 최대 몇개나 나올까?

<svg version="1.1"
     baseProfile="full"
     width="200" height="150"
     xmlns="http://www.w3.org/2000/svg">
     <rect width="100%" height="100%" fill="none" />
     <line x1="95" x2="105" y1="130" y2="10" stroke="black" stroke-width="1" />
     <text x="50" y="75" font-size="15" text-anchor="middle" fill="black">a</text>
     <text x="150" y="75" font-size="15" text-anchor="middle" fill="black">b</text>
     <text x="100" y="140" font-size="15" text-anchor="middle" fill="black">&lt;n=1&gt;</text>
</svg>

<svg version="1.1"
     baseProfile="full"
     width="200" height="150"
     xmlns="http://www.w3.org/2000/svg">
     <rect width="100%" height="100%" fill="none" />
     <line x1="95" x2="105" y1="130" y2="10" stroke="black" stroke-width="1" />
     <line x1="10" x2="190" y1="60" y2="50" stroke="black" stroke-width="1" />
     <text x="50" y="25" font-size="15" text-anchor="middle" fill="black">a</text>
     <text x="150" y="25" font-size="15" text-anchor="middle" fill="black">b</text>
     <text x="50" y="100" font-size="15" text-anchor="middle" fill="black">c</text>
     <text x="150" y="100" font-size="15" text-anchor="middle" fill="black">d</text>
     <text x="100" y="140" font-size="15" text-anchor="middle" fill="black">&lt;n=2&gt;</text>
</svg>

## 작은 사례 살펴보기

평면의 선의 개수 \\( n \\)으로 정의되는 영역을 \\( L_n \\)이라 할 때, \\( L_0 = 1 \\)이다.

\\[ L_0 = 1 \\]
\\[ L_1 = 2 \\]
\\[ L_2 = 4 \\]
\\[ L_3 = 7 \\]
\\[ L_4 = 11 \\]
\\[ L_5 = 16 \\]

## 규모를 확장해보기

\\( L_n = 2^n \\)이라고 생각할 수 있지만, \\( L_3 = 7 \\)이므로 공식은 성립하지 않는다. 새로 놓일 직선이 기존에 놓인 다른 모든 직선을 가로질러 간다면, 아래와 같은 공식이 성립된다.

\\[ L_0 = 1 \\]
\\[ L_n = L_{n-1} + n, n > 0 \\]

\\( n \\) 번째 선이 분할하는 기존 영역이 \\( k \\) 개이면, 영역의 수는 \\( k \\) 만큼 증가한다. \\( n \\) 번째 선은 최대 \\( n-1 \\) 개의 선과 최대 \\( n-1 \\) 개의 점에서 만난다.

이는 기존에 구한 1 ~ 3의 값과도 일치한다. 점화식을 풀어보면 1부터 n까지의 수를 더하는 것을 관찰할 수 있다. 그렇다면 아래와 같이 쓸 수 있다.

\\[ L_5 = L_0 + ( 1 + 2 + 3 + 4 + 5 ) \\]
\\[ L_{10} = L_0 + ( 1 + 2 + 3 + ... + 9 + 10 ) \\]

좀 더 일반적으료 표현하면, 아래와 같은 공식으로 풀 수 있다.

\\[ L_n = L_0 + ( 1 + 2 + 3 + ... + (n-1) + n) \\]
\\[ L_n = L_0 + \frac{n (n + 1)}{2}  \\]
\\[ L_n = 1 + \frac{n (n + 1)}{2}  \\]

### 닫힌 형식

점화식이 아닌, 명시적인 표준연산방식으로 계산할 수 있는 형식

* 닫힌 형식의 해는 유한하다.
* 닫힌 형식은 간단하다.
* 닫힌 형식의 해가 없는 점화식도 존재한다.

## 1.3. 요세푸스 문제

> 1에서 \\( n \\)까지의 번호가 매겨진 \\( n \\)명의 사람이 원을 형성하며, 오직 한 사람이 남을 때까지 매 **두 번째** 사람이 죽는다.

<svg version="1.1"
     baseProfile="full"
     width="200" height="210"
     xmlns="http://www.w3.org/2000/svg">
     <circle cx="100" cy="100" r="50" fill="transparent" stroke="black" stroke-width="1" />
     <line x1="100" x2="100" y1="55" y2="85" stroke="black" stroke-width="1" />
     <line x1="100" x2="90" y1="55" y2="65" stroke="black" stroke-width="1" />
     <line x1="100" x2="110" y1="55" y2="65" stroke="black" stroke-width="1" />
     <text x="100" y="40" font-size="12" text-anchor="middle" fill="black">1</text>
     <text x="40" y="100" font-size="12" text-anchor="middle" fill="black">4</text>
     <text x="160" y="100" font-size="12" text-anchor="middle" fill="black">2</text>
     <text x="100" y="162" font-size="12" text-anchor="middle" fill="black">3</text>
     <text x="100" y="200" font-size="12" text-anchor="middle" fill="black">&lt;n=4&gt;</text>
     <text x="100" y="100" font-size="12" text-anchor="middle" fill="black">1부터 시작</text>
</svg>

### 작은 사례

1부터 \\( n \\)까지의 번호가 매겨진 사람들이 둘러앉아 1부터 시작할 때, 마지막까지 남은 사람의 번호를 \\( J_n \\)이라고 하자.

\\[ J_1 = 1 \\]
\\[ J_2 = 1 \\]
\\[ J_3 = 3 \\]
\\[ J_4 = 1 \\]
\\[ J_5 = 3 \\]

## 확장해보기

작은 사례를 관찰하면 값에 어떤 규칙이 있음을 알 수 있다. 아래의 표를 보자.

|\\(n\\)|\\(n+1\\)|\\(n+2\\)|...| | | | | |
|---|---|---|---|---|---|---|---|---|
|*1*|1| | | | | | | |
|*2*|1|3| | | | | | |
|*4*|1|3|5|7| | | | |
|*8*|1|3|5|7|9|11|13|15|

2의 지수를 기준으로 \\(n\\)이 증가할 때마다 2를 더한 값이 반복된다.

위 결과 값에 모두 1을 더해주면 아래와 같이 2의 배수임을 확인할 수 있다.

|\\(n\\)|\\(n+1\\)|\\(n+2\\)|...| | | | | |
|---|---|---|---|---|---|---|---|---|
|*1*|2| | | | | | | |
|*2*|2|4| | | | | | |
|*4*|2|4|6|8| | | | |
|*8*|2|4|6|8|10|12|14|16|

그리고 2를 나누면 1씩 증가하는 순열이 된다.

|\\(n\\)|\\(n+1\\)|\\(n+2\\)|...| | | | | |
|---|---|---|---|---|---|---|---|---|
|*1*|1| | | | | | | |
|*2*|1|2| | | | | | |
|*4*|1|2|3|4| | | | |
|*8*|1|2|3|4|5|6|7|8|

이를 수식으로 표현하면 아래와 같이 나타날 수 있을 것이다.

\\[ J_n = 2(n-m) + 1, m = n보다 작거나 같은 2의 지수 \\]

\\(m\\)은 n의 구간마다 값이 달라지기 때문에 아래 코드와 같이 따로 함수를 만들었다.

```js
function max_of_n(n) {
    var x = 0;
    while(n >> ++x) {
    }
    return Math.pow(2, --x);
}

function j(n) {
    return 2*(n-max_of_n(n)) + 1;
}

console.log(j(1));
console.log(j(2));
console.log(j(3));
console.log(j(4));
console.log(j(5));
console.log(j(6));
console.log(j(7));
console.log(j(8));
console.log(j(9));
console.log(j(16));
console.log(j(15));
```

패턴을 기반으로 점화식의 해를 찾았는데, 책에선 점화식을 정의하는 부분도 있었다.