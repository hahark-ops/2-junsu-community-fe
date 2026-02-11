const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

// 정적 파일(CSS, JS 등)을 제공하기 위한 설정 (나중에 필요함)
const { createProxyMiddleware } = require('http-proxy-middleware');

// 정적 파일(CSS, JS 등)을 제공하기 위한 설정 (나중에 필요함)
app.use(express.static(path.join(__dirname, '../public'), { index: false }));

// 프록시 설정 (브라우저 -> 프론트서버 -> 백엔드서버)
const backendProxy = createProxyMiddleware({
    target: 'http://52.78.24.198:8000',
    changeOrigin: true
});

app.use('/v1', backendProxy);
app.use('/uploads', backendProxy);

// 루트 경로 ('/')로 접속하면 login.html 파일을 보내줌 (로그인부터 시작)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

// 게시글 목록 페이지 ('/posts')
app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
    console.log(`서버가 실행되었습니다!`);
    console.log(`접속 주소: http://localhost:${port}`);
});
