# node.js 서버 생성하기
생활코딩 node.js 수업 <https://opentutorials.org/module/938/6770>


```javascript    
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```

예제파일 : https://github.com/sshplendid/til/blob/master/nodejs/examples/basicServer.js
