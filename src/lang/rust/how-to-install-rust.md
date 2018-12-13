# Rust 설치하기

## rustup을 이용한 설치

**rustup** 은 Rust 공식 릴리즈 채널의 다양한 버전의 컴파일러를 쉽게 관리하는 인스톨러이다. 루비의 rvm, 노드JS의 nvm과 유사한 역할을 한다. RustFmt와 같은 툴을 사용하기 위해서도 rustup이 필요하다.

### Proxy 환경에서의 설치

아래와 같이 환경변수 값을 설정하고 설치파일을 실행한다.

```sh
RUSTUP_USE_REQWEST=1 # work-around: certificate verified error
https_proxy=프록시주소
```

## Rust 직접 설치

패키지 매니저를 통한 설치는 특정 버전 설치만 가능하다. 가능하면 rustup을 이용하자.

### Windows with Chocolatey

```cmd
choco install rust
```

### Mac OSX with Homebrew

```bash
brew install rust
```

## Rust compiler viersion 확인

```bash
rustc --version
rustc 1.29.2 (17a9dc751 2018-10-05)
```

## Cargo로 새로운 프로젝트 생성 & 빌드

Cargo는 Rust의 패키지 매니저이다.

```bash
cargo new hello
     Created binary (application) `hello` project
cd hello
cargo run
   Compiling hello v0.1.0 (file:///D:/DEV_HOME/workspace/kata/rust/hello)
    Finished dev [unoptimized + debuginfo] target(s) in 3.32s
     Running `target\debug\hello.exe`
Hello, world!
```
