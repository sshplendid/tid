# MongoDB 접근 제어 설정

## 사용자 관리자 계정 생성

```javascript
use admin
db.createUser({user:'adminUser', pwd:'admin', roles: ['userAdminAnyDatabase']});
db.createUser({user:'foodie', pwd:'foodie', roles: [{role: 'readWrite', db: 'food'}]});
```

## 접근제어기능 활성화 및 DB 실행

사용자 관리자 계정이 생성되면 접근 제어가 가능한 상태가 된다. `--auth` 플래그를 사용해서 MongoDB 데이터베이스를 재시작한다.

```sh
mongod --auth --config mongodb.config
```

이제 DB 서버에 접근하는 클라이언트는 계정 정보를 이용해서 접근해야 한다.

잘못된 정보를 입력하면 아래와 같이 `Authentication failed` 메시지를 리턴한다.
```sh
mongo admin --username "wrongUser" --password "wrongPassword"

MongoDB shell version v3.6.2
connecting to: mongodb://127.0.0.1:27017/admin
MongoDB server version: 3.6.2
2018-03-15T16:46:56.818+0900 E QUERY    [thread1] Error: Authentication failed.
:
DB.prototype._authOrThrow@src/mongo/shell/db.js:1608:20
@(auth):6:1
@(auth):1:2
exception: login failed
```

```sh
mongo admin --username "foodie" --password "foodie"
```

**foodie** 계정은 `food` dbs에 대한 read/write 권한을 가지고 있다. 만약 `admin` dbs에서 collection을 생성하려 하면 아래와 같이 오류가 발생한다.

```javascript
MongoDB Enterprise > use admin
switched to db admin

MongoDB Enterprise > db.createCollection('fruits')
{
        "ok" : 0,
        "errmsg" : "not authorized on admin to execute command { create: \"fruits\
", $db: \"admin\" }",
        "code" : 13,
        "codeName" : "Unauthorized"
}
```

아래와 같이 food database에서 컬렉션을 생성하고 리스트를 확인해보자. 권한이 있는 database에서는 권한오류 없이 정상적으로 동작한다.

```javascript
MongoDB Enterprise > use food
switched to db food

MongoDB Enterprise > show collections
fruits

MongoDB Enterprise > use food
switched to db food

MongoDB Enterprise > db.createCollection('vegetables')
{ "ok" : 1 }

MongoDB Enterprise > show collections
fruits
vegetables
```


https://mylko72.gitbooks.io/node-js/content/chapter12/chapter12_2.html
