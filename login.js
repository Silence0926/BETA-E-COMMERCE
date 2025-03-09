document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        // 模拟用户数据（实际项目应使用数据库）
        const storedUser = JSON.parse(localStorage.getItem("user"));
        
        if (storedUser && storedUser.username === username && storedUser.password === password) {
            alert("登录成功！");
            localStorage.setItem("loggedIn", "true");
            window.location.href = "index.html";
        } else {
            alert("用户名或密码错误！");
        }
    });
});
