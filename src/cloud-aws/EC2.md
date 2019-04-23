# EC2

## FAQ

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

#### CLI Cheat Sheet

```bash
$ aws ec2 describe-images --image-ids ami-00dc207f8ba6dc919 --profile admin # EC2 인스턴스 이미지 조회
$ aws ec2 describe-instances --instance-ids i-0cb2272fff1199138 --profile admin # 인스턴스 조회
$ aws ec2 describe-instance-status --instance-ids i-0cb2272fff1199138 --profile admin # 인스턴스 상태 조회
```