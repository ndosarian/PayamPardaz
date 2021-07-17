login = {
    username: null,
    password: null,
    message: null,
    showpassword: null,
    loading: null,
    init: () => {
        login.username = document.getElementById("username");
        login.password = document.getElementById("password");
        login.message = document.getElementsByClassName("message")[0];
        login.showpassword = document.getElementById("showpassword");
        login.loading = document.getElementById("loading");
        setTimeout(() => {
            login.loading.classList.add("d-none");

        }, 300);
        if (login.isloggedin()) {
            setTimeout(() => {
                window.location = "events.html";
            }, 300);
        }

    },
    getuser: () => {
        let c = document.cookie
        var user = c.match(/user=([^;]+)/)[1];
        if (user)
            return user.split("@")[0];
        else
            return null;
    },
    logout: () => {
        document.cookie = "user=;"
        login.loading.classList.remove("d-none");
        setTimeout(() => {
            window.location = "index.html";
        }, 1000);
    },
    isloggedin: () => {
        if (login.getuser() == "")
            return false;
        return true;
    },
    onclick: () => {
        if (username.value.length > 0 && !username.validity.typeMismatch && password.value == "123") {
            login.message.classList.add("success");
            login.message.innerHTML = " کاربر عزیز خوش آمدید!";
            login.loading.classList.remove("d-none");
            setTimeout(() => {
                window.location = "events.html";
            }, 1000);

            document.cookie = `user=${username.value}`;
        } else if (username.value.length == 0) {
            login.message.classList.add("error");
            login.message.innerHTML = "لطفا نام کاربری را وارد کنید!";
        } else if (password.value.length == 0) {
            login.message.classList.add("error");
            login.message.innerHTML = "لطفا رمز عبور را وارد کنید!";
        } else if (username.validity.typeMismatch) {
            login.message.classList.add("error");
            login.message.innerHTML = "نام کاربری باید در قالب ایمیل باشد!";
        } else {
            login.message.classList.add("error");
            login.message.innerHTML = "نام کاربری یا رمز عبور اشتباه است!";

        }
        event.preventDefault();
    },
    removemessage: () => {
        login.message.classList.remove("hidden");
        login.message.classList.remove("success");
        login.message.classList.remove("error");
        login.message.innerHTML = "";
    },
    hidemessage: () => {
        setTimeout(login.removemessage, 500);
        login.message.classList.add("hidden");
    },
    showhidepass: () => {
        if (login.password.getAttribute("type") == "text") {
            login.password.setAttribute("type", "password");
        } else {
            login.password.setAttribute("type", "text")
        }
        events.preventDefault();
    }
};