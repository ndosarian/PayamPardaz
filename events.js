events={
    welcome:null,
    container:null,
    mainclonable:null,
    res:null,
    init:()=>{
        events.welcome = document.getElementById("profile-txt")
        login.loading = document.getElementById("loading");
        events.container=document.getElementsByClassName("container")[0];
        events.mainclonable = document.getElementsByClassName('main')[0];
       events.checklogin()
    },
    checklogin:()=>{
        if(!login.isloggedin()){
            setTimeout(() => {
                window.location="index.html";
            }, 300);
        } else {
            events.setUsername()
            events.loadEvents()
        }
    },
    setFeild:(elem,fild,value)=>{
        elem.getElementsByClassName(fild)[0].innerHTML=value
    },
    showEvents:(data)=>{
        data.forEach(element => {
            let neew = events.mainclonable.cloneNode(true);
            neew.classList.remove("d-none");
            events.setFeild(neew,"botnet-name",element.incident_type)
            events.setFeild(neew,"botnet-id","..."+"#" + element.incident_id.substring(0,7))
            events.setFeild(neew,"siem-btn",element.siem.name)
            events.setFeild(neew,"time-show",moment(element.reported_time).fromNow())
            events.setFeild(neew,"p1",element.sources[0].ips[0].ip)
            events.setFeild(neew,"p2",element.destinations[0].ips[0].ip)
            events.setFeild(neew,"port",element.sources[0].services[0].port)
            
            events.container.appendChild(neew); 
        });
    },
    loadEvents:()=>{
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            events.res = JSON.parse(this.responseText)
            events.showEvents(events.res.results);
            setTimeout(() => {
                login.loading.classList.add("d-none");
             
            }, 300);
            
        }
        xhttp.open("GET", "incidents", true);
        xhttp.send();
    },
    setUsername:()=>{
        let user = login.getuser().split("@")
        events.welcome.innerHTML=user[0]
    }
}