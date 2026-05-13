// 1) Google Apps Script 배포 URL을 여기에 넣으세요.
// 아직 연결 전이면 빈 문자열로 두어도 퀴즈는 작동합니다.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyhGtuXVfC_RNGRZp2tBfWLJsJtud-hFw14_7m1QZY_ygk5Ksx4E2KWJlBNDKPcdmSZIA/exec";

// 2) OX 문제 10개
// answer: "O" 또는 "X"
// image: images 폴더 안의 파일명
const questions = [
  {
    text: "친구가 싫다고 했는데도 별명을 계속 부르면 장난이어도 학교폭력이 될 수 있다.",
    answer: "O",
    image: "images/q1.svg"
  },
  {
    text: "친구의 사진을 허락 없이 단체 채팅방에 올리는 것은 문제가 될 수 있다.",
    answer: "O",
    image: "images/q2.svg"
  },
  {
    text: "직접 때리지 않고 단체 채팅방에서 놀리는 것은 학교폭력이 아니다.",
    answer: "X",
    image: "images/q3.svg"
  },
  {
    text: "학교폭력을 보았을 때 혼자 해결하기 어렵다면 선생님이나 보호자에게 알리는 것이 좋다.",
    answer: "O",
    image: "images/q4.svg"
  },
  {
    text: "친구가 싫다고 말하면 장난을 멈추고 사과하는 것이 필요하다.",
    answer: "O",
    image: "images/q5.svg"
  },
  {
    text: "친구를 단체 활동에서 일부러 빼는 행동도 따돌림이 될 수 있다.",
    answer: "O",
    image: "images/q6.svg"
  },
  {
    text: "상대가 웃지 않고 힘들어하면 ‘그냥 장난’이라고 해도 다시 생각해야 한다.",
    answer: "O",
    image: "images/q7.svg"
  },
  {
    text: "학교폭력을 신고하면 무조건 친구를 배신하는 것이다.",
    answer: "X",
    image: "images/q8.svg"
  },
  {
    text: "온라인에서 한 말과 행동도 친구에게 상처를 줄 수 있으므로 조심해야 한다.",
    answer: "O",
    image: "images/q9.svg"
  },
  {
    text: "안전한 교실을 만들기 위해서는 방관하지 않고 도움을 요청하는 용기도 필요하다.",
    answer: "O",
    image: "images/q10.svg"
  }
];

let currentIndex = 0;
let score = 0;
let userInfo = {};
let answers = [];
let currentWrongCount = 0;
let totalWrongCount = 0;
let isMoving = false;

function showPage(id) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goIntro() {
  showPage("introPage");
}

function goInfo() {
  showPage("infoPage");
}

function getValue(id) {
  return document.getElementById(id).value.trim();
}

function startQuiz() {
  userInfo = {
    school: getValue("school"),
    grade: getValue("grade"),
    classNo: getValue("classNo"),
    studentNo: getValue("studentNo"),
    studentName: getValue("studentName")
  };

  if (!userInfo.school || !userInfo.grade || !userInfo.classNo || !userInfo.studentNo || !userInfo.studentName) {
    alert("학교, 학년, 반, 번호, 이름을 모두 입력해 주세요.");
    return;
  }

  currentIndex = 0;
  score = 0;
  answers = [];
  currentWrongCount = 0;
  totalWrongCount = 0;
  isMoving = false;

  showPage("quizPage");
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentIndex];
  currentWrongCount = 0;
  isMoving = false;

  document.getElementById("progressText").textContent = `문제 ${currentIndex + 1} / ${questions.length}`;
  document.getElementById("progressFill").style.width = `${(currentIndex / questions.length) * 100}%`;
  document.getElementById("questionText").textContent = q.text;
  document.getElementById("questionImage").src = q.image;
  document.getElementById("feedback").textContent = "정답을 고르면 다음 문제로 넘어갑니다.";
  document.getElementById("feedback").className = "feedback";
}

function chooseAnswer(choice) {
  if (isMoving) return;

  const q = questions[currentIndex];
  const isCorrect = choice === q.answer;
  const feedback = document.getElementById("feedback");

  if (!isCorrect) {
    currentWrongCount += 1;
    totalWrongCount += 1;

    feedback.textContent = "아쉬워요. 이 문제는 다시 생각해서 맞힐 때까지 풀어보세요!";
    feedback.className = "feedback wrong";

    answers.push({
      questionNo: currentIndex + 1,
      question: q.text,
      selected: choice,
      correctAnswer: q.answer,
      correct: false,
      attemptType: "wrong_try"
    });

    return;
  }

  isMoving = true;
  score += 1;

  answers.push({
    questionNo: currentIndex + 1,
    question: q.text,
    selected: choice,
    correctAnswer: q.answer,
    correct: true,
    wrongBeforeCorrect: currentWrongCount,
    attemptType: "passed"
  });

  feedback.textContent = currentWrongCount === 0
    ? "정답입니다! 다음 문제로 넘어갑니다."
    : `정답입니다! ${currentWrongCount}번 다시 생각한 뒤 맞혔습니다.`;
  feedback.className = "feedback correct";

  setTimeout(() => {
    currentIndex += 1;

    if (currentIndex < questions.length) {
      renderQuestion();
    } else {
      finishQuiz();
    }
  }, 750);
}

async function finishQuiz() {
  document.getElementById("progressFill").style.width = "100%";

  // 이 방식은 모든 문제를 맞혀야 끝까지 갈 수 있으므로, 완료하면 인증입니다.
  const certified = true;

  const resultData = {
    submittedAt: new Date().toLocaleString("ko-KR"),
    ...userInfo,
    score,
    total: questions.length,
    certified: "인증",
    totalWrongCount,
    answers: JSON.stringify(answers)
  };

  // Google Apps Script URL이 설정되어 있을 때만 저장
  if (GOOGLE_SCRIPT_URL) {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(resultData)
      });
    } catch (error) {
      console.warn("저장 중 오류가 발생했습니다.", error);
    }
  }

  renderResult();
  showPage("resultPage");
}

function renderResult() {
  const resultBox = document.getElementById("resultBox");

  resultBox.innerHTML = `
    <div class="certificate">
      <div class="emoji">🛡️</div>
      <h2>축하합니다!</h2>
      <p class="small">${userInfo.school} ${userInfo.grade}학년 ${userInfo.classNo}반 ${userInfo.studentNo}번</p>
      <div class="name">${userInfo.studentName}</div>
      <p>
        학교폭력 예방 OX 퀴즈 10문제를 모두 통과하여<br />
        <strong>학교폭력 예방 안전 지킴이</strong>로 인증되었습니다.
      </p>
      <p class="small">다시 생각한 횟수: ${totalWrongCount}회</p>
      <p class="small">인증일: ${new Date().toLocaleDateString("ko-KR")}</p>
    </div>
  `;
}

function restart() {
  currentIndex = 0;
  score = 0;
  answers = [];
  currentWrongCount = 0;
  totalWrongCount = 0;
  isMoving = false;

  showPage("quizPage");
  renderQuestion();
}
