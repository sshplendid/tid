# VPC

## FAQ

* VPC는 AWS의 가상 네트워크

## Hands on

### VPC Public subnet 구성하기

1. VPC 생성
1. Subnet 생성
1. Internet Gateway 생성 및 서브넷 연결
1. acl 구성
  1. ssh open
  1. http open
1. Route table에서 0.0.0.0/0 -> Internet gateway로 연결

--> 서버 인스턴스에서 외부로 나가는 connection lost