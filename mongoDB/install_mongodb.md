#MongoDB 설치

## 다운로드
https://www.mongodb.org/download
위 경로에서 mongoDB archive 버전 다운로드

## 설치
아래 경로에 압축파일 해제

    d:\devEnv\mongodb

데이터 저장소와 로그 디렉토리 생성

    d:\devEnv\data\db
    d:\devEnv\mongodb\log

환경파일 생성
`d:\devEnv\mongodb\mongodb.config` 하위에 아래 파일 생성

    ## MongoDB를 바인딩할 IP
    bind_ip = 127.0.0.1
    
    ## 바인딩 포트
    port = 27017
    
    ## 크리티컬 이벤트와 에러를 기록하기 위해 true로 설정
    quiet = true
    
    ## 저장된 data 위치
    dbpath=D:\devEnv\data\db
    
    ## 로그파일 위치
    logpath=D:\devEnv\mongodb\log\mongo.log
    
    ##I set this to true so that the log is not overwritten upon     restart of mongoDB.
    logappend = true
    
    ##log read and write operations
    ### v.3.6에서 제거됨
    #diaglog=3
    
    ##It ensures write durability and data consistency much as any     journaling scheme would be expected to do.
    ##Only set this to false if you don’t really care about your     data (or more so, the loss of it).
    journal = true


## MongoDB 시동
`d:\devEnv\mongodb\bin` 에서 아래 명령어를 실행해보자.

    > mongod --config d:\devEnv\mongodb\mongodb.config

그리고 mongoDB에 접속해보자.

    > mongo

## MongoDB 중지

    > db.shutdownServer()
    # 혹은
    > use admin
    switched to db admin
    > db.shutdownServer()
    server should be down...
    > quit()

https://mylko72.gitbooks.io/node-js/content/chapter12/chapter12_1.html
