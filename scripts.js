```javascript
// 타이머 설정
const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

// 현재 상태
let timeLeft = WORK_TIME;
let isRunning = false;
let isWorkMode = true;
let completedCount = 0;

let timerId = null;


// HTML 요소 가져오기
const timer = document.getElementById("timer");
const mode = document.getElementById("mode");
const count = document.getElementById("count");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");


// 타이머 화면 업데이트
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    mode.textContent = isWorkMode ? "집중 시간" : "휴식 시간";
    count.textContent = completedCount;
}


// 타이머 시작
function startTimer() {
    if (isRunning) {
        return;
    }

    isRunning = true;

    timerId = setInterval(() => {
        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {
            switchMode();
        }
    }, 1000);
}


// 타이머 일시정지
function pauseTimer() {
    if (!isRunning) {
        return;
    }

    clearInterval(timerId);

    timerId = null;
    isRunning = false;
}


// 타이머 초기화
function resetTimer() {
    clearInterval(timerId);

    timerId = null;
    isRunning = false;
    isWorkMode = true;
    timeLeft = WORK_TIME;

    updateTimer();
}


// 집중 ↔ 휴식 전환
function switchMode() {
    clearInterval(timerId);

    timerId = null;
    isRunning = false;

    if (isWorkMode) {
        completedCount++;
        isWorkMode = false;
        timeLeft = BREAK_TIME;
    } else {
        isWorkMode = true;
        timeLeft = WORK_TIME;
    }

    updateTimer();

    // 타이머 종료 알림
    alert(isWorkMode ? "휴식이 끝났습니다! 집중을 시작하세요." : "집중 시간이 끝났습니다! 휴식하세요.");
}


// 버튼 이벤트
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);


// 처음 화면 설정
updateTimer();
```
