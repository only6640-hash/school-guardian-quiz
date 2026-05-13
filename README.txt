# 학교폭력 예방 안전 지킴이 OX 퀴즈

이 파일 묶음은 QR로 접속하는 학교폭력 예방 OX 퀴즈 웹페이지 기본형입니다.

## 이번 버전의 퀴즈 방식

학생이 문제를 틀리면 다음 문제로 넘어가지 않습니다.
같은 문제를 맞힐 때까지 다시 선택해야 합니다.
10문제를 모두 맞혀야 마지막 인증 화면이 나옵니다.

결과 저장을 연결하면 Google Sheets에는 다음 정보가 저장됩니다.
- 제출시간
- 학교
- 학년
- 반
- 번호
- 이름
- 점수
- 전체문항
- 인증여부
- 다시생각한횟수
- 문항별응답

## 파일 구조

school_guardian_quiz/
- index.html : 화면 구조
- style.css : 디자인
- script.js : 문제, 채점, 인증, 저장 연결
- apps_script_code.gs : Google Sheets 저장용 Apps Script 코드
- images/ : 배너, 문제 이미지, O/X 버튼 이미지

## 사용 순서

### 1. 먼저 컴퓨터에서 테스트
index.html 파일을 더블클릭하면 브라우저에서 열립니다.

### 2. 문제 수정
script.js 파일에서 questions 배열의 text, answer, image를 수정하면 됩니다.

예시:
{
  text: "친구가 싫다고 했는데도 별명을 계속 부르면 장난이어도 학교폭력이 될 수 있다.",
  answer: "O",
  image: "images/q1.svg"
}

### 3. 이미지 교체
images 폴더 안의 파일을 새 이미지로 바꾸면 됩니다.

추천 크기:
- main_banner: 1600 x 900 정도
- q1~q10: 1200 x 700 정도
- o_button, x_button: 500 x 500 정도

이미지 파일명을 그대로 쓰면 코드 수정이 적습니다.
예: q1.svg 대신 q1.png를 쓸 경우 script.js의 image 경로도 images/q1.png로 바꾸세요.

### 4. 결과 저장 연결
Google Sheets를 만들고, 확장 프로그램 → Apps Script에 들어가 apps_script_code.gs 내용을 붙여넣습니다.
웹 앱으로 배포한 뒤 생성된 URL을 script.js의 GOOGLE_SCRIPT_URL에 넣습니다.

### 5. 웹에 올리기
GitHub Pages, Netlify, Vercel, Firebase Hosting 중 하나에 올리면 됩니다.

처음에는 GitHub Pages가 가장 단순합니다.
