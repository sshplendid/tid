# 잡다한 macos 관련 내용

## 시동음 살리기

```console
$ sudo nvram StartupMute=%00 # 시동음 켜기
$ sudo nvram StartupMute=%01 # 시동음 끄기
```

### 출처: 트위터

<blockquote class="twitter-tweet"><p lang="ko" dir="ltr">2016년 이후에 출시된 맥에서 예전의 시동음을 되살리는 법:<br><br>1. 터미널을 열고 다음을 입력: sudo nvram StartupMute=%00<br>2. 재시동<br>3. 감격의 😭😭😭<br><br>다시 끌 때는 %00 대신 %01<a href="https://t.co/rKK6YLrjWn">https://t.co/rKK6YLrjWn</a></p>&mdash; 김정현 (@gluebyte) <a href="https://twitter.com/gluebyte/status/1232954729816195074?ref_src=twsrc%5Etfw">February 27, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>