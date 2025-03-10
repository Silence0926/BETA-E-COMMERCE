let isGameRunning = false; // ✅ 提前初始化变量
function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;

        // ✅ 创建 canvas 并添加到 game-container
        let gameContainer = document.getElementById("game-container");
        gameContainer.innerHTML = ""; // 清空内容，避免重复添加
        let canvas = document.createElement("canvas");
        canvas.id = "gameCanvas";
        canvas.width = 400;
        canvas.height = 500;
        gameContainer.appendChild(canvas);

        let ctx = canvas.getContext("2d");

        // ✅ 重新初始化游戏对象
        player = {
            x: canvas.width / 2 - 20,
            y: canvas.height - 50,
            width: 40,
            height: 40,
            speed: 5,
            bullets: []
        };
        enemies = [];

        // ✅ 监听按键事件（防止重复添加）
        document.addEventListener("keydown", function(event) {
            if (event.key === "ArrowLeft" && player.x > 0) {
                player.x -= player.speed;
            } else if (event.key === "ArrowRight" && player.x < canvas.width - player.width) {
                player.x += player.speed;
            } else if (event.key === " ") {
                player.bullets.push({ x: player.x + 15, y: player.y, width: 5, height: 10 });
            }
        });

        function spawnEnemy() {
            enemies.push({ x: Math.random() * (canvas.width - 30), y: 0, width: 30, height: 30, speed: 2 });
        }

        function updateGame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "blue";
            ctx.fillRect(player.x, player.y, player.width, player.height);

            player.bullets.forEach((bullet, index) => {
                bullet.y -= 5;
                ctx.fillStyle = "red";
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
                if (bullet.y < 0) player.bullets.splice(index, 1);
            });

            enemies.forEach((enemy, index) => {
                enemy.y += enemy.speed;
                ctx.fillStyle = "green";
                ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

                player.bullets.forEach((bullet, bIndex) => {
                    if (
                        bullet.x < enemy.x + enemy.width &&
                        bullet.x + bullet.width > enemy.x &&
                        bullet.y < enemy.y + enemy.height &&
                        bullet.y + bullet.height > enemy.y
                    ) {
                        enemies.splice(index, 1);
                        player.bullets.splice(bIndex, 1);
                    }
                });
            });

            requestAnimationFrame(updateGame);
        }

        setInterval(spawnEnemy, 1000);
        updateGame();
    }
}
