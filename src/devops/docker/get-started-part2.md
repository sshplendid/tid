# 시작하기 - Part 2: 컨테이너

## 전제 조건

* Docker 1.13 이상 설치
* Part 1 읽기
* `hello-world` 이미지 실행 가능한 환경인지 테스트

```sh
$ docker run hello-world
```

## 소개

이제 Docker의 방식으로 애플리케이션을 만들기 시작할 때가 되었습니다. 이번 컨테이너 페이지를 통해, 우리는 애플리케이션 계층의 밑바닥부터 시작할 겁니다. 컨테이너가 어떻게 운영환경에서 행동하는지 Part 3: Service에서 다룰 것입니다. 마지막으로, Part 5: Stack에서 모든 서비스 상호작용의 정의에 대해 다룰 것입니다.

* Stack
* Services
* Container (지금 우리는 여기에 있습니다)

## 개발 환경이 필요합니다

과거엔, 파이썬 애플리케이션을 작성하려고 하면, 첫 번째 해야할 일은 파이썬 실행환경을 설치하는 것이었습니다. 하지만 로컬 개발 환경에서 애플리케이션이 의도한대로 동작하는 것처럼, 운영 환경에서도 잘 동작하는 것이 필요합니다.

Docker와 함께라면, 우리는 파이썬 런타임을 설치할 필요없는 이미지로 가져갈 수 있습니다. 그러면, 기본 파이썬 이미지를 우리의 애플리케이션 코드 옆에 두고 빌드할 수 있습니다.

이런 포터블 이미지를 `Dockerfile`이라고 부릅니다.

## `Dockerfile`로 컨테이너 정의하기

`Dockerfile`은 컨테이너가 어떤 환경을 가져야 하는지에 대해 정의합니다. 네트워크 인터페이스나 디스크 드라이버같은 자원에 접근하는 것은 시스템의 나머지로부터 격리된 환경 안에서 가상화됩니다. 그래서 바깥 세상과 통신할 ㅅ ㅜ있는 포트를 매핑해야 하고, 어떤 환경 파일을 복사해야 할지 구체적으로 정의해야 합니다. 그렇지만, 그 후엔 `Dockerfile`에 정의한대로 애플리케이션의 빌드가 어디에서나 동일하게 수행될 것입니다.

### `Dockerfile`

빈 디렉터리를 만드세요. 새로 생성한 디렉터리로 경로를 변경(`cd`)해서 `Dockerfile`을 생성하고, 아래 내용을 복사해서 저장합니다. Dockerfile의 스크립트를 설명하는 주석을 읽어보세요.

```Dockerfile
# 파이썬 런타임을 부모 이미지로 사용합니다.
FROM python:2.7-slim

# 작업 디렉터리를 /app 으로 설정합니다.
WORKDIR /app

# 현재 디렉터리의 내용을 /app 의 컨테이너로 복사합니다.
COPY . /app

# requirements.txt에 기술된 패키지들을 설치합니다.
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# 컨테이너 바깥과 통신할 포트인 80번을 열어둡니다.
EXPOSE 80

# 환경 변수를 정의합니다.
ENV NAME World

# 컨테이너를 구동할 때 app.py를 실행합니다. 
CMD ["python", "app.py"]
```

`Dockerfile`은 우리가 아직 만들지 않은 `app.py`나 `requirements.txt`같은 파일들을 필요로 합니다. 이제 이 파일들을 만들어봅시다.

## 애플리케이션 그 자체

`requirements.txt`와 `app.py`, 두 파일을 `Dockerfile`과 같은 폴더에 생성합니다. 보이는 것과 같이 쉽게 애플리케이션이 완성됐습니다. `Dockerfile`이 이미지에 들어갈 때, `app.py`와 `requirements.txt` 역시 `Dockerfile`의 `Copy` 명령어로 인해 나타납니다. 그리고 `app.py`로부터의 결과는 `EXPOSE` 명령으로 인해 HTTP로 접근 가능합니다.

### `requirements.txt`

```plain
Flask
Redis
```

### `app.py`

```python

from flask import Flask
from redis import Redis, RedisError
import os
import socket

# Connect to Redis
redis = Redis(host="redis", db=0, socket_connect_timeout=2, socket_timeout=2)

app = Flask(__name__)

@app.route("/")
def hello():
    try:
        visits = redis.incr("counter")
    except RedisError:
        visits = "<i>cannot connect to Redis, counter disabled</i>"

    html = "<h3>Hello {name}!</h3>" \
           "<b>Hostname:</b> {hostname}<br/>" \
           "<b>Visits:</b> {visits}"
    return html.format(name=os.getenv("NAME", "world"), hostname=socket.gethostname(), visits=visits)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
```

이제 우리는 `pip install -r requirements.txt` 스크립트 문장이 플라스크와 레디스 라이브러리를 설치하고 애플리케이션이 환경변수 `NAME`와 `socket.gethostname()`을 호출한 결과를 출력하는 것을 볼 것입니다. 마침내, 레디스가 실행 중이 아니기 때문에, 우리는 레디스를 사용하려다 실패하고 에러메시지를 뿜어내는 것을 예상할 수 있습니다.

> 노트: 내부 컨테이너가 컨테이너 ID를 조회할 때 호스트의 이름에 접근하면 실행 중인 프로세스 ID가 검색됩니다.

바로 이 것입니다! 파이썬이나 `requirements.txt` 안의 아무 것도, 이미지를 빌드하거나 수행할 때 시스템에 필요로 하지 않습니다. 파이썬과 플라스크를 개발환경에 설치한 것처럼 보이지 않지만, 이미 당신은 가지고 있습니다.

## 애플리케이션 빌드하기

우리는 애플리케이션을 만들 준비가 됐습니다. 여전히 디렉토리 최상위에 있는지 확인해보세요. 여기 `ls` 명령어를 사용해서 나타내보세요.

```sh
$ ls

total 24
drwxr-xr-x  5 sshplendid  staff  170 12 15 00:18 .
drwxr-xr-x  8 sshplendid  staff  272 12 14 21:54 ..
-rw-r--r--  1 sshplendid  staff  169 12 14 21:55 Dockerfile
-rw-r--r--  1 sshplendid  staff  669 12 15 00:18 app.py
-rw-r--r--  1 sshplendid  staff   12 12 14 23:54 requirements.txt
```

이제 빌드를 명령해보세요. 이는 도커 이미지를 생성하고 `-t` 태그를 사용해서 친숙한 이름을 붙일 수 있습니다.

> 역자+ 지금은 제 고양이 이름인 `waltz`라는 이름으로 만들어 보겠습니다.

```sh
$ cd /Volumes/Mango/workspaces/kata/docker
$ docker build -t waltz .
```

빌드한 이미지가 어디에 있나요? 당신의 기기 로컬 Docker 이미지 저장소에 있습니다.

```sh
$ docker image ls

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
waltz               latest              d3582b3f0b85        31 seconds ago      131MB
python              2.7-slim            0dc3d8d47241        4 weeks ago         120MB
postgres            latest              39dfbcb5424b        4 weeks ago         311MB
ubuntu              16.04               4a689991aa24        8 weeks ago         116MB
ubuntu              latest              ea4c82dcd15a        8 weeks ago         85.8MB
hello-world         latest              4ab4c602aa5e        3 months ago        1.84kB
ubuntu              12.04               5b117edd0b76        20 months ago       104MB
```

> 리눅스 사용자를 위한 문제 해결  
프록시 서버 설정  
%$^$%^

## 애플리케이션 실행하기

컨테이너의 80번 포트와 호스트 장비의 4000번 포트를 매핑해서 `-p` 태그와 함께 애플리케이션을 실행합니다.

```sh
$ docker run -p 4000:80 waltz
```

`http://0.0.0.0:80`에서 파이썬으로 동작하는 애플리케이션이 있다는 메시지를 보셨을 겁니다. 그러나 메시지는 컨테이너 내부로부터 오는 것으로, 이는 올바른 URL인 `http://localhost:4000`을 만들 필요가 없이 컨테이너의 80번 포트가 4000번 포트에 매핑되었다는 것을 알필요가 없다는 의미입니다.

웹브라우져에 접속해서 위 URL을 입력하고 이동해봅시다.

> 노트: 만약 윈도우7에서 도커 툴박스를 사용하고 있다면, Docker 장비 IP를 사용하세요. http://192.168.99.100:4000이 예입니다. IP 주소를 찾기 위해, `docker-machine ip` 명령어를 사용하세요.

`curl` 명령어를 사용해서 동일한 내용을 볼 수 있습니다.

```sh
curl http://localhost:4000

<h3>Hello World!</h3><b>Hostname:</b> 3dbbee09f22c<br/><b>Visits:</b> <i>cannot connect to Redis, counter disabled</i>%
```

> 윈도우에서 컨테이너를 멈추는 방법  
윈도우에서 `CTRL+C` 명령으로 컨테이너를 멈출 수 없습니다. 그러므로 먼저 `CTRL+C`를 치고 프롬프트로 돌아가거나 새로운 셸을 열어서 `docker container ls`를 입력해서 구동 중인 컨테이너의 리스트를 확인합니다. 그리고 `docker container stop <컨테이너 이름이나 ID>`를 입력해서 컨테이너를 중지시킵니다. 그렇지 않으면 다음에 컨테이너를 재구동할 때 대몬으로부터 에러 응답을 받을 수 있습니다.

이제 애플리케이션을 백그라운드에서 동작(detach mode)하도록 명령합니다.

```sh
$ docker run -d -p 4000:80 waltz
```

이 명령을 실행하면 컨테이너에 대한 긴 ID를 출력하고 다시 터미널 명령으로 돌아옵니다. 컨테이너는 백그라운드에서 동작합니다. 우리는 `docker container ls` 명령을 통해 짧은 컨테이너 ID를 확인할 수 있습니다. 그리고 두 ID 모두 명령을 실행할 때 사용할 수 있습니다.

```sh
$ docker continaer ls

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                  NAMES
abf81e3f6825        waltz               "python app.py"     6 seconds ago       Up 4 seconds        0.0.0.0:4000->80/tcp   trusting_khayyam
```

`CONTAINER ID`는 `http://localhost:4000` 과 매핑됩니다.

이제 `CONTAINER ID`를 사용해서 `docker container stop` 명령으로 프로세스를 끝내봅시다.

```sh
$ docker container stop abf81e3f6825
```

## 이미지 공유하기

방금 생성한 애플리케이션의 휴대성을 높이기 위해, 이미지를 업로드해서 다른 어딘가에서 실행해봅시다. 그 후에, 운영 환경에 컨테이너를 배포하기 원할 때, 레지스트리에 푸시하는 방법을 알아야 할 것입니다.

레지스트리는 저장소의 모음이고, 저장소는 이미지의 모음입니다. 코드가 이미 작성되었다는 사실을 제외하면 GitHub와 유사합니다. 레지스트리의 계정은 많은 저장소에서 생성할 수 있습니다. `docker` CLI는 기본적으로 Docker 퍼블릭 저장소를 사용합니다.

> Note: 우리는 여기서 도커 퍼블릭 저장소를 사용합니다. 왜냐하면 무료에다가 이미 설정되어 있기 때문입니다. ㅇ그러나 여러 저장소 중 하나를 선택해서 사용할 수 있고, 심지어 [Docker Trusted Registry]()를 통해서 자신만의 개인 레지스트리를 만드는 것도 가능합니다.

### Docker ID로 로그인하기

만약 Docker 계정이 없다면, hub.docker.com 에서 계정을 생성하세요. 가입한 사용자 명으로 도커 퍼블릭 레지스트리에 로그인하세요.

```sh
$ docker login
```

### 이미지 태그하기

레지스트리에서 저장소와 연계된 이미지의 표기는 `사용자명/저장소:태그` 입니다. 태그는 선택적이지만, 사용하길 추천합니다. 레지스트리가 도커 이미지들에게 버전을 주는 방식이기 때문입니다. 저장소와 태그에 `get-started:part2`같은 의미있는 이름을 붙여줍니다. 이는 `get-started` 저장소에 `part2`라고 이미지에 태그한 것입니다.

이제 이미지에 태그하기 위해 이 것들을 함께 넣어봅시다. 의도한 목적지에 이미지를 업로드하기 위해, 사용자 명과 저장소, 태그 명을 사용해서 `docker tag image` 명령을 실행해봅시다. 

> 역자+ 이전에 생성한 'waltz' 이미지를 docker hub 계정인 'sshplendid' 하위의 'get-started' 저장소에 'part2'라는 태그로 업로드할 것입니다.

```sh
$ docker tag waltz sshplendid/get-started:part2
```

`docker image ls` 명령을 실행해서 새롭게 태그된 이미지를 확인해봅시다.

```sh
$ docker image ls

REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
waltz                    latest              d3582b3f0b85        2 days ago          131MB
sshplendid/get-started   part2               d3582b3f0b85        2 days ago          131MB
python                   2.7-slim            0dc3d8d47241        4 weeks ago         120MB
ubuntu                   latest              ea4c82dcd15a        8 weeks ago         85.8MB
...
```

### 이미지 발행하기

태그한 이미지를 저장소에 업로드해봅시다.

```sh
$ docker push 사용자명/저장소:태그
```

명령이 끝나면, 업로드한 이미지는 공개적으로 사용가능합니다. 만약 [도커 허브](https://hub.docker.com)에 로그인했다면, 그 곳에 있는 이미지를 pull 명령으로 볼 수 있습니다.

### 원격 저장소로부터 이미지를 끌어와 실행하기

지금부터 `docker run` 명령으로 어떤 장비에서든 애플리케이션을 실행할 수 있습니다.

```sh
$ docker run -p 4000:80 username/repository:tag
```

이미지가 로컬 장비에서 사용할 수 없는 상태라면, Docker는 저장소로부터 이미지를 끌어옵니다.

```sh
$ docker run sshplendid/get-started:part2
Unable to find image 'sshplendid/get-started:part2' locally
part2: Pulling from sshplendid/get-started
a5a6f2f73cd8: Already exists
8da2a74f37b1: Already exists
09b6f498cfd0: Already exists
f0afb4f0a079: Already exists
7be2300e1a8b: Already exists
b34ffcdf5978: Already exists
aa01dc4a3353: Already exists
Digest: sha256:0dff90a601cec25d6e7e7662d28e501758a7d02ebb40700a91a87117847a0a88
Status: Downloaded newer image for sshplendid/get-started:part2
 * Serving Flask app "app" (lazy loading)
 * Environment: production
   WARNING: Do not use the development server in a production environment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://0.0.0.0:80/ (Press CTRL+C to quit)
```

어디서 `docker run` 명령을 실행하던, 파이썬과 마찬가지로 `requirements.txt`의 모든 의존성을 함께 이미지와 끌어당겨옵니다. 그리곤 코드를 실행합니다. 가벼운 짐을 싸서 여행하는 것처럼, 호스트 장비에 어떤 것도 설치할 필요 없이 Docker를 통해 실행하면 됩니다.

## Part 2의 결론

이 페이지의 내용은 이 것이 전부입니다. 다음 장에서 **서비스** 안에서 컨테이너를 구동함으로써 애플리케이션의 스케일링 방법에 대해 배울 것입니다.

## 정리 및 cheat sheet

이 장에서 사용한 기본적인 docker 명령들과 알아두면 좋을 명령어 리스트입니다.

```sh
docker build -t waltz .    # 현재 디렉토리의 Dockerfile을 이용해서 이미지 생성하기
docker run -p 4000:80 waltz  # 4000번 포트를 80번 포트와 매핑하여 "waltz" 실행하기
docker run -d -p 4000:80 waltz              # 위 명령을 백그라운드 모드로 실행하기
docker container ls                               # 모든 구동 중인 컨테이너 리스트
docker container ls -a           # 멈춰있는 컨테이너를 포함한 모든 컨테이너 리스트
docker container stop <hash>                     # 안전하게 특정 컨테이너 중지하기
docker container kill <hash>                            # 강제로 컨테이너 중지하기
docker container rm <hash>                                # 특정 컨테이너 삭제하기
docker container rm $(docker container ls -a -q)          # 모든 컨테이너 삭제하기
docker image ls -a                                            # 모든 이미지 리스트 
docker image rm <image id>                                      # 특정 이미지 삭제
docker image rm $(docker image ls -a -q)                        # 모든 이미지 삭제
docker login                  # Docker 자격증명을 이용하여 CLI 세션에서 로그인하기
docker tag <image> username/repository:tag  # 레지스트리 업로드를 위한 이미지 태그
docker push username/repository:tag                     # 태그한 이미지 업로드하기
docker run username/repository:tag                  # 레지스트리의 이미지 실행하기
```

