# 🌐 아무 말 대잔치 FE

`아무 말 대잔치` 프론트엔드 저장소입니다.  
정적 HTML/CSS/Vanilla JavaScript 기반 UI를 Express로 서빙하고, 백엔드 FastAPI API로 프록시하는 구조입니다.

이 저장소는 단순 화면 모음이 아니라 아래 흐름을 포함합니다.
- 회원가입 / 로그인 / 로그아웃
- 게시글 작성 / 수정 / 상세 / 좋아요 / 댓글
- 프로필 수정 / 비밀번호 변경 / 회원 탈퇴
- 실시간 1:1 DM, unread/read, 브라우저 Web Push UI
- Playwright E2E 테스트

---

## 주요 기능

### 1. 인증 / 계정
- 회원가입
  - 이메일 / 비밀번호 / 닉네임 검증
  - 이메일 / 닉네임 중복 확인
  - 프로필 이미지 업로드
- 로그인 / 로그아웃
- 회원 탈퇴
  - 계정과 관련 데이터 영구 삭제
  - 탈퇴 후 같은 이메일 / 닉네임으로 재가입 가능
- 프로필 수정
- 비밀번호 변경

### 2. 게시글
- 게시글 목록 무한 스크롤
- 게시글 작성 / 수정 / 삭제
- 게시글 상세 조회
- 조회수 / 좋아요 / 댓글 수 표시
- 작성자 카드에서 바로 DM 진입

### 3. 댓글 / 좋아요
- 댓글 작성 / 수정 / 삭제
- 좋아요 토글
- 댓글 수 / 좋아요 수 즉시 반영

### 4. 실시간 DM
- 채팅방 목록 / 방별 unread 표시
- 실시간 1:1 WebSocket 채팅
- 읽음 / 미읽음 상태 반영
- 방 목록 재정렬
- Web Push 구독 UI와 Service Worker 연동
  - 브라우저 정책상 실제 Web Push 수신은 `localhost` 또는 `HTTPS` 환경에서 동작

### 5. 테스트
- Playwright 기반 E2E 테스트 포함
- 주요 검증 시나리오
  - 회원가입 / 로그인 / 로그아웃
  - 프로필 수정 / 탈퇴 후 재가입
  - 게시글 / 댓글 / 좋아요 / DM / unread 흐름

---

## 기술 스택

| 구분 | 기술 |
|:---|:---|
| UI | HTML, CSS, Vanilla JavaScript |
| FE 서버 | Express |
| 백엔드 연동 | `http-proxy-middleware` |
| E2E 테스트 | Playwright |

---

## 실행 방법

### 1. 저장소 이동
```bash
cd /Users/junsu/Desktop/2-junsu-community-fe
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 프론트 서버 실행
```bash
npm start
```

기본 실행 포트는 `3000`입니다.

### 4. 접속 주소
- 기본: [http://localhost:3000](http://localhost:3000)
- 루트(`/`)는 `login.html`을 서빙합니다.
- 게시글 목록은 `index.html`입니다.

---

## 환경 변수

### 런타임
- `PORT`
  - 기본값: `3000`
- `BACKEND_TARGET`
  - 기본값: `http://127.0.0.1:8000`
  - `/v1`, `/uploads` 요청을 이 주소로 프록시합니다.

예시:
```bash
PORT=3000 BACKEND_TARGET=http://127.0.0.1:8000 npm start
```

---

## 테스트

### Playwright E2E
```bash
npm run test:e2e
```

### 헤드 모드 실행
```bash
npm run test:e2e:headed
```

테스트 기본 대상 주소는 `http://127.0.0.1`입니다.  
필요하면 `PLAYWRIGHT_BASE_URL`로 변경할 수 있습니다.

예시:
```bash
PLAYWRIGHT_BASE_URL=http://127.0.0.1 npm run test:e2e
```

---

## 프로젝트 구조

```text
2-junsu-community-fe
├── css/
│   ├── common.css
│   ├── dm.css
│   ├── login.css
│   ├── password.css
│   ├── post_detail.css
│   ├── post_write.css
│   ├── posts.css
│   ├── profile.css
│   └── signup.css
├── js/
│   ├── common.js
│   ├── config.js
│   ├── dm.js
│   ├── login.js
│   ├── modal.js
│   ├── password.js
│   ├── post_detail.js
│   ├── post_edit.js
│   ├── post_write.js
│   ├── posts.js
│   ├── profile.js
│   └── signup.js
├── tests/e2e/
│   ├── auth-profile.spec.cjs
│   ├── helpers.cjs
│   └── posts-dm.spec.cjs
├── src/
│   └── server.js
├── dm.html
├── index.html
├── login.html
├── password.html
├── playwright.config.cjs
├── post_detail.html
├── post_edit.html
├── post_write.html
├── profile.html
├── push-sw.js
├── signup.html
├── Dockerfile
├── package.json
└── README.md
```

---

## 페이지 구성

### `login.html`
- 루트 진입 화면
- 로그인 처리
- 회원가입 화면 이동

### `signup.html`
- 회원가입
- 프로필 이미지 선택
- 이메일 / 닉네임 중복 확인

### `index.html`
- 게시글 목록
- 무한 스크롤
- 프로필 드롭다운
- DM 진입 버튼

### `post_write.html`
- 게시글 작성
- 이미지 첨부

### `post_edit.html`
- 기존 게시글 수정

### `post_detail.html`
- 게시글 상세
- 좋아요 / 댓글
- 작성자 카드
- DM 진입

### `dm.html`
- 채팅방 목록
- 실시간 DM
- unread/read 반영
- 브라우저 알림 구독 UI

### `profile.html`
- 프로필 이미지 / 닉네임 수정
- 회원 탈퇴

### `password.html`
- 비밀번호 변경

---

## 프론트 서버 역할

`src/server.js`는 다음 역할을 합니다.
- 정적 HTML / CSS / JS 파일 서빙
- `/v1`, `/uploads` 요청을 백엔드로 프록시
- 개발/로컬 검증 시 프론트 단독 실행 진입점 제공

즉 이 저장소는 정적 파일만 있는 것이 아니라,  
프론트 전용 Express 서버를 통해 백엔드와 연결되는 구조입니다.

---

## 관련 저장소
- 백엔드: [https://github.com/hahark-ops/2-junsu-community-be](https://github.com/hahark-ops/2-junsu-community-be)
- 프론트엔드: [https://github.com/hahark-ops/2-junsu-community-fe](https://github.com/hahark-ops/2-junsu-community-fe)

---

## 비고
- 현재 공개 EC2의 `HTTP + IP` 환경에서는 브라우저 정책상 Web Push가 비활성일 수 있습니다.
- Web Push는 `localhost` 또는 `HTTPS` 환경에서 정상 테스트하는 것이 맞습니다.
