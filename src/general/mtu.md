# MTU, Maximum Transmission Unit, 최대전송단위

네트워크에서 프로토콜이 최대로 전송할 수 있는 데이터 단위를 말한다. MTU가 높을수록 효율적으로 커뮤니케이션 할 수 있다. 헤더같은 프로토콜 오버헤드는 동일하지만 더 많은 데이터를 전송할 수 있기 때문이다. 

## mtu 조절 명령어

### Windows 계열

```cmd
> netsh interface ipv4 show interfaces
> netsh interface ipv4 set subinterface "네트워크장비인덱스" mtu=200 store=persistent
```

### MacOS

```bash
> ifconfig # 네트워크 인터페이스 탐색
> ifconfig 장비명 mtu 200
```


## 참고자료

* [최대전송단위](https://ko.wikipedia.org/wiki/%EC%B5%9C%EB%8C%80_%EC%A0%84%EC%86%A1_%EB%8B%A8%EC%9C%84)