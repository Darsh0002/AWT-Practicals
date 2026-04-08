// Simple EventEmitter

class EventEmitter {

    constructor(){
        this.events = {};
    }

    on(event, listener){
        if(!this.events[event])
            this.events[event] = [];

        this.events[event].push(listener);
    }

    emit(event, data){
        if(this.events[event]){
            this.events[event].forEach(fn => fn(data));
        }
    }
}

const emitter = new EventEmitter();

let currentUser = null;
let purchases = [];

// DOM Elements
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const welcome = document.getElementById("welcome");
const summary = document.getElementById("summary");


// EVENT LISTENERS

emitter.on("login",(user)=>{
    currentUser = user;
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("shopBox").classList.remove("hidden");
    welcome.innerText = "Welcome " + user;
});

emitter.on("purchase",(item)=>{
    purchases.push(item);

    const li = document.createElement("li");
    li.innerText = item;
    summary.appendChild(li);
});

emitter.on("logout",()=>{
    currentUser = null;
    purchases = [];

    document.getElementById("loginBox").classList.remove("hidden");
    document.getElementById("shopBox").classList.add("hidden");

    summary.innerHTML = "";
});


// BUTTON EVENTS

loginBtn.onclick = ()=>{
    const user = document.getElementById("username").value;
    if(user) emitter.emit("login", user);
};

document.querySelectorAll(".buyBtn").forEach(btn=>{
    btn.onclick = ()=>{
        emitter.emit("purchase", btn.dataset.item);
    }
});

logoutBtn.onclick = ()=>{
    emitter.emit("logout");
};