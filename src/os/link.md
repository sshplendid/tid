# 심볼릭 링크, 하드 링크

## 심볼릭 링크(symbolic link)

소프트 링크(soft link)라고도 한다. 윈도우의 바로가기와 비슷한 개념으로 파일을 복사할 필요 없이 사용 가능하고, 원본 파일이 업데이트될 경우 링크된 파일에 바로 적용된다. 하나의 파일을 여러 사용자가 사용하거나 동일한 라이브러리를 구성해야 할 경우 사용된다.
`ls` 명령어를 사용해서 심볼릭 링크를 보면 아래와 같이 실제 파일 혹은 프로세스가 존재하는 위치를 가리킨다.

```sh
$ ln -s /home/ubuntu/workspace/nginx /etc/nginx

$ ls /etc/ | grep nginx
lrwxrwxrwx  1 root root      28 Dec 18 06:13 nginx -> /home/ubuntu/workspace/nginx
```

## 하드 링크(hard link)

하드 링크는 링크된 파일의 내용이 변경된 경우에 원본 파일도 동일하게 변경된다. 하나의 파일을 가리키는 링크가 하나 더 생기는 것이다. 그러므로 파일이 삭제되어도 남아있는 링크가 있다면 자원에 접근할 수 있다.

```sh
$ echo hello > hello
$ cat hello
hello
$ ln hello bye
$ echo bye >> bye
$ cat bye
hello
bye
$ cat hello
hello
bye
$ rm hello
$ cat bye
hello
bye
```
