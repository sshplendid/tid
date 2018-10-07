---
title: "Tagged Template Literals"
category: [js]
tags: [javascript, Template literal]
---

# Tagged Template Literals

아래와 같이 태그를 사용하면 템플릿 리터럴을 문자열과 표현식으로 나눠서 파싱할 수 있다.

```js
var x = 3;
var y = 5;

function getArea(literals, ...expressions) {
    for(let i = 0; i < literals.length; i++)
        console.log('.'+literals[i]+'.');
    
    let area = expressions[0] * expressions[1];
    return area;
}

let area = getArea`나는 가로길이 ${x}, 세로길이 ${y} 인 직사각형 넓이를 알고싶다.`;
console.log(area);
```

출력결과

```
.나는 가로길이 .
., 세로길이 .
. 인 직사각형 넓이를 알고싶다..
15
```
