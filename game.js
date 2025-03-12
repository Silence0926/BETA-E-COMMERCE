// 获取 canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 设置 canvas 尺寸
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 加载图片
const playerImg = new Image();
playerImg.src = "images/飞机.png";
const enemyImg = new Image();
enemyImg.src = "images/敌人.png";
const bulletImg = new Image();
bulletImg.src = "images/玩家子弹.png";
const enemyBulletImg = new Image();
enemyBulletImg.src = "images/子弹.png";
const explosionImg = new Image();
explosionImg.src = "images/爆炸.png";

// 玩家对象
const player = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 100,
    width: 80,
    height: 80,
    speed: 10,
    bullets: [],
    lives: 3,
};

// 敌机列表
const enemies = [];
const bullets = [];
const explosions = [];

// 监听键盘事件
const keys = {};
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

// 更新游戏状态
function update() {
    // 移动玩家
    if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
    if (keys["ArrowRight"] && player.x < canvas.width - player.width) player.x += player.speed;
    if (keys["ArrowUp"] && player.y > 0) player.y -= player.speed;
    if (keys["ArrowDown"] && player.y < canvas.height - player.height) player.y += player.speed;

    // 更新子弹
    player.bullets.forEach((bullet, index) => {
        bullet.y -= 10;
        if (bullet.y < 0) player.bullets.splice(index, 1);
    });

    // 敌机逻辑
    enemies.forEach((enemy, index) => {
        enemy.y += 2;
        if (enemy.y > canvas.height) enemies.splice(index, 1);
    });

    // 碰撞检测（简化）
    player.bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                // 敌机爆炸
                explosions.push({ x: enemy.x, y: enemy.y, frame: 0 });
                player.bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
            }
        });
    });

    // 生成敌机
    if (Math.random() < 0.02) {
        enemies.push({
            x: Math.random() * (canvas.width - 50),
            y: -50,
            width: 50,
            height: 50,
        });
    }
}

// 绘制游戏
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制玩家
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

    // 绘制子弹
    player.bullets.forEach((bullet) => {
        ctx.drawImage(bulletImg, bullet.x, bullet.y, 20, 40);
    });

    // 绘制敌机
    enemies.forEach((enemy) => {
        ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // 绘制爆炸效果
    explosions.forEach((explosion, index) => {
        ctx.drawImage(explosionImg, explosion.x, explosion.y, 50, 50);
        explosion.frame++;
        if (explosion.frame > 10) explosions.splice(index, 1);
    });
}

// 游戏循环
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// 玩家射击
window.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        player.bullets.push({
            x: player.x + player.width / 2 - 10,
            y: player.y,
            width: 10,
            height: 20,
        });
    }
});

// 启动游戏
gameLoop();
