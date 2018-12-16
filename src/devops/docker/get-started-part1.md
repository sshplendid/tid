# 시작하기 - Part 1: Docker 소개 및 설치

환영합니다! 당신이 Docker에 대해 배우길 원해서 기쁩니다. The *Docker Get Started Tutorial* 튜토리얼은 아래와 같이 진행될 것입니다.

1. Docker 환경 설치하기 (이번 페이지)
1. 이미지를 만들고 컨테이너로 실행하기
1. 다중 컨테이너에서 실행하기 위한 애플리케이션 확장하기
1. 클러스터로 애플리케이션 분산하기
1. 데이터베이스 추가로 서비스 쌓기
1. 운영환경으로 애플리케이션 배포하기

## Docker 컨셉

Docker는 개발자와 시스템 관리자를 위한 애플리케이션 **개발, 배포, 실행** 가능한 컨테이너 플랫폼입니다. 애플리케이션 배포를 위한 리눅스 컨테이너 사용을 *containerization*이라고 불렀습니다. 컨테이너 자체는 새롭지 않지만, 애플리케이션 배포를 단순화하기 위한 컨테이너는 그렇지 않습니다.

*Containerization*은 아래의 특징 때문에 나날이 유명해졌습니다.

* 유연함: 아무리 복잡한 애플리케이션도 컨테이너화 할 수 있습니다.
* 가벼움: 컨테이너들은 호스트 커널과 자원을 공유합니다.
* 교환 가능함: 업데이트와 업그레이드를 위한 즉시 배포가 가능합니다.
* 휴대성: 로컬 환경에서 빌드하고, 클라우드 환경으로 배포하고, 어디에서나 실행 가능합니다.
* 확장 가능함: 컨테이너를 늘리고 자동으로 분산 환경을 만들 수 있습니다.
* 적재 가능함: 서비스들을 즉시 수직적으로 쌓을 수 있습니다.

### 이미지와 컨테이너

컨테이너는 이미지를 통해 구동할 수 있습니다. **이미지**는 , 애플리케이션을 구동하는데 필요한 코드, 실행환경, 라이브러리, 환경변수, 설정 파일 등의 필요한 모든 것들을 포함한, 실행 가능한 패키지입니다.

**컨테이너**는 이미지의 런타임 인스턴스입니다. 컨테이너는 이미지가 실행될 때 메모리 상에 올라간 이미지를 의미합니다. 이는 상태가 있는 이미지, 유저 프로세스 등을 의미합니다. 우리는 구동 중인 컨테이너의 목록을 `docker ps` 명령어로 확인할 수 있습니다.

### 컨테이너와 가상 머신

**컨테이너**는 리눅스 상에서 네이티브로 실행되고 호스트의 커널을 다른 컨테이너들과 공유합니다. 컨테이너는 별개의 프로세스로 동작하지만, 다른 실행 가능한 컨테이너나 프로그램보다 많은 메모리를 점유하지 않습니다. 이 것이 도커를 가볍게 만듭니다.

그에 반해서, **가상 머신**은 하이퍼바이저를 통해 호스트 자원에 가상 접근하는 게스트 운영체제를 구동합니다. 일반적으로 가상 머신은 대부분의 애플리케이션이 필요한 것보다 많은 자원을 제공합니다.

## Docker 환경 준비하기

Docker CE/EE를 설치합니다.

### Docker version 확인하기

1. `docker --version` 명령어를 통해 Docker version을 확인합니다.

```sh
$ docker --version

Docker version 18.06.1-ce, build e68fc7a
```

2. `docker info` 혹은 `docker version` 명령어로 도커에 대한 디테일한 정보를 확인합니다.

```sh
$ docker info

Client:
 Version:           18.06.1-ce
 API version:       1.38
 Go version:        go1.10.3
 Git commit:        e68fc7a
 Built:             Tue Aug 21 17:21:31 2018
 OS/Arch:           darwin/amd64
 Experimental:      false

Server:
 Engine:
  Version:          18.06.1-ce
  API version:      1.38 (minimum version 1.12)
  Go version:       go1.10.3
  Git commit:       e68fc7a
  Built:            Tue Aug 21 17:29:02 2018
  OS/Arch:          linux/amd64
  Experimental:     true
```

> 퍼미션 에러와 `sudo` 명령어 사용을 위해, 사용자 계정을 `docker` 그룹에 추가하세요.

#### Permisson error를 피하기 위한 `docker` 그룹에 사용자 추가하기

1\. `docker` 그룹을 생성한다.

```sh
$ sudo groupadd docker
```

2\. 사용자를 `docker` 그룹에 추가한다.

```sh
$ sudo usermod -aG docker $USER
```

3\. 그룹권한을 재설정 하기위해 로그아웃 후 다시 접속한다.

4\. `sudo` 명령어 없이 `docker`를 실행하여 권한테스트를 한다.

```sh
$ docker run hello-world
```

### Docker 설치 테스트하기

1. 설치한 Docker를 간단한 도커 이미지인 hello-world를 통해 테스트합니다.

```sh
$ docker run hello-world

Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
d1725b59e92d: Pull complete
Digest: sha256:0add3ace90ecb4adbf7777e9aacf18357296e799f81cabc9fde470971e499788
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
 ```

2. 다운로드한 `hello-world` 이미지를 목록에서 확인해보세요.

 ```sh
 docker image ls

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
postgres            latest              39dfbcb5424b        4 weeks ago         311MB
ubuntu              16.04               4a689991aa24        7 weeks ago         116MB
ubuntu              latest              ea4c82dcd15a        7 weeks ago         85.8MB
hello-world         latest              4ab4c602aa5e        3 months ago        1.84kB
ubuntu              12.04               5b117edd0b76        20 months ago       104MB
 ```

 3. 이미지를 통해 생성된 `hello-world` 컨테이너를 목록에서 확인하세요. 만약 컨테이너가 여전히 구동 중이라면, `--all` 옵션은 필요하지 않습니다.

```sh
$ docker container ls --all

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
063b9e26ba47        ubuntu              "/bin/bash"         13 days ago         Up 13 days                              brave_liskov
```

### 정리 및 치트 시트

```sh
## Docker CLI 명령어 목록
docker
$ docker container --help

## Docker 버전 및 정보 조회
$ docker --version
$ docker version
$ docker info

## Docker 이미지 실행하기
$ docker run hello-world

## Docker 이미지 목록 조회
$ docker image ls

## Docker 컨테이너 목록 조회 (running, all, all in quiet mode)
$ docker container ls
$ docker container ls --all
$ docker container ls -aq
```

## Part 1 결론

Containerization은 CI/CD를 매끄럽게 만듭니다. 그 예로,

* 애플리케이션은 시스템 의존성이 없습니다.
* 분산 애플리케이션의 어떤 부분도 업데이트될 수 있습니다.
* 자원 밀도가 최적화될 수 있습니다.

Docker와 함께, 무거운 VM 호스트를 구동하는 것이 아닌, 애플리케이션 확장이 주된 관심사가 됩니다.
