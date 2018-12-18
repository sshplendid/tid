# 시작하기 - Part 3: 서비스

## 전제조건

* Docker 1.13 이상 설치
* Docker Compose 준비하기. Mac/Windows 용 Docker에 이미 설치되어 있습니다. Linux의 경우 직접 설치해야 합니다. Windows 10에선 *Hyper-V* 없이 Docker Toolbox를 사용하세요.
* Part 1을 읽고 Part 2에서 컨테이너 생성 방법에 대해서 학습합니다.
* `waltz` 이미지를 생성해서 레지스트리에 발행하는 것까지 해봐야 합니다. 이 장에서 공유한 이미ㄹ지를 사용할 예정입니다.
* 그 이미지가 배포된 컨테이너로서 작동하는지 확인합니다. `docker run -p 4000:80 사용자명/저장소:태그` 명령을 실행하면, `http://localhost:4000/`으로 접속되는 것을 확인해야 합니다.

## 소개

3장에서 애플리케이션 규모를 조절하고 로드밸런싱을 활성화 할 것입니다. 이 일을 하기 위해, **서비스**라는 분산 애플리케이션의 계층에 대해 알아야 합니다.

* Stack
* Service (지금 여기에 있습니다)
* Container (2장에서 다뤘습니다)

## 서비스에 대해

분산 애플리케이션에서 애플리케이션의 다른 조각들을 "서비스"라고 부릅니다. 한 예로, 만약 영상 공유 사이트가 있다고 가정합시다. 이 사이트는 애플리케이션 데이터를 데이터베이스에 저장하는 서비스, 사용자가 업로드한 뭔가를 백그라운드에서 변환하는 서비스, 프론트엔드를 위한 서비스 등 여러 서비스들을 포함할 것 입니다.

서비스는 단지 "운영 환경의 컨테이너들"입니다. 오로지 하나의 이미지를 실행하지만, 이미지를 실행하는 방법 - 어떤 포트를 사용해야 하는지, 컨테이너의 레플리카를 수요를 충족하도록 얼마나 많이 구동해야 하는지 등 - 편성합니다. 서비스의 규모를 조절하는 것은 소프트웨어의 조각들을 실행하는 컨테이너 인스턴스의 수나 프로세스 상에서 서비스를 위한 자원을 더 할당해야 하는 것을 의미합니다.

운이 좋게도 Docker 플랫폼에서 서비스를 정의하고, 실행하고, 규모를 조절하는 것은 매우 쉽습니다. 단지 `docker-compose.yml` 파일을 작성하면 됩니다.

## 첫 `docker-compose.yml` 파일

`docker-compose.yml` 파일은 Docker container가 운영 환경에서 행동하는 방법을 정의한 YAML 파일입니다.

### `docker-compose.yml`

`docker-compose.yml`로 아래 내용을 저장하세요. 하지만 그 전에 Part 2에서 레지스트리에 생성한 이미지를 발행하고 이 yml 파일을 업데이트 한 이미지를 수정해야 합니다.

```yml
version: "3"
services:
  web:
    # replace username/repo:tag with your name and image details
    image: username/repo:tag
    deploy:
      replicas: 5
      resources:
        limits:
          cpus: "0.1"
          memory: 50M
      restart_policy:
        condition: on-failure
    ports:
      - "80:80"
    networks:
      - webnet
networks:
  webnet:
```

이 `docker-compose.yml` 파일은 도커가 아래와 같은 일을 하게합니다.

* 레지스트리로 부터 Part2에서 업로드한 이미지를 끌어오기
* `web`이라고 5개의 인스턴스를 구동하고 각각의 인스턴스가 최대 10%의 CPU와 50MB의 램을 사용할 수 있도록 제한하기
* 컨테이너 중 하나가 동작 실패하는 경우 즉시 재시작하기
* 호스트의 4000번 포트를 `web`의 80번 포트와 매핑하기
* `web`의 컨테이너들이 `webnet`이라 불리는 로드밸런스 네트워크를 통해  80번 포트를 공유하도록 관리하기 (내부적으로 컨테이너 그 자체가 `web`의 80번 포트로 발행함)
* webnet` 네트워크를 기본 설정(로드밸런싱으로 뒤덮은 네트워크)으로 정의하기

## 새로운 로드밸런스된 애플리케이션 실행하기

`docker stack deploy` 명령을 실행하기 전에 아래 명령을 먼저 실행해야 합니다.

```sh
$ docker swarm init

Swarm initialized: current node (mo9cxneiwqtmu3ewqm7q6tdwv) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-0kuhh5msy0fymymktuxwm0w0luad2jcu8nq5ldalabcckutes9-3wgp251zlg6w5moe3d9ni9ya4 192.168.65.3:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

> Note: 4장에서 이 명령이 뭘 의미하는지 알게될 것입니다. `docker swarm init`을 실행하지 않으면 "this node is not a swarm manger.(이 노트는 스웜 매니저가 아닙니다.)"라는 에러를 받게될 것입니다.

이제 실행해봅시다. 애플리케이션의 이름을 정해야 합니다. 여기선 `getstartedlab`이라고 설정했습니다.

```sh
$ docker stack deploy -c docker-compose.yml getstartedlab

Creating network getstartedlab_webnet
Creating service getstartedlab_web
```

하나의 서비스 스택은 호스트에서 배포된 이미지의 컨테이너 인스턴스 5개를 실행합니다. 이제 살펴봅시다. 애플리케이션의 서비스 ID를 확인해봅시다.

```sh
$ docker service ls

ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
a690upphrjmg        getstartedlab_web   replicated          2/5                 username/repo:tag   *:80->80/tcp
```

`web` 서비스의 출력결과를 살펴보면, 애플리케이션 이름이 맨 앞에 붙어있습니다. 만약 위의 예처럼 이름을 붙였다면, 이름은 `getstartedlab_web`이 될 것 입니다. 서비스 ID는 레플리카의 수, 이미지 이름, 노출된 포트와 함께 확인할 수 있습니다.

서비스에서 실행되는 각각의 컨테이너를 **태스크**라고 부릅니다. 태스크는 산술적으로 증가되는 유일한 ID를 가지고 있고, `docker-compose.yml`에 정의한 레플리카의 수까지 증가합니다. 서비스의 태스크 목록을 확인해봅시다.

```sh
$ docker service ps getstartedlab_web

```

태스크는 시스템의 모든 컨테이너들의 목록에도 나타납니다.

```sh
$ docker container ls -q

0d339f851a17
b0eec7357bd9
212ef3c86f04
554db3ec624e
1fd1227f80cc
```

`curl -4 http://localhost` 명령을 여러번 호출하거나 웹 브라우져에서 저 주소로 여러번 접속해봅시다. 

라운드-로빈 상태에서 각 요청을 로드밸런싱하기 위해 5개 태스크들 중 하나를 선택합니다. 어느쪽이던 컨테이너 ID는 바뀝니다. 컨테이너 ID들은 이전 명령인 `docker container ls -q`의 결과와 일치합니다.

> Windows 10 환경에서 실행하기
Windows 10 파워셸을 이미 `curl`이 사용 가능합니다. 그렇지 않으면 Git BASH나 Windows용 wget을 사용하세요.

> 느린 반응속도
네트워크 설정에 따라 응답은 30초까지 걸릴 수 있습니다. 이 것이 도커나 스웜 퍼포먼스를 의미하지 않지만, 나중에 나올 Redis 의존성때문일 수도 있습니다. 지금은 방문 카운터는 아직 서비스를 추가하지 않았기 때문에 작동하지 않습니다.

## 애플리케이션 규모 설정하기

`docker-compose.yml`의 `replicas`의 값을 바꿔서 애플리케이션 규모를 조절할 수 있습니다. 변경사항을 저장하면, `docker stack deploy` 명령을 재실행합니다.

```sh
$ docker stack deploy -c docker-compose.yml getstartedlab
```

도커는 즉시 업데이트를 수행해서, 어떤 컨테이너도 멈추거나 스택을 중지할 필요가 없습니다.

이제 `docker container ls -q` 명령을 재실행해서 재설정된 인스턴스들을 봅시다. 만약 레플리카의 규모나 태스크를 늘렸다면, 이런 이유로 컨테이너가 더 구동될 것입니다.

## 애플리케이션과 스웜 내리기

* `docker stack rm`을 이용해서 애플리케이션 내리기  
```sh
$ docker stack rm getstartedlab
```

* 스웜 내리기  
```sh
$ docker swarm leave --force
```

내리는 것은 애플리케이션 규모 조절과 올리는 것만큼 쉽습니다. 이제까지 운영환경에서 컨테이너를 실행하는 방법에 대해 학습했습니다. 앞으로 도커의 클러스터 위에서 보나파르트 떼(?)로써 애플리케이션을 실행하는 방법에 대해 배울 것입니다.

> Note: 이와같은 컴포즈 파일들은 Docker 애플리케이션을 정의하는데 사용되고 Docker Cloud를 사용해서 클라우드 프로바이더, 하드웨어 어디든, Docker Enterprise Edition과 함께 클라우드 프로바이더에게 업로드될 수 있습니다.

## 정리 및 cheat sheet

`docker run`을 타이핑하는 것은 간단하지만. 우녕환경에서 컨테이너를 실제로 적용하는 것은 서비스로서 구동하는 것이다. 서비스는 컨테이너의 행동을 컴포즈 파일에 따라 편성하고, 이 파일은 애플리케이션을 재배포하거나, 규모를 조정하거나, 제한하는데 사용됩니다. 서비스를 변화시키는 것은 `docker stack deploy`를 실행하는 것과 같이 ㅇ서비스를 구동하는 명령을 사용해서 응용됩니다.

```sh
docker stack ls                                  # 애플리케이션이나 스택의 리스트 조회
docker stack deploy -c <composefile> <appname>   # 특정 컴포즈 파일 실행
docker service ls                                # 애플리케이션과 연관된, 실행 중인 서비스 목록 조회
docker service ps <service>                      # 애플리케이션과 연관된, 태스크 목록 조회
docker inspect <task or container>               # 컨테이너나 태스크 검사
docker container ls -q                           # 컨테이너의 ID 목록 조회
docker stack rm <appname>                        # 애플리케이션 내리기
docker swarm leave --force                       # 단일 노드 스웜 내리기
```
