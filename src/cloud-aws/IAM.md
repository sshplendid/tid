# IAM

IAM 사용하기

## CLI Cheat sheet

```bash
# --profile=admin은 아래 명령의 실행권한이 있는 계정이다.
$ aws iam create-user --user-name=shawn # 'shawn'이라는 이름을 가진 계정 생성
$ aws iam get-user --user-name=shawn --profile=admin # shawn 계정 조회 
{
    "User": {
        "Path": "/",
        "UserName": "shawn",
        "UserId": "AIDASK3VMLLUAZOZT2IMG",
        "Arn": "arn:aws:iam::160770579176:user/shawn",
        "CreateDate": "2019-04-18T04:28:26Z"
    }
}
$ aws iam tag-user --profile=admin --user-name=shawn --tags Key=type,Value=cli Key=name,Value=shshin Key=desc,Value="cli test" # 태그 3건 추가
$ aws iam get-user --user-name=shawn --profile=admin # 다시 계정정보 조회하면 태깅된 것을 볼 수 있다.
{
    "User": {
        "Path": "/",
        "UserName": "shawn",
        "UserId": "AIDASK3VMLLUAZOZT2IMG",
        "Arn": "arn:aws:iam::160770579176:user/shawn",
        "CreateDate": "2019-04-18T04:28:26Z",
        "Tags": [
            {
                "Key": "type",
                "Value": "cli"
            },
            {
                "Key": "name",
                "Value": "shshin"
            },
            {
                "Key": "desc",
                "Value": "cli test"
            }
        ]
    }
}
$ aws iam add-user-to-group --group-name=beginner \ # 생성한 계정을 특정 그룹에 포함시키는 명령
--user-name=shawn \
--profile=admin
$ aws iam get-group --group-name=beginner --profile=admin
{
    "Users": [
        {
            "Path": "/",
            "UserName": "shawn",
            "UserId": "AIDASK3VMLLUAZOZT2IMG",
            "Arn": "arn:aws:iam::160770579176:user/shawn",
            "CreateDate": "2019-04-18T04:28:26Z"
        },
        {
            "Path": "/",
            "UserName": "shshin-cli",
            "UserId": "AIDASK3VMLLUER4D26ZLI",
            "Arn": "arn:aws:iam::160770579176:user/shshin-cli",
            "CreateDate": "2019-04-18T04:24:58Z"
        }
    ],
    "Group": {
        "Path": "/",
        "GroupName": "beginner",
        "GroupId": "AGPASK3VMLLUMJYDCHGM6",
        "Arn": "arn:aws:iam::160770579176:group/beginner",
        "CreateDate": "2019-04-18T04:24:37Z"
    }
}
```