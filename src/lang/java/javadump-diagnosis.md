# IBM - Java Dump 분석

아래 IBM 문서를 보고 Javadump를 살펴보았다.
[IBM - Javadump 해석](https://www.ibm.com/support/knowledgecenter/ko/SSYKE2_7.0.0/com.ibm.java.win.70.doc/diag/tools/javadump_interpret.html)
[Naver D2 - 스레드 덤프 분석하기](http://d2.naver.com/helloworld/10963)

## 덤프의 종류

Heap Dump, Java Dump, Thread Dump, java core 등의 파일은 Java 어플리케이션의 비정상적인 상황(OOM, Hang, ...)에서 생성되는 파일이다. 이 파일들은 장애 발생 당시의 JVM 정보를 가지고 있다.

  * Javadump: Java core 혹은 Thread dump라고 불린다. OOM같은 상황에서 JVM이 의도치않게 종료된 경우 예약된 키 조합(ex. Windows: `Ctrl + Break`, Unix: `kill -3 <pid>`)으로 생성된다. 혹은 어플리케이션 내부에서 `com.ibm.jvm.Dump.JavaDump` API를 사용해서 생성할 수도 있다. 
  * Heapdump: 예기치않게 JVM이 종료된 경우 사용자의 요청 혹은 `Xdump:heap` 옵션을 사용해서 힙 덤프 생성시점을 제어할 수 있다. 

### 덤프가 생성되지 않을 때
일부 상황에선 덤프가 생성되지 않을 수도 있다. 이땐 시스템 덤프를 확인해보자. 자세한 내용은 아래 문서 참고  
[덤프가 생성되지 않는 경우의 시나리오](https://www.ibm.com/support/knowledgecenter/ko/SSYKE2_7.0.0/com.ibm.java.aix.70.doc/diag/tools/scenarioswheredumpsmightnotbeproduced.html)

## 그래서 javadump는?

Javadump는 JVM / Java 어플리케이션 실행 중의 특정 시점에서 캡쳐된 진단정보가 포함된 파일이다. 이 파일엔 운영 체제, 어플리케이션 환경, 스레드, 스택, 메모리 등의 정보가 포함된다. 파일은 텍스트 형식으로 사용자가 읽을 수 있으며 Java Object 컨텐츠나 데이터는 포함되지 않는다.
  * 스레드 ID와 플래그를 포함한 스레드 이름
  * 개수와 플래그를 포함하는 클래스 로더 이름
  * 클래스 및 메소드 이름
  * 일부 Heap 주소

어플리케이션을 시작할 때 `-Xdump:java:` 플래그를 사용해서 파일 생성을 제어할 수 있다. 파일 이름은 `javacore.<date>.<time>.<pid>.<sequence number>.txt`로 네이밍된다. Javacore는 시스템 덤프에서 생성하는 **코어 파일** 과는 다르다.

### 덤프파일 생성방법
  * Java 옵션 사용: `XDump:java` 옵션을 사용해서 덤프 생성을 제어할 수 있다.

#### 오류 조건에 의해 생성된 JavaDump
아래 조건과 일치하는 상황이 발생하면 Javadump는 자동으로 생성된다.
  * 복구할 수 없는 기본 예외: JVM이 중지되는 예외상황이다. JVM은 시스템 덤프를 생성하고 스냅 추적파일 및 Javadump를 생성한 후에 프로세스를 종료한다. **Java 예외상황이 아니다.**
  * JVM 메모리 부족: `OOME`같은 메모리 부족 상황에서 자동 생성된다.

#### 요청에 의한 생성
사용자의 요청 혹은 API 호출로 덤프가 생성되는 경우이다.
  * Command Line에서 JVM에 신호를 송신: `kill -3 <pid>`를 사용해서 Java 프로세스에 덤프 생성 신호를 보낼 수 있다. 이 경우 JVM은 덤프파일을 생성하고 계속 실행된다.
  * `com.ibm.jvm.Dump.JavaDump` API 사용: 이 API를 호출하면 덤프파일이 생성된다. 동일하게 JVM은 계속 실행된다.
  * **WAS Utility** 에 의한 생성: Weblogic과 같은 Middleware 환경에서 미들웨어 유틸리티를 사용해서 덤프를 생성 가능하다.

## 덤프 해석

### Javadump 태그

Dump 파일은 아래와 같이 섹션(`SECTION`)으로 구분되어 있다.

```log
0SECTION       TITLE subcomponent dump routine
NULL           ===============================
1TISIGINFO     Dump Event "systhrow" (00040000) Detail "java/lang/OutOfMemoryError" received 
1TIDATETIME    Date:                 2017/10/26 at 14:39:07
1TIFILENAME    Javacore filename:    /USER/javacore.20171026.143904.33947784.0001.txt
1TIREQFLAGS    Request Flags: 0x81 (exclusive+preempt)
1TIPREPSTATE   Prep State: 0x104 (exclusive_vm_access+)
NULL           ------------------------------------------------------------------------
```

일반적인 태그는 아래와 같은 규칙을 가지고 있다.

* 태그는 최대 15자이다.(빈 부분은 공백으로 채움)
* 첫 번째 숫자는 태그 레벨을 나타낸다. 이 숫자는 항상 순서대로 오더링되진 않는다.(2 뒤에 4, 혹은 3 뒤에 1이 나올 수 있다.)
* 태그의 두 번째와 세 번째 문자는 덤프 섹션을 식별한다. 아래는 주요 섹션을 나타내고 그 외에도 다른 섹션이 존재한다.
  * CI: 명령행 인터프리터
  * CL: 클래스 로더
  * LK: LOCK
  * ST: 스토리지(메모리 관리)
  * TI: 제목
  * XE: 실행 엔진
* 나머지는 고유 문자열이다.
* 모든 섹션은 `0SECTION` 태그로 헤드가 지정된다.
* `NULL` 태그는 가독성을 위한 태그이다. 정보를 구분하는 용도로 사용한다.

### TITLE, GPINFO, ENVINFO 섹션

#### TITLE

Javadump 파일이 생성된 이벤트 및 기본정보를 나타낸다. 위의 로그가 TITLE 부분이고 `OutOfMemoryErorr`에 의한 이벤트 발생임을 알 수 있다.

#### GPFINO

[GPF](https://en.wikipedia.org/wiki/General_protection_fault)로 인해 dump가 생성되었는지 여부에 따라 컨텐츠가 달라지지만 운영체제에 대한 정보가 일부 표시된다. GPF로 인해 생성된 경우 GPF정보가 제공된다.

```log
0SECTION       GPINFO subcomponent dump routine
NULL           ================================
2XHOSLEVEL     OS Level         : AIX 6.1
2XHCPUS        Processors -
3XHCPUARCH       Architecture   : ppc64
3XHNUMCPUS       How Many       : 8
3XHNUMASUP       NUMA is either not supported or has been disabled by user
NULL           
1XHERROR2      Register dump section only produced for SIGSEGV, SIGILL or SIGFPE.
NULL           
NULL           ------------------------------------------------------------------------
```

#### ENVINFO
실패한 JRE 레벨에 대한 정보와 JVM 프로세스 및 환경을 호출한 명령에 대한 세부사항을 나타낸다.

아래 로그를 보면 AIX6.1, JRE 1.6 환경에서 어플리케이션을 실행했고 실행할 때의 자바 옵션, 클래스패스도 확인할 수 있다.

```log
0SECTION       ENVINFO subcomponent dump routine
NULL           =================================
1CIJAVAVERSION JRE 1.6.0 AIX ppc64-64 build jvmap6460sr10fp1-20120202_101568 (pap6460sr10fp1-20120321_01(SR10 FP1))
1CIVMVERSION   VM build 20120202_101568
1CIJITVERSION  r9_20111107_21307ifx1
1CIGCVERSION   GC - 20120202_AA
1CIJITMODES    JIT enabled, AOT enabled, FSD disabled, HCR disabled
1CIRUNNINGAS   Running as a standalone JVM
1CICMDLINE     /usr/java6_64/bin/java -DDOMAIN_NAME= -DSERVER_NAME=server1 -Xms2048m -Xmx2048m -Xgcpolicy:gencon -verbosegc -Dweblogic.Name=server1 -Djava.security.policy=/wlserver_10.3/server/lib/weblogic.policy -Dweblogic.ProductionModeEnabled=true -Dweblogic.security.SSL.trustedCAKeyStore=/weblogic/wlserver_10.3/server/lib/cacerts -da -Dplatform.home=/weblogic/wlserver_10.3 -Dwls.home=/weblogic/wlserver_10.3/server -Dweblogic.home=/weblogic/wlserver_10.3/server -Dweblogic.management.discover=false -Dweblogic.management.server=t3://12.30.51.107:6060 -Dwlw.iterativeDev=false -Dwlw.testConsole=false -Dwlw.logErrorsToConsole=false -Dweblogic.ext.dirs=/weblogic/patch_wls1036/profiles/default/sysext_manifest_classpath weblogic.Server
1CIJAVAHOMEDIR Java Home Dir:   /usr/java6_64/jre
1CIJAVADLLDIR  Java DLL Dir:    /usr/java6_64/jre/bin
2CIUSERARG               -DDOMAIN_NAME=
2CIUSERARG               -DSERVER_NAME=server1
2CIUSERARG               -Xms2048m
2CIUSERARG               -Xmx2048m
....
```

### 스토리지 관리(MEMINFO)

MEMINFO 섹션은 Memory에 대한 정보를 제공한다. 제일 먼저 아래 정보를 보면 당시 메모리 사용 현황에 대해서 나온다. 4GB 할당된 상태에서 사용가능한 메모리는 약 44MB 정도였다. 

```log
0SECTION       MEMINFO subcomponent dump routine
NULL           =================================
1STHEAPFREE    Bytes of Heap Space Free: 2CA0EF0 
1STHEAPALLOC   Bytes of Heap Space Allocated: 80000000 
```

아래 덤프는 내부 메모리 섹션(SEGTYPE)이다. 클래스 메모리, JIT 코드 캐시 및 JIT 데이터 캐시등을 포함한다.

* segment: 세그먼트 제어 데이터 구조의 주소
* start: 세그먼트의 시작 주소
* alloc: 현재 할당 주소
* end: 세그먼트의 끝 주소
* type: 세그먼트 특성을 설명하는 내부 비트 필드
* size: 세그먼트의 크기, 아래엔 `bytes`로 표시

```log
1STSEGTYPE     Internal Memory
NULL           segment          start            alloc            end               type     bytes
1STSEGMENT     00000100207A0C18 000001002C74D948 000001002C74D948 000001002C75D948  01000040 10000
...
1STSEGTYPE     Object Memory
NULL           segment          start            alloc            end               type     bytes
1STSEGMENT     0000010012A345F8 0700000000000000 0700000060000000 0700000060000000  00000009 60000000
NULL           
1STSEGTYPE     Class Memory
NULL           segment          start            alloc            end               type     bytes
1STSEGMENT     00000100153C9A78 0000010016306FD0 00000100163072C0 00000100163072C0  00010040 300
...
NULL           
1STSEGTYPE     JIT Code Cache
NULL           segment          start            alloc            end               type     bytes
1STSEGMENT     00000100139CBF98 000001002ACC3E48 000001002B4C3E48 000001002B4C3E48  00000068 800000
1STSEGMENT     00000100139CBED8 0000010013A143E8 00000100142143E8 00000100142143E8  00000068 800000
NULL           
1STSEGTYPE     JIT Data Cache
NULL           segment          start            alloc            end               type     bytes
1STSEGMENT     00000100139CC198 000001001424BF08 000001001486A1C0 0000010014A4BF08  00000048 800000
NULL           
1STGCHTYPE     GC History  
3STHSTTYPE     05:39:04:720827501 GMT j9mm.100 -   J9AllocateObject() returning NULL! 48 bytes requested for object of class 0000010014C5A010 from memory space 'Generational' id=0000010012A357D8 
3STHSTTYPE     05:39:04:719925874 GMT j9mm.101 -   J9AllocateIndexableObject() returning NULL! 232 bytes requested for object of class 0000010014C599F0 from memory space 'Generational' id=0000010012A357D8 
3STHSTTYPE     05:39:04:719924530 GMT j9mm.84 -   Forcing J9AllocateIndexableObject() to fail due to excessive GC 
3STHSTTYPE     05:39:04:719594780 GMT j9mm.101 -   J9AllocateIndexableObject() returning NULL! 48 bytes requested for object of class 0000010018DCC370 from memory space 'Generational' id=0000010012A357D8 
...
```

### LOCKS

### THREADS


### SHARED CLASSES

### CLASSES
