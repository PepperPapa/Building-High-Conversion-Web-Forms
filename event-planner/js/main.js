
document.addEventListener("DOMContentLoaded", function () {
  var user_name = document.getElementById("user-name");
  var user_email = document.getElementById("user-email");
  var user_pwd = document.getElementById("user-password");
  var user_job = document.getElementById("user-job");

  var submit_btn = document.getElementById("submit");
  var all_users = readLocalUsers() || {};

  function readLocalUsers() {
    var users = localStorage.getItem("all_users");
    if (users) {
      return JSON.parse(users);
    }
  }

  // code for register using localStorage and JSON
  submit_btn.addEventListener("click",   function () {
      var required_inputs = document.querySelectorAll("input.invalid-error");
      if (!required_inputs.length) {
        var new_user = {
          name: user_name.value,
          email: user_email.value,
          pwd: user_pwd.value,
          job: user_job.value
        };
        all_users[user_name.value] = new_user;
        localStorage.setItem("all_users", JSON.stringify(all_users));
        // 小屏幕情况下点击注册关闭弹出窗口
        slide.classList.remove("open");
      }
  });



  // code for login function
  var login_btn = document.getElementById("login");
  var logged_user = document.getElementById("login-status");

  login.addEventListener("click", function () {
    userLogin(user_name.value, user_pwd.value, all_users);
  });

  function userLogin(name, pwd, users) {
    if (name in users) {
      if (pwd == users[name].pwd) {
        logged_user.innerText = name;
        // 小屏幕情况下点击注册关闭弹出窗口
        slide.classList.remove("open");
      }
    }
  }

  // input validation for register
  user_name.addEventListener("blur", function () {
      if (this.value.length === 0) {
        var error = this.nextElementSibling;
        error.innerText = "*用户名不能为空";
        error.className = "invalid-error";
        error.style.display = "block";
        this.classList.add("invalid-error");
      }
    }
  );

  user_name.addEventListener("input", function () {
    if (this.value.length > 0) {
      var error = this.nextElementSibling;
      error.style.display = "none";
      this.classList.remove("invalid-error");
    }
  });

  var email_rule = /[\d\w\_]+@[\d\w]+\.[\w]+/g;
  user_email.addEventListener("blur", function () {
      if (!this.value.match(email_rule)) {
        var error = this.nextElementSibling;
        error.innerText = "*email格式不正确";
        error.className = "invalid-error";
        error.style.display = "block";
        this.classList.add("invalid-error");
      }
    });

  user_email.addEventListener("input", function () {
    if (this.value.match(email_rule)) {
      var error = this.nextElementSibling;
      error.style.display = "none";
      this.classList.remove("invalid-error");
    }
  });

  user_pwd.addEventListener("blur", function () {
      var error = [];
      if ((this.value.length < 16) || (this.value.length > 100)) {
        error.push("1.密码长度范围应在16～100个字符;");
      }
      if (!this.value.match(/[\!\@\#\$\%\^\&\*]/g)) {
        error.push("2.密码至少包含!, @, #, $, %, ^, &, *;");
      }
      if (!this.value.match(/\d/g)) {
        error.push("3.密码至少包含一个数字;");
      }
      if (!this.value.match(/[a-z]/g)) {
        error.push("4.密码至少包含一个小写字符;");
      }
      if (!this.value.match(/[A-Z]/g)) {
        error.push("5.密码至少包含一个大写字符;");
      }

      if (error.length > 0) {
        var element_error = this.nextElementSibling;
        element_error.innerText = error.join("\n");
        element_error.className = "invalid-error";
        element_error.style.display = "block";
        this.classList.add("invalid-error");
      }
    });

  user_pwd.addEventListener("input", function () {
    if ((this.value.length >= 16) && (this.value.length <= 100)) {
      if (this.value.match(/[\!\@\#\$\%\^\&\*]/g)) {
        if (this.value.match(/\d/g)) {
          if (this.value.match(/[a-z]/g)) {
            if (this.value.match(/[A-Z]/g)) {
              var element_error = this.nextElementSibling;
              element_error.style.display = "none";
              this.classList.remove("invalid-error");
            }
          }
        }
      }
    }
  });

  // implement event creation
  var all_cells = document.querySelectorAll(".event-cell");
  var overlay = document.querySelector(".overlay");
  var event_modal = document.querySelector(".create-event");
  var current_cell = Object(null);
  for (var i = 0; i < all_cells.length; i++) {
      all_cells[i].addEventListener("click", function() {
      overlay.style.display = "block";
      event_modal.style.display = "block";
      current_cell = this;
    });
  }

  var event_cancel = document.getElementById("event-cancel");
  var event_ok = document.getElementById("event-ok");
  event_ok.addEventListener("click", function() {
    current_cell.style["background-color"] = "#8c9fda";
    var event_name = document.querySelector("#event-name");
    current_cell.innerText = event_name.value;
    overlay.style.display = "none";
    event_modal.style.display = "none";
  });
  event_cancel.addEventListener("click", function() {
    overlay.style.display = "none";
    event_modal.style.display = "none";
  });

  // 弹出式菜单实现，用于小屏幕的情况下
  var menu = document.getElementById("menu");
  var slide = document.getElementById("slide");
  var main = document.getElementsByTagName("main")[0];

  menu.addEventListener("click", function(e) {
    slide.classList.toggle("open");
    e.stopPropagation();
  });

  main.addEventListener("click", function(e) {
    slide.classList.remove("open");
  });

  // TODO: 获取日期和星期信息

});
