#MongoDB 시작하기

## 사용자 설정
사용자 계정은 `db.system.users` 컬렉션에 저장됨.

	# 사용할 database name 선택, 만약 없다면 생성된다. 
	# collection이 생성되기 전까지 공간은 생성되지 않는다.
    > use foo
    switched to db foo
    > users = db.system.users.find()
    > users.count()
    0

### 계정 생성
    > show users

계정 생성에 필요한 document field 목록
 * user: 계정이름
 * roles: 역할
 * pwd: 비밀번호
 * userSource:
 * otherDBRoles: 

`createUser()` 메서드를 사용해 user 객체를 생성한다.

    > use foo
    > db.createUser({user: "scott",
                     pwd:"tiger",
                     roles:["readWrite", "dbAdmin"]})

### 계정 삭제

    use foo
    db.dropUser("scot")

## 데이터베이스

### 데이터베이스 생성

데이터베이스에 컬렉션을 추가하기 전까지 데이터베이스는 저장되지 않는다.
    > show dbs

    > use newDatabase
    > db.createCollection("newCollection")

### 데이터베이스 복사
    > db.copyDatabase("newDatabase", "duplicatedDatabase")

### 데이터베이스 삭제
    > db.dropDatabase()

## 컬렉션
컬렉션 목록을 출력
    > show collections
### 컬렉션 생성
    > db.createCollection("food", {capped:false})
    # capped: 고정된 사이즈의 컬렉션
### 컬렉션 삭제
    > show collections
    > col = db.getCollection("food")
    > col.drop()
    > show collections

### 컬렉션에서 도큐먼트 검색
    > use foo
    > col = db.getCollection("food")
    > col.find()
    > col.find({name:"apple"})

### 컬렉션에 도큐먼트 추가
    > use foo
    > col = db.getCollection("food")
    > col.insert({name:"apple", color:"red", calorie: 10})
    > col.insert({name:"banana", color:"yellow", calorie: 7})
    > col.insert({name:"apple", color:["brown", "yellow", "green"], calorie: 800})

### 컬렉션의 도큐먼트 삭제
    > use foo
    > col = db.getCollection("food")
    > col.remove({name:"apple"})
    > col.find()

### 도큐먼트 갱신
    > use foo
    > col = db.getCollection("food")
    > col.update({name:"apple"}, {$set: {name:"pineapple", color:"yellow"}})
    > col.save({"_id": ObjectId("5a8296d36448789d4abf638a"), "name":""})
    > col.save({name:"apple"})

https://mylko72.gitbooks.io/node-js/content/chapter12/chapter12_5.html
