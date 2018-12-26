# 셸 명령어 목록

## chsh

기본 사용 셸을 변경할 때 사용한다.

```sh
$ chsh -s /bin/zsh
```

## which

프로그램의 위치를 리턴한다.

```sh
$ which mdbook
/home/ubuntu/.cargo/bin/mdbook
```

## uname

현재 시스템의 정보를 출력한다. 플래그 없이 사용하는 경우 -s(커널 명) 플래그를 사용하는 것과 같다.

```sh
$ uname -a # 모든 정보 표시

Linux a2f3d1dd-5b17-e822-f4c8-c7bc7075f1c3 3.13.0-100-generic #147-Ubuntu SMP Tue Oct 18 16:48:51 UTC 2016 x86_64 x86_64 x86_64 GNU/Linux
```
