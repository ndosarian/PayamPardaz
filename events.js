events={
    welcome:null,
    init:()=>{
        events.welcome = document.getElementById("profile-txt")
        login.loading = document.getElementById("loading");
        setTimeout(() => {
           login.loading.classList.add("d-none");
        
       }, 300);
       events.checklogin()
    },
    checklogin:()=>{
        if(!login.isloggedin()){
            setTimeout(() => {
                window.location="index.html";
            }, 300);
        } else {
            events.setUsername()
        }
    },
    setUsername:()=>{
        let user = login.getuser().split("@")
        events.welcome.innerHTML=user[0]
    }
}