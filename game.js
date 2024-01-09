// ページが読み込まれたときの処理
document.addEventListener("DOMContentLoaded", function(event) {
  setInterval(function() {
    // 1秒ごとに敵を動かす
    move_enemy();
    check_game_over();
    draw();
  }, 1000);

  generate_coins();
  draw();
});

// キーが押されたときの処理
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp") {
    game_state.player.y -= 1;
  } else if (event.key === "ArrowDown") {
    game_state.player.y += 1;
  } else if (event.key === "ArrowLeft") {
    game_state.player.x -= 1;
  } else if (event.key === "ArrowRight") {
    game_state.player.x += 1;
  }
  update_score();
  check_game_over();
  draw();
})

// ゲームの状態
let game_state = {
  player: {
    x: 10,
    y: 10,
  },
  enemy: {
    x: 10,
    y: 20,
  },
  score: 0,
  coins: []
}

const UNIT = 10;

// プレイヤーがコインに触れたらスコアを更新する
function update_score() {
  for (const coin of game_state.coins) {
    if (coin.x === game_state.player.x && coin.y === game_state.player.y) {
      game_state.score += 1;
    }
  }

  game_state.coins = game_state.coins.filter(function(coin) {
    return !(coin.x === game_state.player.x && coin.y === game_state.player.y);
  });
}

// game_stateの状態を描画する
function draw() {
  const canvas = document.getElementById("canvas");
  canvas.width = 800;
  canvas.height = 800;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // プレイヤー
  ctx.fillStyle = "#0000FF";
  ctx.fillRect(game_state.player.x * UNIT, game_state.player.y * UNIT, UNIT, UNIT);

  // 敵
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(game_state.enemy.x * UNIT, game_state.enemy.y * UNIT, UNIT, UNIT);

  // コイン
  for (const coin of game_state.coins) {
    ctx.fillStyle = "#FFFF00";
    ctx.fillRect(coin.x * UNIT, coin.y * UNIT, UNIT, UNIT);
  }

  // 枠線
  ctx.strokeStyle = "#dddddd";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i < canvas.width; i += UNIT) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i < canvas.height; i += UNIT) {
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }

  // スコア
  ctx.fillStyle = "#000000";
  ctx.font = "20px Arial";
  ctx.fillText("score: " + game_state.score, 10, 30);
}

// コインをランダムな位置に生成する
function generate_coins() {
  for (let i = 0; i < 100; i++) {
    game_state.coins.push({
      x: Math.floor(Math.random() * 80),
      y: Math.floor(Math.random() * 80),
    });
  }
}

// 敵を動かす
function move_enemy() {
  if (game_state.enemy.x < game_state.player.x) {
    game_state.enemy.x += 1;
  } else if (game_state.enemy.x > game_state.player.x) {
    game_state.enemy.x -= 1;
  }
  if (game_state.enemy.y < game_state.player.y) {
    game_state.enemy.y += 1;
  } else if (game_state.enemy.y > game_state.player.y) {
    game_state.enemy.y -= 1;
  }
}

function check_game_over() {
  // プレイヤーが敵に捕まったらゲームオーバー
  if (game_state.enemy.x === game_state.player.x && game_state.enemy.y === game_state.player.y) {
    draw();
    alert("Game Over!");
    game_state.player.x = 10;
    game_state.player.y = 10;
    game_state.enemy.x = 10;
    game_state.enemy.y = 20;
    game_state.score = 0;
  }
}
