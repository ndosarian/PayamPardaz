
login = {
    username:null,
    password:null,
    message:null,
    init:()=> {
         login.username = document.getElementById("username");
         login.password = document.getElementById("password");
         login.message = document.getElementsByClassName("message")[0];
    },
    onclick:()=>{

        if(username.value=="admin" && password.value=="123"){
            login.message.classList.add("success");
            login.message.innerHTML=username.value+" عزیز خوش آمدید";
        }
        else {
        login.message.classList.add("error");
        login.message.innerHTML="نام کاربری یا رمز عبور اشتباه است!";

        }
        event.preventDefault();
    },
    removemessage:()=>{
        login.message.classList.remove("hidden");
        login.message.classList.remove("success");
        login.message.classList.remove("error");
        login.message.innerHTML="";
    },
    hidemessage:()=>{
        setTimeout(login.removemessage,500);
        login.message.classList.add("hidden");
    }
};