let rows = 100;
let cols = 26;

let colAddCol = document.querySelector(".colAddress");  // 1 to 100
let rowAddRow = document.querySelector(".rowAddress");  // 1 to 100
let cellCOn = document.querySelector(".cellCon");
for(let i = 1; i <= rows; i++){
    let colAdd = document.createElement("div");
    
    colAdd.setAttribute("class", "colAdd");
    colAdd.innerText = i;
    colAddCol.appendChild(colAdd);

}

for(let i = 0; i < cols; i++){
    let rowAdd = document.createElement("div");
    
    rowAdd.setAttribute("class", "rowAdd");
    rowAdd.innerText = String.fromCharCode(65 + i) ;;
    rowAddRow.appendChild(rowAdd);

}


let addressBar = document.querySelector(".adressBar");

const displayAdressInAddressBar = (cell, i, j) =>{
    //    console.log(String.fromCharCode(65 + j) + (i + 1));
        addressBar.value = String.fromCharCode(65 + j) + (i + 1) ;

}

for(let i = 0; i < rows; i++){
    let rowCon = document.createElement("div");
    rowCon.setAttribute("class", "rowCon")
    for(let j = 0; j < cols; j++){
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("spellcheck", "false");

        cell.setAttribute("contenteditable", "true");

        // use for easy access in storage
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);

        rowCon.appendChild(cell);   
        // console.log(cell);  
        cell.addEventListener("click", (e) => displayAdressInAddressBar(cell, i, j));
    }

    cellCOn.appendChild(rowCon);
}


// first cell auto focus
// query selector select first element by default
//firstCell.focus();
