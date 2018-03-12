# Node.js - oracledb 설치

[oracledb 설치가이드](https://github.com/oracle/node-oracledb/blob/master/INSTALL.md#instructions) 를 참고해서 설치한 기록

# 사전 설정

## proxy 설정

사내에서 self signed 인증서를 사용 중이어서 ssl 인증 오류를 해결하는데 시간이 걸렸다.(엄청 간단함)

### git

```sh
## proxy 설정
git config --global http.proxy http://proxy.address.is.here
git config --global https.proxy http://proxy.address.is.here

# SSL 인증서 체크여부 false
git config --global http.sslVerify false

### 인증서 위치 설정
git config --system http.sslcainfo 인증서 위치
```

### npm

```sh
## NPM Proxy 설정

npm config set cafile="인증서 위치"

npm config set http_proxy http://proxy.address.is.here
npm config set https_proxy http://proxy.address.is.here
npm config set strict-ssl false
npm config set registry http://registry.npmjs.org/
```

## Python 2.7 설치

## C++ 11 이상 Compiler 설치

## Oracle Instant Client 설치

사용중인 Node.js 버전과 같은 사양의 client를 사용해야 한다.
  * 만약 Node.js 64bit 버전을 사용 중이라면 Instant Client 역시 같은 64bit를 사용해야 함

client version에 따라 [적절한 Visual C++ Redistributable](https://github.com/oracle/node-oracledb/blob/master/INSTALL.md#--366-install-the-visual-studio-redistributables) 패키지를 설치해야 한다.
  * Oracle client 12.2: Visual Studio 2013 Redistributable
  * Oracle client 12.1: Visual Studio 2010 Redistributable
  * Oracle client 11.2: Visual Studio 2005 Redistributable

11.2 client 사용 중이었는데 32bit라서 64bit로 재설치했다. 여기서도 오류가 발생했는데 client를 못잡는 원인을 c++ redistributable로 착각하고 삽질했다.

# 설치

```sh
npm install oracledb
```

만약 `NJS-054: Binary build/Release/oracledb.node was not installed from oracledb-v2.1.2-node-v57-win32-x64.gz`와 같은 오류가 발생하면 `npm install oracle/node-oracledb.git#v2.1.2` 명령을 실행한다.

이 부분에서 `node-oracledb`의 소스코드를 컴파일하는 과정이 필요한데 파이썬과 C++ 11 ↑ 컴파일러가 필요하다.

# 테스트
[oracledb 시작하기 가이드](https://github.com/oracle/node-oracledb/blob/master/doc/api.md#getstarted)에 있는 [샘플코드](https://github.com/sshplendid/til/blob/master/nodejs/examples/getting_started_with_node-oracledb.js)를 사용해서 db 테스트를 해봤다. 현재 시간을 출력하는 간단한 코드인데 정상적으로 출력됨을 확인했다.

    >node ./getting_started_with_ode-oracledb.js
	[ [ 2018-02-28T08:07:00.000Z ] ]

이거 하나 찍기 오랜 시간이 걸렸다;;
