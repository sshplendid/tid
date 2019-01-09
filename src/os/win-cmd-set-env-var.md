# Windows 커맨드 프롬프트에서 환경변수 설정하기

## 환경변수 조회

`set` 명령으로 시스템/사용자 환경변수 모두 조회할 수 있다.

```cmd
set
```

구분하여 보려면, 아래의 명령어로

### 시스템 환경변수 조회

```cmd
reg query "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment"
```

### 사용자 환경변수 조회

```cmd
reg query HKEY_CURRENT_USER\Environment
```

## `setx` 명령으로 변수 설정

```cmd
setx \m coffee "starbucks"
```

## chocolatey의 `RefreshEnv` 명령으로 환경변수 refresh

```cmd
RefreshEnv
```