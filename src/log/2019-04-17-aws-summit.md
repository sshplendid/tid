# AWS Summit Seoul 2019

## 타 게임사의 경험으로 본 AWS 핵심 모범 사례 한방에 배우기

* Tips for Cost Optimization
  * RI 구매방법 및 고려사항
    * RI: 예약 인스턴스
    * AWS에서 RI 최적 플랜 제공
    * AWS 비용 탐색기를 활용 (Cost Explorer)
* Tips for Support case
  * 호주 현지국인 엔지니어 대응 호주 현지시간 9-5
* 인스턴스 강제 재시작 사례
  * 원인: 노후화 장비 정비 등의 이유
  * 인스턴스 다중화 ?@??!! 이건 하나마나한 소리가 아닌지...?

## AWS System Manager: Parameter Store를 사용한 AWS 구성 데이터 관리 기법

* 정창훈, 당근마켓

* Parameter store?
  * AWS System manager - parameter store
  * EC2 서비스에서도 바로 접근 가능

* System manager
  * 특징
    * Resource groups:
    * Insight
    * Actions
    * Shared REsources

* Parameter store
  * 비밀번호나 구성 데이터 관리
  * 중앙 집중식 저장/관리
  * 버전관리: `aws ssm put-parameter ~~ --overwrite`
  * 암복호화: `--decryption`

## 스폰서 발표 세션 | e커머스 통합운영 자동화 사례 및 보안강화 방안, 삼성SDS

* SRE?

## 서버리스 아키텍처 패턴 및 로그 처리를 위한 파이프라인 구축기

* 패턴2: 오퍼레이션 자동화
  * 람다 리눅스 API
  * 다양한 런타임 환경 지원: 심지어 코볼도 지원함
  * 다양한 AWS 서비스와 연계
  * 코드: 코드커밋, ...
  * DB: Dynamo, ...
  * ///////////////////////////
* 패턴3: 데이터레이크
  * S3가 데이터레이크의 중앙저장소 역할을 함
* 패턴4: IOT 데이터 처리 패턴

## AWS 클라우드 핵심 서비스로 클라우드 기반 아키텍처 빠르게 구성하기

* EC2 인스턴스 선택
  * 사용유형을 고려한 인스턴스 선택
  * 프로세서 및 아키텍쳐 선택 가능
* ELB
  * ALB(HTTP/S), NLB(TCP), Classic(Deprecated)
* Storage
  * Instance Store: 휘발성
  * EBS: Network로 마운트 (비용발생)
    * 동일 가용영역 내 인스턴스에 Attach/detach
    * 하나의 EC2에만 attach 가능
    * 암호화
    * 증분백업 -> S3
  * Block/File/Object type
    * S3: REST 통신 사용
      * 리소스 당 5TB 제한
      * 버킷/리소스(파일)단위로 접근제어 설정 가능
      * Athenaa를 사용해서 대화형 쿼리 서비스 사용 가능 -> 파일 업로드 후 데이터 분석!
      * 비용절감도구: S3 Intelligent Tiering
      * 라이프사이클 관리정책을 적용하면 알아서 리소스의 저장소 유형을 변경함
      * SFTP 서비스 제공
    * EFS: 매니지드 NAS 서비스
      * On-premise 서버에서도 사용 가능
      * 사용량에 따라 과금 / 초기 용량 산정이 없음
* VPC: 클라우드 VPN 서비스
  * 시큐리티 그룹 체이닝: 특정 시큐리티 그룹을 통과한 요청에 대해 접근권한 설정 가능 ELB~WEB~API~DB
* DB
  * RDS
    * Read Replica 구성 가능
    * 백업관리 -> S3
* Cloud Front