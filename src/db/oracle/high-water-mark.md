# HWM, High Water Mark

테이블이 사용한 block과 사용하지 않은 block의 경계점을 나타낸다.

## Block의 상태

block을 사용하려면 먼저 할당과 포맷이 이루어져야 한다.

* Used: 사용 중, 포맷 됨
* Unknown: 사용 된 적이 있으나 현재 사용 중인지는 모름, 포맷 됨
* Never used(Unformatted): 사용된 적이 없음, 포맷되지 않음

만약 로우 1000개를 삽입한 후, 500개를 삭제한다면, 삭제한 만큼의 블록이 `Unknown` 상태가 될 것이다.

<svg version="1.1"
     baseProfile="full"
     width="410" height="180"
     xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="10" width="50" height="100" stroke="black" fill="grey" stroke-width="1" />
    <rect x="0" y="40" width="50" height="10" stroke="black" fill="white" stroke-width="1" />
    <rect x="50" y="10" width="50" height="100" stroke="black" fill="grey" stroke-width="1" />
    <rect x="50" y="30" width="50" height="40" stroke="black" fill="white" stroke-width="1" />
    <text x="75" y="130" font-size="12" text-anchor="middle" fill="black">used</text>
    <rect x="100" y="10" width="50" height="100" stroke="black" fill="grey" stroke-width="1" />
    <rect x="100" y="15" width="50" height="5" stroke="black" fill="white" stroke-width="1" />
    <rect x="150" y="10" width="50" height="100" stroke="black" fill="transparent" stroke-width="1" />
    <text x="175" y="65" font-size="12" text-anchor="middle" fill="black">?</text>
    <rect x="200" y="10" width="50" height="100" stroke="black" fill="transparent" stroke-width="1" />
    <text x="225" y="65" font-size="12" text-anchor="middle" fill="black">?</text>
    <text x="200" y="130" font-size="12" text-anchor="middle" fill="black">unknown</text>
    <rect x="250" y="10" width="50" height="100" stroke="black" fill="transparent" stroke-width="1" />
    <rect x="300" y="10" width="50" height="100" stroke="black" fill="transparent" stroke-width="1" />
    <rect x="350" y="10" width="50" height="100" stroke="black" fill="transparent" stroke-width="1" />
    <text x="300" y="130" font-size="12" text-anchor="middle" fill="black">never used</text>
    <line x1="150" x2="150" y1="115" y2="150" stroke="black" stroke-width="1" />
    <line x1="150" x2="155" y1="115" y2="125" stroke="black" stroke-width="1" />
    <line x1="150" x2="145" y1="115" y2="125" stroke="black" stroke-width="1" />
    <text x="150" y="160" font-size="12" text-anchor="middle" fill="black">Low HWM</text>
    <line x1="250" x2="250" y1="115" y2="150" stroke="black" stroke-width="1" />
    <line x1="250" x2="255" y1="115" y2="125" stroke="black" stroke-width="1" />
    <line x1="250" x2="245" y1="115" y2="125" stroke="black" stroke-width="1" />
    <text x="250" y="160" font-size="12" text-anchor="middle" fill="black">High HWM</text>
</svg>

## Low HWM

Used 상태의 block 영역을 나타낸다.

## High HWM

Used + Unknown 영역, 즉 High HWM 이후의 block은 포맷되지 않음을 의미한다.

## HWM 재조정을 위한 쿼리

Oracle 10g 이후 ASSM 적용된 테이블 스페이스만 지원된다.

```sql
ALTER TABLE 테이블_이름 ENABLE ROW MOVEMENT;
ALTER TABLE 테이블_이름 SHRINK SPACE;
ALTER TABLE 테이블_이름 DEALLOCATE UNUSED;
ALTER TABLE 테이블_이름 DISABLE ROW MOVEMENT;
```

## 참고

* [용어 - 구루비](http://wiki.gurubee.net/pages/viewpage.action?pageId=26741144)