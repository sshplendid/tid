## TCP service [RFC 793]

안정적으로, 순서대로, 에러없이 교환할 수 있게 한다.

### 특징
  * Reliable, in-order byte stream data transfer: 신뢰성 있게 데이터를 전송한다
  * Flow control: Sender가 Receiver가 받을 수 있게 전달하는 전송속도를 제어한다.
  * Congestion control: Sender는 네트워크의 상황에 맞춰서 데이터를 전송해야 한다.

## UDP [RFC 768]
UDP의 전송 방식은 너무 단순해서 서비스의 신뢰성이 낮고, 데이터그램 도착 순서가 바뀌거나, 중복되거나, 심지어는 통보 없이 누락시키기도 한다. UDP는 일반적으로 오류의 검사와 수정이 필요 없는 애플리케이션에서 수행할 것으로 가정한다.

UDP를 사용하는 네트워크 애플리케이션에는 도메인 이름 서비스 (DNS), IPTV, 음성 인터넷 프로토콜 (VoIP), TFTP, IP 터널, 그리고 많은 온라인 게임 등이 있다.

### 특징
  * Connectionless
  * Unreliable data transfer
  * No flow control
  * No congestion control
