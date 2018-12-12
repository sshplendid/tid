# Rust 설치하기

## Rustup을 이용한 설치

## Rust 직접 설치

### Windows with Chocolatey

```cmd
> choco install rust
```

### Mac OSX with Homebrew

```bash
> brew install rust
```

## Rust compiler viersion 확인

```bash
> rustc --version
rustc 1.29.2 (17a9dc751 2018-10-05)
```

## Cargo로 새로운 프로젝트 생성 & 빌드

Cargo는 Rust의 패키지 매니저이다.

```bash
> cargo new hello
     Created binary (application) `hello` project
> cd hello
> cargo run
   Compiling hello v0.1.0 (file:///D:/DEV_HOME/workspace/kata/rust/hello)
    Finished dev [unoptimized + debuginfo] target(s) in 3.32s
     Running `target\debug\hello.exe`
Hello, world!
```
