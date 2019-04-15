# 개발환경 세팅

## MariaDB 연결

```bash
$ docker run --name maria -v c:/dev/docker/vol-maria:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=admin -d mariadb
```