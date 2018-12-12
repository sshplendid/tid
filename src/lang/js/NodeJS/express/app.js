// app_static.js

// express 모듈을 불러온다.
const express = require('express');

const host = '127.0.0.1';
const port = 3000;

/**
 * express는 함수다.
 * express를 실행하면 애플리케이션을 리턴한다.
 */
var app = express();

// 정적인 파일이 있는 디렉토리를 지정
app.use(express.static('public'));

app.set('view engine', 'jade'); // Template Engine: Jade 사용
app.set('views', './views');    // 템플릿 파일의 위치 설정

/**
 * root(/)로 접속하면 아래와 같이 'Hello, express!'를 출력한다.
 * 우리는 get을 라우트(Route), get이 하는 일을 라우팅(Routing)이라고 부름.
 * 
 * 사용자가 root(http://127.0.0.1/)를 요청하면 라우트가 받아서,
 * 요청에 대한 처리(Controller)인 'Hello, express!'라고 응답함.
 */
app.get('/', (req, res) => {
    //res.writeHead('Content-Type', 'text/html');
    res.send('Hello, express!');
});

app.get('/whoami', (req, res) => {
    res.send('I am a student who is learning Node.js');
});

app.get('/h1', (req, res) => {
    res.send('<h1>Hello, express!</h1><img src="/Penguins.jpg" />');
});

app.get('/dynamic', (req, res) => {
	var li = '<li>dynamic</li>';
	var lis = '';
	for(var i = 0; i < 5; i++) 
		lis += li;
	var output = `
	<html>
		<head>
			<meta charset="utf-8" />
		</head>
		<body>
			<h1>Hello, Dynamic!</h1>
			<ul>
				${lis}
			</ul>
			${new Date()}
		</body>
	</html>`; // grave accent
    res.send(output);
});

/**
 * Jade Template Engine 을 사용한 응답
 * /template 요청을 받으면 시간과 제목을 포함해서 'temp' 템플릿을 호출한다.
 */
app.get('/template', (req, res) => {
	var document = {};
	document['_time'] = new Date();
	document['_title'] = '제목입니다';
	res.render('temp', document);
});

/**
 * app에는 listen이라는 메소드가 있음.
 * listen에 포트를 지정하면 애플리케이션이 포트번호를 listening이 가능해짐
 */
app.listen(port, () => {
    console.log(`Web server is running at ${host}:${port}`);
});
