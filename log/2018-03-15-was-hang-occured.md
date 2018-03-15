# 2018/03/15 WAS Hang 발생원인 분석

갑자기 서버 응답이 실패하면서 아래와 같은 로그가 생성되었다.

```
<Mar 15, 2018 4:47:02 PM KST> <Info> <WorkManager> <BEA-002936> <maximum thread constraint ClusterMessaging is reached> 
15.0
<Mar 15, 2018 4:47:10 PM KST> <Error> <WebLogicServer> <BEA-000337> <[STUCK] ExecuteThread: '14' for queue: 'weblogic.kernel.Default (self-tuning)' has been busy for "637" seconds working on the request "Workmanager: default, Version: 0, Scheduled=true, Started=true, Started time: 637079 ms
[
POST /some_uri.do HTTP/1.1
accept: application/json, text/javascript, */*; q=0.01
content-type: application/x-www-form-urlencoded; charset=UTF-8
x-requested-with: XMLHttpRequest
referer: https://some.domain.com/som_uri.do
accept-language: ko-KR
accept-encoding: gzip, deflate
user-agent: Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko
content-length: 6
cache-control: no-cache
cookie: cookie_value=value;
x-forwarded-for: some.ip.is.here
Proxy-Path-Translated: ****
Proxy-Path-Translated-Base: ****
Proxy-Client-IP: some.ip.is.here
Connection: Keep-Alive
X-WebLogic-KeepAliveSecs: 30
X-WebLogic-Force-JVMID: -967361583

]", which is more than the configured time (StuckThreadMaxTime) of "600" seconds. Stack trace:
	java.net.SocketInputStream.socketRead0(Native Method)
	java.net.SocketInputStream.read(SocketInputStream.java:129)
	oracle.net.ns.Packet.receive(Packet.java:300)
	oracle.net.ns.DataPacket.receive(DataPacket.java:106)
	oracle.net.ns.NetInputStream.getNextPacket(NetInputStream.java:315)
	oracle.net.ns.NetInputStream.read(NetInputStream.java:95)
	oracle.jdbc.driver.T4CMAREngine.unmarshalUB1(T4CMAREngine.java:1137)
	oracle.jdbc.driver.T4CTTIfun.receive(T4CTTIfun.java:290)
	oracle.jdbc.driver.T4CTTIfun.doRPC(T4CTTIfun.java:192)
	oracle.jdbc.driver.T4C8Oall.doOALL(T4C8Oall.java:531)
	oracle.jdbc.driver.T4CPreparedStatement.doOall8(T4CPreparedStatement.java:207)
	oracle.jdbc.driver.T4CPreparedStatement.executeForRows(T4CPreparedStatement.java:1044)
	oracle.jdbc.driver.OracleStatement.executeMaybeDescribe(OracleStatement.java:1199)
	oracle.jdbc.driver.OracleStatement.doExecuteWithTimeout(OracleStatement.java:1281)
	oracle.jdbc.driver.OraclePreparedStatement.executeInternal(OraclePreparedStatement.java:3593)
	oracle.jdbc.driver.OraclePreparedStatement.execute(OraclePreparedStatement.java:3694)
	oracle.jdbc.driver.OraclePreparedStatementWrapper.execute(OraclePreparedStatementWrapper.java:1378)
	weblogic.jdbc.wrapper.PreparedStatement.execute(PreparedStatement.java:99)
	org.anyframe.jdbc.support.p6spy.P6ILPreparedStatement.execute(P6ILPreparedStatement.java:190)
	com.ibatis.sqlmap.engine.execution.SqlExecutor.executeQuery(SqlExecutor.java:185)
	com.ibatis.sqlmap.engine.mapping.statement.MappedStatement.sqlExecuteQuery(MappedStatement.java:221)
	com.ibatis.sqlmap.engine.mapping.statement.MappedStatement.executeQueryWithCallback(MappedStatement.java:189)
	com.ibatis.sqlmap.engine.mapping.statement.MappedStatement.executeQueryForObject(MappedStatement.java:120)
	com.ibatis.sqlmap.engine.impl.SqlMapExecutorDelegate.queryForObject(SqlMapExecutorDelegate.java:518)
	com.ibatis.sqlmap.engine.impl.SqlMapExecutorDelegate.queryForObject(SqlMapExecutorDelegate.java:493)
	com.ibatis.sqlmap.engine.impl.SqlMapSessionImpl.queryForObject(SqlMapSessionImpl.java:106)
	com.ibatis.sqlmap.engine.impl.SqlMapClientImpl.queryForObject(SqlMapClientImpl.java:82)
	com.ibatis.sqlmap.engine.mapping.result.loader.ResultLoader.getResult(ResultLoader.java:75)
	com.ibatis.sqlmap.engine.mapping.result.loader.EnhancedLazyResultLoader$EnhancedLazyResultLoaderImpl.loadObject(EnhancedLazyResultLoader.java:137)
	com.ibatis.sqlmap.engine.mapping.result.loader.EnhancedLazyResultLoader$EnhancedLazyResultLoaderImpl.invoke(EnhancedLazyResultLoader.java:120)
	************
	************
	************
	com.ibatis.sqlmap.engine.accessplan.EnhancedPropertyAccessPlan.setProperties(EnhancedPropertyAccessPlan.java:33)
	com.ibatis.sqlmap.engine.exchange.JavaBeanDataExchange.setData(JavaBeanDataExchange.java:112)
	com.ibatis.sqlmap.engine.mapping.result.ResultMap.setResultObjectValues(ResultMap.java:371)
	com.ibatis.sqlmap.engine.mapping.statement.RowHandlerCallback.handleResultObject(RowHandlerCallback.java:64)
	com.ibatis.sqlmap.engine.execution.SqlExecutor.handleResults(SqlExecutor.java:385)
	com.ibatis.sqlmap.engine.execution.SqlExecutor.handleMultipleResults(SqlExecutor.java:300)
	com.ibatis.sqlmap.engine.execution.SqlExecutor.executeQuery(SqlExecutor.java:189)
	com.ibatis.sqlmap.engine.mapping.statement.MappedStatement.sqlExecuteQuery(MappedStatement.java:221)
	com.ibatis.sqlmap.engine.mapping.statement.MappedStatement.executeQueryWithCallback(MappedStatement.java:189)
	com.ibatis.sqlmap.engine.mapping.statement.MappedStatement.executeQueryForList(MappedStatement.java:139)
	com.ibatis.sqlmap.engine.impl.SqlMapExecutorDelegate.queryForList(SqlMapExecutorDelegate.java:567)
	com.ibatis.sqlmap.engine.impl.SqlMapExecutorDelegate.queryForList(SqlMapExecutorDelegate.java:541)
	com.ibatis.sqlmap.engine.impl.SqlMapSessionImpl.queryForList(SqlMapSessionImpl.java:118)
	com.ibatis.sqlmap.engine.impl.SqlMapClientImpl.queryForList(SqlMapClientImpl.java:94)
	com.ibatis.sqlmap.engine.mapping.result.loader.ResultLoader.getResult(ResultLoader.java:70)
	com.ibatis.sqlmap.engine.mapping.result.loader.EnhancedLazyResultLoader$EnhancedLazyResultLoaderImpl.loadObject(EnhancedLazyResultLoader.java:137)
	com.ibatis.sqlmap.engine.mapping.result.loader.EnhancedLazyResultLoader$EnhancedLazyResultLoaderImpl.invoke(EnhancedLazyResultLoader.java:120)
	$java.util.List$$EnhancerByCGLIB$$f8e6bd9e.iterator(<generated>)
	************
	************
	com.ibatis.sqlmap.engine.accessplan.EnhancedPropertyAccessPlan.setProperties(EnhancedPropertyAccessPlan.java:33)
	com.ibatis.sqlmap.engine.exchange.JavaBeanDataExchange.setData(JavaBeanDataExchange.java:112)
	com.ibatis.sqlmap.engine.mapping.result.ResultMap.setResultObjectValues(ResultMap.java:371)
	com.ibatis.sqlmap.engine.mapping.statement.RowHandlerCallback.handleResultObject(RowHandlerCallback.java:64)
	com.ibatis.sqlmap.engine.execution.SqlExecutor.handleResults(SqlExecutor.java:385)
	com.ibatis.sqlmap.engine.execution.SqlExecutor.handleMultipleResults(SqlExecutor.java:300)
	com.ibatis.sqlmap.engine.execution.SqlExecutor.executeQuery(SqlExecutor.java:189)
	com.ibatis.sqlmap.engine.mapping.statement.MappedStatement.sqlExecuteQuery(MappedStatement.java:221)
	com.ibatis.sqlmap.engine.mapping.statement.MappedStatement.executeQueryWithCallback(MappedStatement.java:189)
	com.ibatis.sqlmap.engine.mapping.statement.MappedStatement.executeQueryForObject(MappedStatement.java:120)
	com.ibatis.sqlmap.engine.impl.SqlMapExecutorDelegate.queryForObject(SqlMapExecutorDelegate.java:518)
	com.ibatis.sqlmap.engine.impl.SqlMapExecutorDelegate.queryForObject(SqlMapExecutorDelegate.java:493)
	com.ibatis.sqlmap.engine.impl.SqlMapSessionImpl.queryForObject(SqlMapSessionImpl.java:106)
	com.ibatis.sqlmap.engine.impl.SqlMapClientImpl.queryForObject(SqlMapClientImpl.java:82)
	com.ibatis.sqlmap.engine.mapping.result.loader.ResultLoader.getResult(ResultLoader.java:75)
	com.ibatis.sqlmap.engine.mapping.result.loader.EnhancedLazyResultLoader$EnhancedLazyResultLoaderImpl.loadObject(EnhancedLazyResultLoader.java:137)
	com.ibatis.sqlmap.engine.mapping.result.loader.EnhancedLazyResultLoader$EnhancedLazyResultLoaderImpl.invoke(EnhancedLazyResultLoader.java:120)
	************
	java.util.HashMap.getEntry(HashMap.java:510)
	java.util.HashMap.containsKey(HashMap.java:433)
	java.util.HashSet.contains(HashSet.java:138)
	************
	************
	************
	sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:48)
	sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
	java.lang.reflect.Method.invoke(Method.java:600)
	org.springframework.web.bind.annotation.support.HandlerMethodInvoker.invokeHandlerMethod(HandlerMethodInvoker.java:176)
	org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter.invokeHandlerMethod(AnnotationMethodHandlerAdapter.java:426)
	org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter.handle(AnnotationMethodHandlerAdapter.java:414)
	org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:790)
	org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:719)
	org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:644)
	org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:560)
	javax.servlet.http.HttpServlet.service(HttpServlet.java:727)
	javax.servlet.http.HttpServlet.service(HttpServlet.java:820)
	weblogic.servlet.internal.StubSecurityHelper$ServletServiceAction.run(StubSecurityHelper.java:227)
	weblogic.servlet.internal.StubSecurityHelper.invokeServlet(StubSecurityHelper.java:125)
	weblogic.servlet.internal.ServletStubImpl.execute(ServletStubImpl.java:301)
	weblogic.servlet.internal.TailFilter.doFilter(TailFilter.java:26)
	weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.java:60)
	************
	org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:237)
	org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:167)
	weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.java:60)
	************
	org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:237)
	org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:167)
	weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.java:60)
	************ 
	org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:237)
	org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:167)
	weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.java:60)
	************
	org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:237)
	org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:167)
	weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.java:60)
	************
	org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:237)
	org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:167)
	weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.java:60)
	************
	org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:237)
	org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:167)
	weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.java:60)
	org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:88)
	org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:76)
	weblogic.servlet.internal.FilterChainImpl.doFilter(FilterChainImpl.java:60)
	weblogic.servlet.internal.WebAppServletContext$ServletInvocationAction.wrapRun(WebAppServletContext.java:3748)
	weblogic.servlet.internal.WebAppServletContext$ServletInvocationAction.run(WebAppServletContext.java:3714)
	weblogic.security.acl.internal.AuthenticatedSubject.doAs(AuthenticatedSubject.java:321)
	weblogic.security.service.SecurityManager.runAs(SecurityManager.java:120)
	weblogic.servlet.internal.WebAppServletContext.securedExecute(WebAppServletContext.java:2283)
	weblogic.servlet.internal.WebAppServletContext.execute(WebAppServletContext.java:2182)
	weblogic.servlet.internal.ServletRequestImpl.run(ServletRequestImpl.java:1499)
	weblogic.work.ExecuteThread.execute(ExecuteThread.java:263)
	weblogic.work.ExecuteThread.run(ExecuteThread.java:221)
> 
```

`StuckThreadMaxTime`로 검색해보니, 쓰레드 대기시간을 초과해서 발생되는 원인으로 추정된다. 예전에 처리시간이 오래 걸리는 요청때문에 뒤이어 도착한 요청이 대기상태에 걸려서 발생했던 경험이 생각났다. JVM Heap Memory usage 그래프를 보고 메모리 사용률이 급격하게 올라가는 시점을 확인했다. 그리고 그 당시의 DB Session 사용량을 봤다. (현재 WAS의 커넥션 풀 최대치는 60*2(인스턴스 수))


```sql
  SELECT TO_CHAR (sample_time, 'hh24:mi') sample_time_by_min,
       COUNT (1) session_cnt
  FROM v$active_session_history
 WHERE     sample_time > SYSDATE - 2 / 24
       AND SAMPLE_TIME BETWEEN TO_DATE ('20180315 1650', 'YYYYMMDD HH24MI')
                           AND TO_DATE ('20180315 1700', 'YYYYMMDD HH24MI')
       AND machine IN ('kgcpmap1', 'kgcpmap2')
       AND program = 'JDBC Thin Client'
GROUP BY TO_CHAR (sample_time, 'hh24:mi')
ORDER BY TO_CHAR (sample_time, 'hh24:mi');
```

메모리 사용량이 급증한 시점에 active session 역시 증가하는 모양새를 이뤘다. 

```sql
SELECT DISTINCT SQL_TEXT
  FROM V$SQL
 WHERE     SQL_ID IN (SELECT SQL_ID
                        FROM v$active_session_history
                       WHERE     sample_time > SYSDATE - 2 / 24
                             AND SAMPLE_TIME BETWEEN TO_DATE (
                                                        '20180315 1650', 'YYYYMMDD HH24MI')
                                                 AND TO_DATE (
                                                        '20180315 1700', 'YYYYMMDD HH24MI'))
       AND machine IN ('kgcpmap1', 'kgcpmap2')
       AND program = 'JDBC Thin Client'
ORDER BY SQL_TEXT;
```

시간이 부족해서 다시 확인해봐야겠지만, 아마 iBatis OR 상속에 의한 대량 쿼리 발생으로 추정된다.내가 생각한 원인이 맞는지 stuck 추정시간과 쿼리 실행시간과 비교해서 확인해봐야겠다.
아쉽게 heapdump 추출을 못해서 메모리구조까지 확인하긴 힘들 것 같다.
