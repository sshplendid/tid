# POSIX

## TL;DR

POSIX는 서로 다른 UNIX OS의 공통 API를 정리한 IEEE 애플리케이션 인터페이스 규격이다. 목적은 이식성이 높은 유닉스 응용 프로그램 개발하는 것이다.

## POSIX의 내용

POSIX엔 아래 외에 다양한 분야의 규격이 존재한다.

* 커널로의 C 언어 인터페이스 시스템 콜
* 프로세스 환경
* 파일과 디렉토리
* 시스템 데이터베이스
* tar 압축 포맷

## 리눅스와 포직스

리눅스는 포직스 호환 운영 체제 커널을 목표로 개발되었다.

## POSIX 인증 운영 체제들

[위키백과](https://en.wikipedia.org/wiki/POSIX#POSIX-certified)에 따르면 AIX, HP-UX, macOS, Solaris 등이 POSIX 표준을 따르는 운영 체제로 알려져있다. 대부분의 리눅스 배포판은 POSIX 호환성 인증은 없지만, 대부분 준수하는 것으로 알려져있다.


## MS Windows를 위한 POSIX

* Cygwin: MS Windows를 위한 가능한 큰 POSIX 호환 개발환경과 런타임 환경을 제공한다. Linux 호환 Layer를 구성하기 때문에, MinGW에 비해 Unix 호환성이 높고 안정적으로 작동한다.
* MinGW: 쵝소한의 POSIX 환경을 제공한다. Windows Native로 동작하기 때문에 Cygwin에 비해 성능이 좋다.
* Windows Subsystem for Linux: Ubuntu 이미지를 통해 리눅스 실행환경을 제공한다. Windows 10부터 지원

## Signal (IPC, Inter-Process Communication)

Signal, 유닉스 신호는 POSIX 호환 운영 체제에서 쓰이는 프로세스 간의 통신이다. 

### 신호 보내기

* `Ctrl-C` (SIGINT): 기본적으로 프로세스를 종료
* `Ctrl-Z` (SIGTSTP): 프로세스가 실행을 유예
* `Ctrl-\` (SIGQUIT): 프로세스를 종료시킨 뒤 코어를 덤프
* `Ctrl-T` (SIGINFO): (모든 유닉스에서 지원하진 않음) 명령에서 지원하는 경우 운영 체제가 실행 중인 명령에 대한 정보를 표시



