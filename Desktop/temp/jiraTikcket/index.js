
let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");

let addFlag = false;
let removeflag = false;

let textArea = document.querySelector(".text-area-container");
let modal = document.querySelector(".modal-container");
let main_container = document.querySelector(".main-container");
let all_priority_color = document.querySelectorAll(".priority-color");
let priority_colors = ["lightpink", "lightblue", "lightgreen", "black"];
let priority = priority_colors[priority_colors.length - 1];
//let toolboxPriorityContainer = document.querySelector(".toolbox-priority-container");


let ticketsArr = [];
let toolboxColors = document.querySelectorAll(".color");


// add event listner


//load tickets from local storage 


if(JSON.parse(localStorage.getItem("jeeraTicket"))){

    ticketsArr = JSON.parse(localStorage.getItem("jeeraTicket"));
   
    
    ticketsArr.forEach((ticketObj, idx) => {
        createTicket(ticketObj.priority, ticketObj.task, ticketObj.ticket_id, false);
    })



}


//localStorage.removeItem("jeeraTicket");


for(let i = 0; i < toolboxColors.length; i++){
    toolboxColors[i].addEventListener("click", (e) => {
        let currToolboxColor = toolboxColors[i].classList[0];
        // filter will return array of matched objects
        console.log(ticketsArr);
        let filteredTicket = ticketsArr.filter((ticketObj, idx) => {
            return currToolboxColor == ticketObj.priority;
        
        })

        let allTicketsCon = document.querySelectorAll(".ticket-con");

        console.log(allTicketsCon);
        // remove prevois tickts
        for(let i = 0; i < allTicketsCon.length; i++){
            allTicketsCon[i].remove();
        }

        // display filtered ticket

        filteredTicket.forEach((ticketObj, idx) => {
            createTicket(ticketObj.priority, ticketObj.task, ticketObj.ticket_id, false);
        })

    })

    toolboxColors[i].addEventListener("dblclick", (e) => {
    
        let allTicketsCon = document.querySelectorAll(".ticket-con");

        for(let i = 0; i < allTicketsCon.length; i++){
            allTicketsCon[i].remove();
        }

        // display filtered ticket

        ticketsArr.forEach((ticketObj, idx) => {
            createTicket(ticketObj.priority, ticketObj.task, ticketObj.ticket_id, false);
        })

    })


}


// add priority based upon clicked priority color 
// console.log(all_priority_color);

all_priority_color.forEach((color1, idx) =>{
    color1.addEventListener("click", (e) => {
        all_priority_color.forEach((pcolor, idx) =>{
            pcolor.classList.remove("active");
        });
        color1.classList.add("active");
        priority = color1.classList[0];
        console.log(priority);
    });
    
});

removeBtn.addEventListener("click", (e) => {
    removeflag = !removeflag;
    console.log(removeflag);
});
addBtn.addEventListener("click", () =>{
    // create and display modal

    // genrate ticket
//    console.log(addFlag);
    // add flag = true display modal
    // else remove 
    addFlag = !addFlag;
    if(addFlag){
        modal.style.display = "flex";
        textArea.focus();
        
    }else{
        modal.style.display = "none";

    }
});

modal.addEventListener("keydown", (e) => {
    
   
    if(e.shiftKey){
        console.log("sift pressed ");
        let task = textArea.value;
        createTicket(priority, task, shortid(), true);   
        modal.style.display = "none";
        addFlag = false;
        
        textArea.value = "";

    }
});
 
function createTicket(priority, task, ticket_id, flag){
    
    let ticket_container = document.createElement("div");
    ticket_container.setAttribute("class", "ticket-con");
    ticket_container.innerHTML = `
    <div class="priority-tag ${priority} "></div>
    <div class="ticket-id">#${ticket_id}</div>
    <div class="task">${task}</div>
    <div class="lock"><i class="fa-solid fa-lock"></i></div>
    `;


    main_container.appendChild(ticket_container);
   
    if(flag){
        ticketsArr.push({priority, task, ticket_id});
        localStorage.setItem("jeeraTicket",JSON.stringify(ticketsArr));
    }
    // ticket = ticket_container;
   removeTicketHandler(ticket_container, ticket_id);
   lockHandler(ticket_container, ticket_id);
   togglePriority(ticket_container, ticket_id);  
   setDefault();    
}


function removeTicketHandler(ticketcontainer, id){

    ticketcontainer.addEventListener("click", (e) =>{
        if(removeflag == true){

            let idx = getIndex(id);
            // clear the local storage
            // delete ticket from array 
            console.log(idx);
            ticketsArr.splice(idx,1);
            console.log(ticketsArr);
            localStorage.setItem("jeeraTicket",JSON.stringify(ticketsArr));
            ticketcontainer.remove();
        }
    });
}

function getIndex(id){

    for(let i = 0; i < ticketsArr.length; i++){
        if(ticketsArr[i].ticket_id == id)
            return i;
    }
    // let idx = ticketsArr.forEach(ticketobj => {
    //    return  ticketobj.ticketId === id;
    // })
    // return idx;
}


function setDefault(){
    all_priority_color.forEach((pcolor, idx) =>{
        pcolor.classList.remove("active");
    });
    all_priority_color[all_priority_color.length - 1].classList.add("active");
    priority = all_priority_color[all_priority_color.length - 1].classList[0];
}
let lockClass = "fa-lock";
let unlockClass = "fa-lock-open"; 

function lockHandler(ticket, id){

    let idx = getIndex(id);
    let lockEle = ticket.querySelector(".lock");
    let task = ticket.querySelector(".task");
    // console.log(lockEle.children[0]);
    let tikcetlock  = lockEle.children[0];
    lockEle.addEventListener("click", (e) => {
        if(tikcetlock.classList.contains(lockClass)){
            tikcetlock.classList.replace(lockClass, unlockClass);
            task.setAttribute("contenteditable", "true");
            task.setAttribute("spellcheck", "false");

        }else{
           
            ticketsArr[idx].task = task.innerText;
            tikcetlock.classList.replace(unlockClass, lockClass);
            localStorage.setItem("jeeraTicket",JSON.stringify(ticketsArr));

            task.setAttribute("contenteditable", "false");
        }
    });

}

function togglePriority(ticket, id){

    let colorClass = ticket.querySelector(".priority-tag");

    colorClass.addEventListener("click", (e) => {

        let idx = getIndex(id);
        currColor = colorClass.classList[1];
        // console.log(currColor);
        let currColorIdx;
       
        for(let i = 0; i < 4; i++){
            // console.log(all_priority_color[i]);
            if(priority_colors[i] == currColor){
                currColorIdx = i;
                break;
            }
        }
        colorClass.classList.remove(currColor);
        let nextColor = (currColorIdx + 1) % 4;
        colorClass.classList.add(priority_colors[nextColor]);
        // colorClass.priority = (priority_colors[nextColor];

        updateArray(ticket, priority_colors[nextColor]);
        console.log(ticketsArr);
        localStorage.setItem("jeeraTicket",JSON.stringify(ticketsArr));


    });

}


function updateArray(ticket, color){
    let ticketId = ticket.querySelector(".ticket-id");
    console.log(ticketId.innerText);
    ticketsArr.forEach((obj) => {
        
        console.log(obj.ticket_id);
        if(obj.ticket_id === ticketId.innerText.substring(1)){
            obj.priority = color;
            
        }
    });
}