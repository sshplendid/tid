# EC2

## FAQ

### 개요

* EC2는 무엇인가?
  * 컴퓨팅 규모를 자유자재로 변경할 수 있는 웹 서비스
  * 쉽게 웹 규모의 컴퓨팅 작업(웹 서버?)를 수행할 수 있게 설계됨
* EC2로 할 수 있는 작업?
  * 웹 서비스 인터페이스를 통해 컴퓨팅을 수행
  * 간편하게 필요한 용량을 얻을 수 있음
  * 서버 인스턴스를 획득하고 부팅하는데 단 몇분 소요
* EC2를 구성하는 방법
  1. AWS 계정을 설정
  1. AMI를 선택하거나 만들어 선택
  1. `RunInstances` API를 사용하여 원하는 수의 인스턴스를 생성 (인스턴스 개수는 20개로 제한)
    1. 20개가 넘는 인스턴스를 구성하려면 요청 양식을 작성해야 함
    2. API 요청 결과가 성공 메시지를 반환하고 인스턴스를 시작함
  1. `DescribeInstances` API를 사용해서 인스턴스의 상태를 확인
  1. `TerminateInstances` API를 사용해서 인스턴스를 종료(인스턴스 소멸)
  1. EBS를 사용하는 경우 `StopInstances` API로 인스턴스를 중지시킨 경우에도 데이터를 보존할 수 있음
* 인스턴스 스토어와 EBS의 차이
  * EBS는 인스턴스 수명에 관계없이 데이터 보존
  * 로컬 인스턴스 스토리지는 인스턴스 수명기간 동안만 데이터가 유지됨
    * 인스턴스를 중지(stop)하면 데이터가 소멸됨
* 인스턴스 실행 소요시간
  * 약 10분이 걸리지 않지만, 처음 부팅하는 인스턴스는 약간 더 걸릴 수 있음



## Hands on

### EC2 인스턴스 생성하기

[Linux 가상 머신 시작](https://aws.amazon.com/ko/getting-started/tutorials/launch-a-virtual-machine/) 를 보고 따라함.

* 인스턴스 정보
  * 인스턴스 이미지: ami-00dc207f8ba6dc919 Amazon Linux AMI 2018.03.0 (HVM)
  * 인스턴스 유형: t2.micro

#### 인스턴스 접속 (SSH)

> 인스턴스 생성할 때 발급받은 Keypair(*.pem)은 파일 권한을 400으로 변경해야 한다.
> 아래 명령이 필요하다.  
> `chmod 400 MyKeyPair.pem`

SSH로 EC2 접속하기

```bash
$ ssh -i ~/.ssh/MyMacbookKeypair.pem ec2-user@13.125.207.77
```
  
#### CLI KeyPair

##### KeyPair 생성

```bash
$ aws ec2 create-key-pair --key-name MyKeyPair --query 'KeyMaterial' --output text > MyKeyPair.pem
```

### EC2 인스턴스 CLI로 생성

```bash
$ aws ec2 run-instances --profile admin \
--image-id ami-00dc207f8ba6dc919 --count 1 --instance-type t2.micro \
--key-name OfficeKeyPair --security-group-ids sg-09175e0acb5baeef8 --subnet-id subnet-04064fc6dc0785aef
```




#### CLI Cheat Sheet

```bash
$ aws ec2 describe-images --image-ids ami-00dc207f8ba6dc919 --profile admin # EC2 인스턴스 이미지 조회
$ aws ec2 describe-instances --instance-ids i-0cb2272fff1199138 --profile admin # 인스턴스 조회
$ aws ec2 describe-instance-status --instance-ids i-0cb2272fff1199138 --profile admin # 인스턴스 상태 조회
```