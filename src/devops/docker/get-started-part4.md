# 시작하기 - Part 4: 스웜

## 전제조건

* [Docker 1.13 이상 설치](https://docs.docker.com/install/)
* [Part 3 전제조건](./get-started-part3.md#a전제조건)에 기술된 [Docker Compose](https://docs.docker.com/compose/overview/) 준비
* [도커 머신](https://docs.docker.com/machine/overview/)을 준비합니다. Mac & Windows에선 미리 설치되지만, 리눅스에선 직접 설치해야 합니다. Windows 10 에선 [Docker Toolbox](https://docs.docker.com/toolbox/overview/)를 사용해야 합니다.
* [Part 1](./get-started-part1.md)을 읽고 [Part 2](./get-started-part2.md)에서 컨테이너 생성 방법에 대해서 학습합니다.
* `waltz` 이미지를 생성해서 레지스트리에 발행하는 것까지 해봐야 합니다. 이 장에서 공유한 이미지를 사용할 예정입니다.
* 그 이미지가 배포된 컨테이너로서 작동하는지 확인합니다. `docker run -p 4000:80 사용자명/저장소:태그` 명령을 실행하면, `http://localhost:4000/`으로 접속되는 것을 확인해야 합니다.
* [Part 3](./get-started-part3.md) 에서의 `docker-compose.yml` 파일의 복사본을 준비합니다.

## 소개

Part 3에서, Part 2에서 작성한 애플리케이션을 얻고 어떻게 운영 환경에서 실행할지에 대해 서비스에 넣고, 규모를 다섯 배로 늘리는 방법에 대해 정의했습니다. Part 4에선, 애플리케이션을 여러 대의 장비에서 실행하는 클러스터 위에 배포할 겁니다. 멀티 컨테이너, 멀티 머신 애플리케이션은 **스웜**이라 불리는 "Dockerized" 클러스터 안으로 여러 대의 장비를 연결하는 것을 가능케 합니다.

## 스웜 클러스터 이해하기

스웜은 도커를 실행하고 클러스터에 연결하는 장비들의 모음입니다. 여태까지 Docker 명령으로 실행했다면, 이젠 **스웜 매니저**를 통해서 클러스터를 실행합니다. 스웜의 장비들은 물리적 혹은 가상의 장비가 될 수 있습니다. 일단 스웜에 연결되면, 장비들은 **노드**로 불립니다.

스웜 매니저는 "emptiest node" - 최소의 자원을 이용 중인 장비들을 컨테이너로 채우는 방법 - 이나, "global" - 각 장비가 특정 컨테이너의 정확히 하나의 인스턴스만을 갖는 방법 등의 전략을 사용하여 컨테이너를 운용합니다. 컴포즈 파일에 이런 전략들을 사용하는 지시를 작성하고 스웜 매니저를 통해 관리합니다.

스웜 매니저는 **워커**라 불리는 다른 장비들에 명령을 하거나, 인가하는, 스웜 내의 유일한 장비입니다. 워커는 작업 용량을 제공하기 위해 존재하고, 다른 장비들이 어떤 일을 해야하는지 명령할 권한이 없습니다.

지금까지, 로컬 장비에서 단일 호스트 모드로서 도커를 사용했습니다. 하지만 도커는 **스웜 모드**로 동작할 수 있습니다. 이는 스웜의 사용을 활성화시켜서 현재 장비를 즉시 스웜 매니저로 동작하도록 합니다. 그 때부터, 도커는 현재 장비 대신 관리하는 스웜 내에서 지시한 명령을 실행합니다.

## 스웜 설치하기

스웜은 물리 장비 혹은 가상 장비로 만들 수 있는 다중 노드로 구성됩니다. 기본 컨셉은 간단합니다. `docker swarm init` 명령을 실행해서 스웜모드를 활성화하고 현재 장비를 스웜 매니저로 만듭니다. 그리고 다른 장비에서 `docker swarm join` 명령을 실행해서 워커 역할로 스웜에 연결합니다. 아래 보이는 탭을 선택해서 여러 환경에서 동작하는 방법을 살펴봅시다. VM을 사용해서 빠르게 두 장비를 생성하고 이를 스웜으로 바꿉니다.

### 클러스터 생성하기

#### Mac, Linux, Windows 7 & 8 환경에서 VM 설치하기

VM을 생성하기 위한 하이퍼바이저가 필요합니다. 그래서 로컬 운영체제를 위한 [Oracle VirtualBox](https://www.virtualbox.org/wiki/Downloads)를 설치합니다.

> Note: 만약 윈도우즈 시스템에 Hyper-V가 설치되었다면, VirtualBox를 설치할 필요가 없고 Hyper-V를 이용하면 됩니다. 만약 [Docker Toolbox]()를 사용하고 있다면, 이미 일부로서 설치되어 있으므로 그걸 사용하면 됩니다.

이제 `docker-machine`을 사용하여 두 대의 VM을 만들어봅시다.

```sh
$ docker-machine create --driver virtualbox myvm1
$ docker-machine create --driver virtualbox myvm2
```

### VM 목록을 조회하고 IP 주소 얻기

이제 `myvm1`과 `myvm2`라고 명명된 두 가상장비를 얻었습니다.

아래 명령을 사용해서 장비의 목록을 조회하고 IP 주소를 확인해봅시다.

```sh
$ docker-machine ls
```

그리고 이 명령의 결과를 확인합시다.

```sh
$ docker-machine ls

NAME    ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER     ERRORS
myvm1   -        virtualbox   Running   tcp://192.168.99.100:2376           v18.09.0
myvm2   -        virtualbox   Running   tcp://192.168.99.101:2376           v18.09.0
```

### 스웜 초기화하고 노드 추가하기

첫 번째 장비를 명령을 관리하고 워커들을 승인하는 매니저로 사용하고, 두 번째 장비는 워커로 사용합니다.

`docker-machine ssh` 명령을 사용하여 VM들엑 명령을 전송합니다. `myvm1` 장비를 스웜 매니저로 만들기 위해 `docker swarm init` 명령을 지시하고 결과값을 확인합니다.

```sh
$ docker-machine ssh myvm1 "docker swarm init --advertise-addr 192.168.99.100"

Swarm initialized: current node (q4hro97lh4c6ry3wdnp9grmwp) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-68gk029aiohwlwkf3zgxfoj0f77x0jfof8wh83bkfmttyhl9ls-9jt74cqp9dzu6neow1pb47npj 192.168.99.100:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

> #### 포트 2377과 2376
>  
>항상 2377 포트(스웜 관리 포트)로 `docker swarm init` 명령과 `docker swarm join` 명령을 실행하거나 아무 포트번호 없이 실행하면 기본적으로 2377 포트를 점유합니다.  
>
>`docker-machine ls` 명령으로 장비 IP는 2376 포트를 포함해서 반환됩니다. 이는 도커 대몬 포트입니다. 이 포트를 사용하지 마세요. 그렇지 않으면 [에러](https://forums.docker.com/t/docker-swarm-join-with-virtualbox-connection-error-13-bad-certificate/31392/2)를 확인할 수 있습니다.

> #### SSH를 사용하는데 문제가 있나요? -native-ssh 플래그를 사용해보세요.  
>
> 도커 머신은 [OS의 SSH를 사용할 수 있게하는 옵션](https://docs.docker.com/machine/reference/ssh/#different-types-of-ssh)이 있습니다. 어떤 이유로 스웜매니저에 명령을 전송하는데 문제가 있다면, `--native-ssh` 플래그를 사용해서 ssh를 사용해보세요.  
>```sh
>docker-machine --native-ssh ssh myvm1 ...
>```

보이는 바와 같이 `docker swarm init` 명령의 응답은 미리 설정된 `docker swarm joing` 명령을 포함합니다. 이 명령은 어떤 노트든 추가해서 실행할 수 있습니다. 이 명령을 복사해서 `docker-machine ssh` 명령을 통해 `myvm2`에 전송합니다. 이제 `myvm2`는 워커로서 스웜에 연결되었습니다.

```sh
$ docker-machine ssh myvm2 "docker swarm join \
dquote> --token SWMTKN-1-68gk029aiohwlwkf3zgxfoj0f77x0jfof8wh83bkfmttyhl9ls-9jt74cqp9dzu6neow1pb47npj \
dquote> 192.168.99.100:2377"
This node joined a swarm as a worker.
```

축하합니다! 이제 첫 번째 스웜을 만들었습니다!

매니저에서 `docker node ls` 명령으로 스웜의  노드듣을 확인해봅시다.

```sh
$docker-machine ssh myvm1 "docker node ls"

ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
q4hro97lh4c6ry3wdnp9grmwp *   myvm1               Ready               Active              Leader              18.09.0
ve4jyfs9zzq5ncinylszk1qvc     myvm2               Ready               Active                                  18.09.0
```

> #### 스웜 떠나기
>
>만약 다시 시작하고 싶으면, `docker swarm leave`를 각 노드에서 실행하면 됩니다.

myvm2에서 명령을 실행하면, 아래와 같이 `STATUS`가 `Down`으로 바뀐다.

```sh
$ docker-machine ssh myvm2 "docker swarm leave"

ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
q4hro97lh4c6ry3wdnp9grmwp *   myvm1               Ready               Active              Leader              18.09.0
ve4jyfs9zzq5ncinylszk1qvc     myvm2               Down                Active                                  18.09.0
```

## 스웜 클러스터에 애플리케이션 배포하기

어려운 부분은 지나갔습니다. 이제 애플리케이션을 스웜에 배포하기 위해서 Part 3에서 했던 과정을 반복하면 됩니다. `myvm1` 처럼 하나의 스웜 매니저가 Docker 명령을 실행하는 것만 기억하세요. 워커는 작업의 수용력을 위한 것들입니다.

### 스웜 매니저의 `docker-machine` 셸 설정하기

지금까지 Docker 명령을 `docker-machine ssh`으로 래핑해서 VM과 통신했습니다. 다른 방법으로 `docker-machine env <장비명>`을 실행해서 VM의 도커 대몬과 통신하기 위해 현재 셸을 설정할 수 있습니다. 이는 다음 단계를 위한 더 좋은 방법입니다. 이는 로컬환경의 `docker-compose.yml` 파일을 사용해서 어떤 복사본 없이 어디에든지 "원격"으로 애플리케이션을 배포할 수 있게 허용하기 때문입니다.

`docker-machine env myvm1`을 타이핑하고 명령을 수행한 수, 콘솔 결과를 확인하세요. 그리고 마지막 줄의 `myvm1`과 통신하기 위한 셸 설정 명령을 실행해보세요.

#### Mac 혹은 Linux의 Docker 장비 셸 환경 설정

`docker-machine env myvm1` 명령을 실행해서 `myvm1`과 통신하기 위한 셸 설정 명령을 확인하세요.

```sh
$ docker-machine env myvm1

export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/sshplendid/.docker/machine/machines/myvm1"
export DOCKER_MACHINE_NAME="myvm1"
# Run this command to configure your shell:
# eval $(docker-machine env myvm1)
```

`myvm1`과 통신하기 위한 셸 설정 명령을 실행하세요.

```sh
$ eval $(docker-machine env myvm1)
```

`docker-machine ls`를 실행해서 `myvm1`이 `*` 로 표시된, 활성화된 장비임을 검증하세요.

```sh
$ docker-machine ls

NAME    ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER     ERRORS
myvm1   *        virtualbox   Running   tcp://192.168.99.100:2376           v18.09.0
myvm2   -        virtualbox   Running   tcp://192.168.99.101:2376           v18.09.0
```

### 스웜 매니저 상에서 애플리케이션 배포하기

이제 `myvm1`이 있으니, Part 3에서 사용했던 `docker stack deploy` 명령과 로컬 파일 `docker-compose.yml` 으로 `myvm1`에 애플리케이션을 배포해야 합니다. 이 명령은 완료될 때 까지 몇 초가 걸리고 배포된 애플리케이션은 얼마가 지나야 가용상태가 됩니다. `docker service ps <서비스 이름>` 명령으로 모든 재배포된 서비스를 검증하세요.

`docker-machine` 셸 설정으로 `myvm1`에 연결되었습니다. 그리고 여전히 로컬 호스트의 파일에 접근할 수 있습니다. 이전에 `docker-compose.yml` 파일을 작성했던 디렉토리 위치를 확인하세요. 그리고 그 위치에서 `myvm1` 상에 애플리케이션 배포를 위한 다음 명령을 실행하세요.

```sh
$ docker stack deploy -c docker-compose.yml getstartedlab
```

이제 다 됐습니다. 애플리케이션이 스웜 클러스터에 배포되었습니다!

> Note: 만약 이미지가 Docker Hub 대신 개인 저장소에 저장되어 있다면, `docker login <레지스트리 명>`으로 로그인한 다음 `--with-registry-auth` 플래그를 추가합니다. 아래처럼 하면 됩니다.  
>
> ```sh
> docker login registry.example.com
>
> docker stack deploy --with-registry-auth -c docker-compose.yml getstartedlab
> ```
>
> 이는 암호화된 WAL 로그를 사용해서 로컬 클라이언트로부터 서비스가 배포된 스웜 노드까지 통과하게 합니다. 이 정보로, 노드는 레지스트리에 접속 가능해지고 이미지를 받아올 수 있습니다.

이제 [Part 3에서 사용된 도커 명령](./get-started-part3.md#a새로운-로드-밸런스-된-애플리케이션-실행하기)을 사용해야 합니다. 오직 이번만 `myvm1`과 `myvm2` 사이에 분산된 서비스를 알아차릴 것입니다.

```sh
$ docker stack ps getstartedlab

ID                  NAME                  IMAGE                          NODE                DESIRED STATE       CURRENT STATE         ERROR               PORTS
219e9nvteidh        getstartedlab_web.1   sshplendid/get-started:part2   myvm1               Running             Running 6 hours ago
uczmecew5lcc        getstartedlab_web.2   sshplendid/get-started:part2   myvm3               Running             Running 6 hours ago
uoc8ulrnurdk        getstartedlab_web.3   sshplendid/get-started:part2   myvm2               Running             Running 6 hours ago
zp1553lrlph1        getstartedlab_web.4   sshplendid/get-started:part2   myvm3               Running             Running 6 hours ago
tzys637kf3hv        getstartedlab_web.5   sshplendid/get-started:part2   myvm2               Running             Running 6 hours ago
```

> #### `docker-machine env`와 `docker-machine ssh`로 VM에 연결하기
> 
> * `myvm2`처럼 다른 장비와 통신하기 위해 셸을 설정하려면, 간단하기 `docker-machine env` 명령을 셸에서 재실행하고 주어진 명령을 실행하면 됩니다. 이건 항상 현재 셸에서만 한정되는 명령입니다. 만약 설정되지 안흥ㄴ 셸로 변경하거나 새로운 셸을 열면, 이 명령을 재실행해야 합니다. `docker-machine ls` 명령을 사용해서 장비들을 조회하고, 각 장비가 어떤 상태인지 확인하고, IP 주소를 확인한 후, 어떤 장비에 연결되어 있는지 확인하세요. 더 알고 싶다면, [Docker Machine 시작하기](https://docs.docker.com/machine/get-started/#use-machine-to-run-docker-containers) 문서를 살펴보세요.
> * 대안으로, Docker 명령을 아래와 같은 형식으로 감싸서 사용할 수 있습니다. 이는 VM에 직접적으로 기록되지만, 로컬 호스트의 파일에 직접 접근하지 못합니다.
> * Mac이나 Linux에서, `docker-machine scp <파일 명> <장비 명>:~` 명령을 사용해서 장비 간 파일 복사가 가능합니다. 그러나 윈도우즈 사용자는 [Git Bash](https://gitforwindows.org/) 같은 리눅스 터미널 에뮬레이터가 필요합니다.
> 
> 모든 플랫폼에서 `docker-machine` CLI를 사용할 수 있기 때문에, `docker-machine ssh`와 `docker-machine env` 튜토리얼 데모가 가능합니다.

### 클러스터에 접근하기

이제 `myvm1` 혹은 `myvm2`의 IP 주소로 애플리케이션에 접근할 수 있습니다.

생성된 네트워크는 그 장비들과 로드-밸런싱 사이에서 공유됩니다. `docker-machine ls` 명령을 실행해서 VM 장비들의 IP주소를 확인하고 각 장비에 브라우져를 통해 접속해보세요. (간단하게 `curl`을 사용할 수도 있습니다.)

여기, 로드-밸런싱 중인, 무작위로 순환하는 다섯 컨테이너가 있습니다. 

두 IP 주소 모두 작동하는 이유는 스웜에 참가하는 노드가 **라우팅 메시(routing mesh)**에 진입했기 때문입니다. 이는 스웜 내 특정 포트에 배포된 서비스들이 항상 서비스 자신이 예약한 포트를 소유하고 있음을, 노드가 실제로 컨테이너를 구동 중이더라도, 반드시 보장하게 합니다. 여기 세 노드를 가진 스웜의 `8080` 포트에 배포된, `my-web`이라고 불리는 서비스를 위한 라우팅 메시가 어떻게 작동하는지에 대한 다이어그램을 확인해보세요.

![routing mesh](https://docs.docker.com/engine/swarm/images/ingress-routing-mesh.png)

> #### 연결에 문제가 있나요?
>
> 스웜 내에서 진입 네트워크를 사용하는 것은 스웜모드를 활성화하기 전에 스웜 노드 사이에 아래 포트를 개방해야 하는 것을 명심하세요.
>
> * 컨테이너 네트워크 탐색을 위한 7946 TCP/UDP 포트
> * 컨테이너 진입 네트워크를 위한 4789 UDP 포트

## 애플리케이션 규모 조절하기 및 반복하기

여기부턴 Part 2와 Part 3에선 배운 모든 작업을 반복합니다.

`docker-compose.yml` 파일을 변경함으로서 애플리케이션의 규모를 조절합니다.

코드를 수정하고, 다시 빌드하고, 새로운 이미지를 생성함으로써, 애플리케이션의 행동을 변경합니다. (이를 위해, 이전에 배운 [애플리케이션 빌드하기](./get-started-part2.md#a애플리케이션-빌드하기)와 [이미지 생성하기](./get-started-part2.md#a이미지-발행하기) 단계를 반복합니다).

어느 쪽이던, `docker stack deploy` 명령으로 간단하게 변경사항을 배포할 수 있습니다.

어떤 물리적/가상화된 장비이건, `docker swarm join` 명령으로, 스웜에 연결할 수 있습니다. `myvm2`에 사용했던 것처럼요. 그럼 클러스터의 수용력이 늘어날 것입니다. 간단하게 `docker stack deploy` 명령을 그 뒤에 실행하면, 애플리케이션은 새로운 자원을 활용할 수 있을 것입니다.

## 클린업과 리부트

### 스택과 스웜

`docker stack rm` 명령으로 스택을 내릴 수 있습니다.

```sh
docker stack rm getstartedlab
```

> #### 스웜을 유지하거나 삭제하기
>
>만약 스웜을 제거하고 싶다면 매니저와 워커 각각 아래 명령으로 제거할 수 있습니다.
>
>* 워커: `docker-machine ssh myvm2 "docker swarm leave"`
>* 매니저: `docker-machine ssh myvm1 "docker swarm leave --force"`
>
>하지만 Part 5에서 스웜이 필요하기 때문에, 당분간 유지해야 합니다.

### docker-machine 셸 변수 설정 해제하기

아래 명령으로 `docker-machine` 환경 변수를 해제할 수 있습니다.

Mac과 Linux 환경

```sh
eval $(docker-machine env -u)
```

Windows 환경

```bat
& "C:\Program Files\Docker\Docker\Resources\bin\docker-machine.exe" env -u | Invoke-Expression
```

이 명령은 `docker-machine`으로 생성된 가상 장비로부터 셸 접속을 끊고, 동일한 셸에서 네이티브 `docker` 명령을 사용할 수 있게 합니다. 더 알고 싶다면, [환경 변수 해제하기에 대한 Machine 토픽](https://docs.docker.com/machine/get-started/#unset-environment-variables-in-the-current-shell)에 대해서 알아보세요.

### Docker machine 재시작하기

만약 로컬 호스트 장비를 정지시켰다면, 도커 머신 역시 정지합니다. `docker-machine ls` 명령으로 각 장비의 상태를 확인할 수 있습니다.

```sh
$ docker-machine ls

NAME    ACTIVE   DRIVER       STATE     URL   SWARM   DOCKER    ERRORS
myvm1   -        virtualbox   Stopped                 Unknown
myvm2   -        virtualbox   Stopped                 Unknown
myvm3   -        virtualbox   Stopped                 Unknown
```

재시작하기 위해, 아래 명령을 실행합니다.

```sh
docker-machine start <장비 명>
```

모든 장비를 재시작하기 위해서, 아래 명령을 실행하면 됩니다.

```sh
$ docker-machine start $(docker-machine ls -q) # 모든 장비 시작하기

Starting "myvm3"...
Starting "myvm1"...
Starting "myvm2"...
(myvm3) Check network to re-create if needed...
(myvm3) Waiting for an IP...
Machine "myvm3" was started.
Waiting for SSH to be available...
(myvm1) Check network to re-create if needed...
(myvm1) Waiting for an IP...
(myvm2) Check network to re-create if needed...
(myvm2) Waiting for an IP...
Machine "myvm1" was started.
Waiting for SSH to be available...
Machine "myvm2" was started.
Waiting for SSH to be available...
Detecting the provisioner...
Detecting the provisioner...
Detecting the provisioner...
Started machines may have new IP addresses. You may need to re-run the `docker-machine env` command.
```