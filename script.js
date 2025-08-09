const livesEl = document.getElementById('lives');
const scoreEl = document.getElementById('score');
const comboEl = document.getElementById('combo');
const timerEl = document.getElementById('timer');
const messageEl = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
const themeBtn = document.getElementById('themeBtn');
const leaderboardEl = document.getElementById('leaderboard');
const targetEl = document.getElementById('target');
const arrowGroup = document.getElementById('arrowGroup');
const trail = document.getElementById('trail');
const powerUpEl = document.getElementById('powerUp');
const shootSound = document.getElementById('shootSound');
const hitSound = document.getElementById('hitSound');

let lives = 3;
let score = 0;
let combo = 0;
let timeLeft = 60;
let gameOver = false;
let aimAngle = 0;
let timerInterval;

let arrow = {
  x: 100,
  y: 250,
  speed: 0,
  dx: 0,
  dy: 0,
  hit: false
};

let target = {
  baseX: 800,
  baseY: 250,
  x: 800,
  y: 250,
  radius: 22
};

let powerUp = {
  x: -50,
  y: -50,
  active: false
};

let targetPhase = 0;

restartBtn.addEventListener('click', startGame);
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

document.addEventListener('keydown', e => {
  if (e.code === 'Space') shoot();
});
document.addEventListener('click', shoot);

document.getElementById('game').addEventListener('mousemove', e => {
  if (arrow.speed > 0) return;
  const rect = e.target.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const dx = mouseX - 100;
  const dy = mouseY - 250;
  aimAngle = Math.atan2(dy, dx);
  arrowGroup.setAttribute('transform', `translate(100,250) rotate(${aimAngle * 180 / Math.PI})`);
});

function startGame() {
  lives = 3;
  score = 0;
  combo = 0;
  timeLeft = 60;
  gameOver = false;
  livesEl.textContent = lives;
  scoreEl.textContent = score;
  comboEl.textContent = combo;
  timerEl.textContent = timeLeft;
  messageEl.textContent = '';
  leaderboardEl.innerHTML = '';
  restartBtn.style.display = 'none';
  arrow.speed = 0;
  arrow.hit = false;
  resetArrow();
  spawnPowerUp();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (!gameOver) {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) endGame();
    }
  }, 1000);
  requestAnimationFrame(update);
}

function endGame() {
  gameOver = true;
  messageEl.textContent = 'GAME OVER!';
  restartBtn.style.display = 'inline-block';
  clearInterval(timerInterval);
  updateLeaderboard();
}

function shoot() {
  if (gameOver || arrow.speed > 0) return;
  arrow.speed = 25;
  arrow.hit = false;
  arrow.dx = Math.cos(aimAngle) * arrow.speed;
  arrow.dy = Math.sin(aimAngle) * arrow.speed;
  shootSound.currentTime = 0;
  shootSound.play().catch(() => {});
}

function moveTarget() {
  targetPhase += 0.03;
  target.x = target.baseX + Math.sin(targetPhase) * 140;
  target.y = target.baseY + Math.cos(targetPhase) * 60;
  targetEl.setAttribute('cx', target.x);
  targetEl.setAttribute('cy', target.y);
}

function spawnPowerUp() {
  powerUp.x = Math.random() * 800 + 100;
  powerUp.y = Math.random() * 400 + 50;
  powerUp.active = true;
  powerUpEl.setAttribute('cx', powerUp.x);
  powerUpEl.setAttribute('cy', powerUp.y);
}

function resetArrow() {
  arrow.speed = 0;
  arrow.x = 100;
  arrow.y = 250;
  arrowGroup.setAttribute('transform', `translate(100,250) rotate(${aimAngle * 180 / Math.PI})`);
  trail.setAttribute('opacity', '0');
}

function loseLife() {
  lives--;
  livesEl.textContent = lives;
  combo = 0;
  comboEl.textContent = combo;
  if (lives <= 0) endGame();
}

function updateLeaderboard() {
  let scores = JSON.parse(localStorage.getItem('archeryScores')) || [];
  scores.push(score);
  scores.sort((a, b) => b - a);
  scores = scores.slice(0, 5);
  localStorage.setItem('archeryScores', JSON.stringify(scores));
  leaderboardEl.innerHTML = `<h3>🏅 Top Scores</h3><ol>${scores.map(s => `<li>${s}</li>`).join('')}</ol>`;
}

function update() {
  if (gameOver) return;

  moveTarget();

  if (arrow.speed > 0) {
    arrow.x += arrow.dx;
    arrow.y += arrow.dy;
    arrowGroup.setAttribute('transform', `translate(${arrow.x},${arrow.y}) rotate(${aimAngle * 180 / Math.PI})`);
    trail.setAttribute('cx', arrow.x);
    trail.setAttribute('cy', arrow.y);
    trail.setAttribute('opacity', '0.6');

    const dx = arrow.x - target.x;
    const dy = arrow.y - target.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (!arrow.hit && dist < target.radius + 5) {
      arrow.hit = true;
      score += 10 + combo * 2;
      combo++;
      scoreEl.textContent = score;
      comboEl.textContent = combo;
      hitSound.currentTime = 0;
      hitSound.play().catch(() => {});
      targetEl.classList.add('pulse');
      setTimeout(() => targetEl.classList.remove('pulse'), 300);
      resetArrow();
    }

    const pdx = arrow.x - powerUp.x;
    const pdy = arrow.y - powerUp.y;
    const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
    if (powerUp.active && pdist < 15) {
      powerUp.active = false;
      timeLeft += 5;
      timerEl.textContent = timeLeft;
      powerUpEl.setAttribute('cx', -50);
      powerUpEl.setAttribute('cy', -50);
      messageEl.textContent = '⏳ +5s Bonus!';
      setTimeout(() => messageEl.textContent = '', 1500);
    }

    if (arrow.x > 1000 || arrow.y < 0 || arrow.y > 500) {
      if (!arrow.hit) loseLife();
      resetArrow();
    }
  }

  requestAnimationFrame(update);
}

// Auto-start the game
startGame();