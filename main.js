let timer = document.getElementById('timer');
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let resetButton = document.getElementById('resetButton');
let startClickedTime;
let throughTime;
let throughTimeOnRestart = 0;
let timerId;

function updateTimerDisplay() {
  var hour = Math.floor(throughTime / (60 * 60 * 1000));
  var min = Math.floor(throughTime / (60 * 1000));
  var sec = Math.floor(throughTime % (60 * 1000) / 1000);
  var ms = throughTime % 1000;

  //タイマーの表示桁数を揃える
  hour = ('0' + hour).slice(-2);
  min = ('0' + min).slice(-2);
  sec = ('0' + sec).slice(-2);
  ms = ('0' + ms).slice(-3, -1);

  timer.innerHTML = hour + ' : ' + min + ' : ' + sec + ' : ' + ms;
}

function countUpTimer() {
  var fn = function() {
    throughTime = Date.now() - startClickedTime + throughTimeOnRestart;
    updateTimerDisplay();
  }
  //10ミリ秒ごとにタイマーの表示を更新する
  timerId = setInterval(fn, 10);
}

function clickStartButton() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;

  startClickedTime = Date.now();
  countUpTimer();
}

function clickStopButton() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;

  clearInterval(timerId);
  //タイマーを一時停止した際に、それまでの経過時間をストックする
  throughTimeOnRestart += Date.now() - startClickedTime;
}

function clickResetButton() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;

  throughTime = 0;
  throughTimeOnRestart = 0;
  timer.innerHTML = '00 : 00 : 00 : 00';
}