document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const newUsername = document.getElementById("new-username").value;
        const newPassword = document.getElementById("new-password").value;
        
        if (!newUsername || !newPassword) {
            alert("用户名和密码不能为空！");
            return;
        }
        
        // 模拟存储用户数据（实际项目应使用数据库）
        const user = { username: newUsername, password: newPassword };
        localStorage.setItem("user", JSON.stringify(user));
        
        alert("注册成功！请登录。");
        window.location.href = "login.html";
    });
});
