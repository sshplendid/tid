# Docker note

## Ubuntu Bash 셸 실행

* run 옵션 
  * -it: 터미널 입력을 위한 실행 옵션
  * --rm: 컨테이너 종료시 컨테이너 자동 제거

```bash
docker run -it --rm ubuntu bash
```

### 로컬 드라이브 볼륨 마운트

도커 실행(`docker run`)할 때, `-v 로컬호스트디렉토리:컨테이너디렉토리` 로 마운트 

#### 볼륨 마운트 테스트

```bash
# 로컬 볼륨 마운트 테스트 
> mkdir docker-vol # 로컬 디렉토리 생성
$ echo "테스트 파일" > test.txt # 로컬 파일 생성 
$ docker run -it -v c:/Users/Administrator/docker-vol:/vol-test ubuntu bash

$ cd vol-test
$ cat test.txt
# 파일내용이 나오면 정상적으로 마운트된것

# 컨테이너 -> 로컬 파일 테스트
$ echo 'This file is created from container.' > from-container.txt
$ exit # 컨테이너 종료

> type from-container.txt # cat과 동일한 Windows 명령
```