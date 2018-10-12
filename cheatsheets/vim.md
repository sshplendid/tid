# VIM Cheat Sheet

## 동작

### 이동

* 기본이동(←↑↓→): `hjkl`
* 문장
  * 시작: `^,0`
  * 끝: `$, shift + 0`
* 단어
  * 다음 단어: `w`
  * 다음 단어 끝: `e`
  * 이전 단어: `b`
* 페이지
  * 다음 페이지: `ctrl + f`
  * 이전 페이지: `ctrl + b`
  * 다음 페이지(1/2): `ctrl + d`
  * 이전 페이지(1/2): `ctrl + u`

## 편집

### 치환

561~562 라인의 `th`**로 시작하는 문자열**을 `7h`로 시작하는 문자열로 치환한다.

* 라인 내에서 치환: `s/old/new/g`
* 범위 내의 일치하는 조건 모두 치환: `#,#s/old/new/g`
* 전체 파일범위 치환: `%s/old/new/g` 
* 전체 파일범위 치환여부 프롬프트 제공: `%s/old/new/gc` 

#### 예제 th* 문자를 7h* 문자로 변환

* 명령어: `561,562s/\(th\(\w\+\)\)/7h\2/g`
* 변경 전 문장

```vim
561  2. Type  :s/thee/the <ENTER> .  Note that this command only changes the
562     first occurrence of "thee" in the line.
```

* 변경 후 문장

```vim
561   2. Type  :s/7hee/7he <ENTER> .  Note 7hat 7his command only changes 7he
562      first occurrence of "7hee" in 7he line.
```
