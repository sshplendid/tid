# Elastic Load Balancing

## Intro

* Elastic Load Balancing, ELB는 네트워크 트래픽을 여러 가용영역에 배포한다.
* 트래픽 배포 대상은 EC2 인스턴스, 컨테이너, IP 주소 등이 포함된다.
* 트래픽의 변화에 따라 로드밸런서를 확장/축소할 수 있다.

## 장점

* 가용성
  * 여러 가용역역에 있는 컴퓨팅 리소스에 트래픽을 분산시킴
  * 정상 상태의 리소스에만 트래픽을 수신하도록 함
    * 리소스가 응답 불가능한 상태인 경우, 네트워크 트래픽 배포 대상에서 제외한다.
  * 리전에 걸친 로드 배ㅔㄹ런싱 가능
  * 99.99% 가용성 보장
* 보안
  * VPC와 연동
  * 인증서 관리, 사용자 인증, SSL/TLS 복호화 등의 보안기능 제공
  * 컴퓨팅 리소스가 주요 작업에 집중할 수 있도록 암복호화 작업을 로드밸런서로 떠넘길 수 있다.
* 탄력성
  * 네트워크 트래픽 변화에 빠르개 대처 가능ㄴ
  * Auto Scaling 통합해서 자동으로 애플리케이션 리소스 확보
  * 컴퓨팅 리소스의 추가/제거가 자유롭다. 
* 유연성
  * IP 주소를 사용해서 라우팅 할 수 있음
  * 동일 인스턴스에서 많은 애플리케이션을 호스팅 할 수 있음
* 모니터링
  * CloudWatch를 통해 애플리케이션 성능을 실시간으로 모니터링 가능
* 하이브리드 로드 밸런싱
  * AWS와 온 프레미스 리소스에 로드밸런싱 할 수 있음

## Q&A

### ELB의 종류와 적용 케이스

* Application Load Balancer
  * HTTP/S 트래픽 로드밸런싱에 적합
  * 7 계층(Application layer)에서 작동
* Network Load Balancer
  * TCP/TLS 트래픽의 로드 밸런싱에 적합
  * 4 계층(Transport layer)에서 작동
  * 고도의 성능이 요구되거나 지연시간이 낮아야 하는 애플리케이션에서 사용
* Classic Load Balancer
  * EC2-Classic 네트워크 내에 구축된 애플리케이션을 대상으로 함 (레거시?)

### 퍼블릭 IP를 사용하지 않고 ELB API 액세스

* VPC 엔드포인트를 생성하여 ELB API에 비공개로 액세스 가능

### ALB

* 지원 운영체제? -> EC2 서비스가 지원하는 모든 운영체제
* 지원 프로토콜? -> HTTP/HTTPS
* HTTP/2 지원
* 웹소켓 지원
* 요청 추적기능 활성화
* ALB 트래픽만 허용하도록 EC2 인스턴스 구성 가능
* ALB 앞단의 보안그룹 구성 가능
* Classic Load Balancer API를 ALB에 사용 불가
* 로드밸런서 유형은 전환 불가
* Classic Load Balancer -> ALB 마이그레이션 가능
* 4 계층 기능이 필요하다면 NLB를 사용해야 함
* 단일 ALB로 HTTP(80 포트) 및 HTTPS(443 포트) 에 대한 요청 처리 가능
* ALB API 호출 기록을 얻으려면 CloudTrail을 사용하면 됨
* `HTTPS 종료`를 이용하려면 SSL 인증서를 로드밸런서에 설치해야 함
* SSL 인증서를 받으려면 Certificate Manager를 이용해서 프로비저닝 가능
* Certificate Manager와 통합되어, 간단하게 로드밸런서에 인증서를 연결할 수 있음
  * 인증서 구매, 업로드 및 갱신 프로세스가 자동화 됨
* SNI(서버 이름 표시)는 하나 이상의 인증서를 동일 리스너에 연결하면 자동으로 활성화 됨
  * 반대로 하나의 인증서만 연결한 경우 자동으로 비활성화 됨
* 동일 도메인용 인증서 여러개를 보안 리스너에 연결 가능
* ALB는 IPv6을 지원함
* ALB 규칙 설정
  * 리스너에 대해 규칙을 구성할 수 있음
  * 규칙은 조건과 조건이 충족될 경우 수행할 작업으로 구성됨
  * 조건: 호스트 헤더, 경로, HTTP 헤더, 메서드, 쿼리 파라미터, 소스 IP CIDR
  * 작업: 리다이렉션, 고정 응답, 인증 및 전달
* ALB 리소스 제한
  * 리전 제한
    * 리전당 로드 밸런서: 20
    * 리전당 대상 그룹: 3000
  * 로드 밸런서 제한
    * 로드 밸런서당 리스너: 50
    * 로드 밸런서당 대상: 1000
    * 로드 밸런서당 가용 영역당 서브넷: 1
    * 로드 밸런서당 보안 그룹: 5
    * 로드 밸런서당 규칙(기본 규칙은 계산하지 않음): 100
    * 로드 밸런서당 인증서(기본 인증서는 포함되지 않음): 25
    * 로드 밸런서당 대상을 등록할 수 있는 횟수: 100
  * 대상 그룹 제한
    * 대상 그룹당 로드 밸런서: 1
    * 대상 그룹당 대상(인스턴스 또는 IP 주소): 1000
    * 대상 그룹당 대상(Lambda 함수): 1
  * 규칙 제한
    * 규칙당 일치 평가: 5
    * 규칙당 와일드카드: 5
    * 규칙당 작업: 2(하나는 옵션 인증 작업, 하나는 필수 작업)
* WAF와 통합하여 웹 애플리케이션의 공격으로부터 방어할 수 있음
  * IP 주소, HTTP 헤더 및 사용자 정의 URI를 기반으로 규칙을 구성할 수 있음
* 로드 밸런서의 VPC 내에 있는 대상으로 로드밸런싱 가능
* ALB는 교차 영역 로드 밸런싱이 활성화 되어있음
* Cognito와 통합하여 로드밸런서의 OpenID 자격증명공급자 기본 지원
* ALB의 리디렉션유형
  * HTTP to HTTP: http://foo -> http://bar
  * HTTP to HTTPS: http://foo -> https://bar, https://foo:80/foz -> https://bar:8080/baz
  * HTTPS to HTTPS: https://foo -> https://bar
* ALB는 모든 컨텐츠 유형을 지원
* ALB를 통해 Lambda 호출할 수 있음
  * ALB의 규칙이 일치하는 경우 람다 함수가 호출됨, 요청 컨텐츠 전문은 람다 함수에 JSON 형식으로 전달
  * 람다 함수의 응답은 JSON 형식
  * 로드 밸런서는 Lambda Invoke API를 사용하여 람다 함수를 호출
  * ELB는 람다 함수 호출 권한이 있어야 함

### ALB 요금

* 실행 시간, 시간당 사용된 로드밸런서 용량 단위(LCU)에 대해 요금이 부가됨
* 로드밸런서 용량 단위(LCU)는 트래필을 처리하는 차원(새 연결, 활성 연결, 대역폭) 중 최대로 소비된 리소스를 정의함
* CloudWatch를 통해 LCU를 측정하는 네 차원의 사용량을 확인 가능함
* 부분 LCU도 과금됨