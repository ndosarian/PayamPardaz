events = {
    welcome: null,
    container: null,
    mainclonable: null,
    res: null,
    loaderrorMessage:null,
    init: () => {
        events.welcome = document.getElementById("profile-txt")
        login.loading = document.getElementById("loading");
        events.container = document.getElementsByClassName("container")[0];
        events.mainclonable = document.getElementById('clonnable');
        events.loaderrorMessage = document.getElementById('loadError');
        events.checklogin()
    },
    checklogin: () => {
        if (!login.isloggedin()) {
            setTimeout(() => {
                window.location = "index.html";
            }, 300);
        } else {
            events.setUsername()
            events.loadEvents()
        }
    },
    setProp: (elem,prop,value) =>{
        elem.setAttribute(prop,value)
    },
    setFeild: (elem, fild, value) => {
        elem.getElementsByClassName(fild)[0].innerHTML = value
    },
    showEvents: (data) => {
        while (events.container.firstChild) {
            events.container.removeChild(events.container.lastChild);
        }
        
        data.forEach(element => {
            let newEvent = events.mainclonable.cloneNode(true);
            newEvent.classList.remove("d-none");
            events.setFeild(newEvent, "botnet-name", element.incident_type)
            events.setFeild(newEvent, "botnet-id", "#" + element.incident_id)
            events.setFeild(newEvent, "siem-btn", element.siem.name)
            events.setFeild(newEvent, "time-show", moment(element.reported_time).fromNow())
            events.setFeild(newEvent, "p1", element.sources[0].ips[0].ip)
            events.setFeild(newEvent, "p2", element.destinations[0].ips[0].ip)
            events.setFeild(newEvent, "port", element.sources[0].services[0].port)

            switch(element.incident_type){
                case "Waste Of Resource" :
                   events.setProp(newEvent.getElementsByClassName("botnet-logo")[0],"src","content/images/malware.png")
                    break;
                case "Worm":
                    events.setProp(newEvent.getElementsByClassName("botnet-logo")[0],"src","content/images/malware2.png")                    
                    break;
                case "Gain Access":
                    events.setProp(newEvent.getElementsByClassName("botnet-logo")[0],"src","content/images/malware.png")                    
                    break;
                case "Reconnaissance":
                    events.setProp(newEvent.getElementsByClassName("botnet-logo")[0],"src","content/images/malware2.png")  
                    break;

            }


            events.container.appendChild(newEvent);
        });
    },
    loadError : ()=>{
        events.loaderrorMessage.innerHTML = "ارتباط با سرور برقرار نیست.";
        events.loaderrorMessage.classList.remove("d-none")
        setTimeout(() => {
            login.loading.classList.add("d-none");
        }, 300);
    },
    loadEvents: () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function (){
            if(this.responseText!=undefined)
            {
                events.res = JSON.parse(this.responseText)
                events.showEvents(events.res.results);
                setTimeout(() => {
                    login.loading.classList.add("d-none");
                }, 300);
            } else {
                events.loadError()
            }
        };
        xhttp.onerror = () => {
            events.loadError()
        }
        xhttp.open("GET", "incidents", true);
        xhttp.send();
    },
    setUsername: () => {
        let user = login.getuser().split("@")
        events.welcome.innerHTML = user[0]
    },
    fileterEvents : () => {
        var filterValue = document.getElementById("search").value;
        let l = []
        events.res.results.forEach(element => {
            if (element.incident_type.toLowerCase().includes(filterValue.toLowerCase()))
            {
                l.push(element)
            } else if (element.sources[0].ips[0].ip.toLowerCase().includes(filterValue.toLowerCase()))
            {
                l.push(element)
            } else if (element.destinations[0].ips[0].ip.toLowerCase().includes(filterValue.toLowerCase()))
            {
                l.push(element)
            } else if (element.sources[0].services[0].port == parseInt(filterValue))
            {
                l.push(element)
            }
        });
        
        events.showEvents(l);
    }
}
