# `mdbook` 사용법

`mdbook`은 Rust 언어 기반의 커맨드라인 툴 & 라이브러리이다. 마크다운 파일을 이용해서 책을 만들 수 있다. Gitbook과 유사하지만, Rust 언어로 만들어졌다.

## 설치

바이너리는 [릴리즈 페이지](https://github.com/rust-lang-nursery/mdBook/releases)에서 다운로드 받을 수 있다. 그러나 난 이미 Rust를 PC에 설치한 상태이기 때문에 **Cargo**를 통해서 설치했다.

```sh
> cargo install mdbook
```

이외에 소스 레파지토리에서 [직접 받아 빌드한 후 사용](https://rust-lang-nursery.github.io/mdBook/cli/index.html)하는 방법도 있다.

## 프로젝트 구조

```plain
mdbook-test/
├─ book
└─ src
    ├─ chapter_1.md
    └─ SUMMARY.md
```

* `src` 디렉토리에 마크다운으로 작성된 파일들이 있어야 한다. 그리고 설정 파일 등이 들어갈 수 있다.
* `book` 디렉토리는 렌더링된 책이 있는 공간이다. 빌드된 결과물로 서버에 올리면 볼 수 있는 상태이다.
* `SUMMARY.md` 파일은 책의 목차를 작성하는 파일로 제일 중요하다. SUMMARY에 정의된 목차와 파일링크를 토대로 책이 렌더링된다.

## CLI 명령어

### `init`: mdbook 생성

mdbook 보일러 플레이트를 생성하기 위해, `init` 명령어를 사용한다. .gitignore 파일을 생성여부와 책 제목을 묻는데, 책 제목은 소스 설정파일(`book.toml`)에 저장된다.

```sh
> mkdir mdbook-test # mdbook 루트 디렉토리 생성
> cd mdbook-test/
> mdbook init

Do you want a .gitignore to be created? (y/n)
y
What title would you like to give the book?
mdbook demo
2018-12-15 10:16:30 [INFO] (mdbook::book::init): Creating a new book with stub content

All done, no errors...
```

### `build`: 소스를 기반으로 책을 렌더링

```sh
> mdbook build
```

`SUMMARY.md` 파일을 분석해서 책의 목차대로 렌더링한다. 

기본 디렉토리는 `book/` 이지만 아래와 같이 사용자가 정의한 디렉토리에 빌드할 수 있다.

```sh
> mdbook build path/to/book
```

### `serve`: 렌더링 된 책 웹에서 보기

`serve` 명령은 `localhost:3000`에서 HTTP를 통해 렌더링 된 책을 볼 수 있게한다.

```sh
> mdbook serve

2018-12-15 10:50:58 [INFO] (mdbook::book): Book building has started
2018-12-15 10:50:58 [INFO] (mdbook::book): Running the html backend
2018-12-15 10:50:58 [INFO] (mdbook::cmd::serve): Serving on: http://localhost:3000
2018-12-15 10:50:58 [INFO] (ws): Listening for new connections on [::1]:3001.
2018-12-15 10:50:58 [INFO] (mdbook::cmd::watch): Listening for changes...
```

### `test`: code block 테스팅

코드 블록의 테스트를 할 수 있다. 현재는 Rust 언어만 지원한다.

```sh
mdbook test
```

아래와 같이 코드 블록 3건이 있는데 각각 성공 / 무시 / 무시하는 시나리오이다.

```md
    ```rust
    fn main() {
        println!("hello world");
    }
    ```
```

```md
    ```rust, ignore
    fn main() {
        println!("hello world");
    }
    ```
```

```md
    ```rust
    // ignored
    fn main() {
    panic!("should panic!"); // should panic
    }
    ```
```

결과는 아래와 같이 나온다.

```sh
> mdbook test

2018-12-15 11:01:47 [INFO] (mdbook::book): Testing file: "D:\\...\\til\\src\\log/mdbook-guide.md"
2018-12-15 11:01:49 [ERROR] (mdbook::utils): Error: Rustdoc returned an error:
running 3 tests
test C:\Users\...\mdbook-f7zZjj\log/mdbook-guide.md - mdbook::CLI_명령어::test (line 92) ... ignored
test C:\Users\...\mdbook-f7zZjj\log/mdbook-guide.md - mdbook::CLI_명령어::test (line 99) ... FAILED
test C:\Users\...\mdbook-f7zZjj\log/mdbook-guide.md - mdbook::CLI_명령어::test (line 85) ... ok

failures:

---- C:\Users\...\mdbook-f7zZjj\log/mdbook-guide.md - mdbook::CLI_명령어::test (line 99) stdout ----
thread 'C:\Users\...\mdbook-f7zZjj\log/mdbook-guide.md - mdbook::CLI_명령어::test (line 99)' panicked at 'test executable failed:

thread 'main' panicked at 'should panic!', C:\Users\...\mdbook-f7zZjj\log/mdbook-guide.md:3:3
note: Run with `RUST_BACKTRACE=1` for a backtrace.

', librustdoc\test.rs:367:17
note: Run with `RUST_BACKTRACE=1` for a backtrace.


failures:
    C:\Users\...\mdbook-f7zZjj\log/mdbook-guide.md - mdbook::CLI_명령어::test (line 99)

test result: FAILED. 1 passed; 1 failed; 1 ignored; 0 measured; 0 filtered out
```

테스트가 실패하는 경우 오류가 발생한 라인번호만 나오고 출력하진 않는다.

## 수식 입력을 위한 MathJax 지원

[MathJax](https://www.mathjax.org/)를 선택적으로 적용할 수 있다. `book.toml` 파일에 아래와 같은은 설정을 추가하면 사용할 수 있다.

```toml
[output.html]
mathjax-support = true
```

기존 MathJax에선 `>> ... >>`를 사용했다면, mdbook에선 `\\[ ... \\]` 방식으로 표현한다.

아래는 LaTex 커맨드로 작성한 수식이다.

```plain
\\[ x = \frac {-b \pm \sqrt {b^2 - ac}} {a} \\]
```

\\[ x = \frac {-b \pm \sqrt {b^2 - ac}} {a} \\]
\\[ \sqrt a \\]

만약 인라인으로 작성하고 싶다면, `\\[ ... \\]` 대신 `\\() ... \\)` 로 쓰면 된다. \\( T_1 = 2x \\) 와 같이 렌더링된다.

## CI

Travis CI를 이용해서 지속적 통합을 제공한다. github와 연동하기 위해 먼저 public repository에 접근할 수 있는 access token을 발급받는다.

tooken을 발급받았으면 아래와 같이 `.travis.yml` 파일에 deploy 관련 설정을 추가한다. `local-dir`은 travis CI에서 실제로 소스를 pull 받은 경로를 넣어주면 된다.

```yml
deploy:
  provider: pages
  skip-cleanup: true
  github-token: >GITHUB_TOKEN
  local-dir: /your/local/directory/book
  keep-history: false
  on:
    branch: master
```