
// storage
let sheetDB = [];



for(let i = 0; i < rows; i++){
    let sheetRow = [];
    for(let j = 0; j < cols; j++){

        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            BgColor: "#bdc3c7",
            value: "",
            formula: "",
            children: []
        };
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

// selector for all properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment");
let fontFamily = document.querySelector(".font-family"); 
let fontSize = document.querySelector(".font-size");
let BgColor = document.querySelector(".bg-color");
let fontColor = document.querySelector(".text-color");

let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeProp = "#b2bec3";

// atached property 

// access cell from address bar
// decode A1 in term of indices
// access cell
// access cell object from matrix in storage
// make modification in ui and storage property

bold.addEventListener("click", (e) => {
  
    let address = addressBar.value;
   
    let [cell, cellProp]  = getActiveCell(address);

    /// cell is ui cell and cellprop is sheetdb value
    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeProp : "" ;        
    
})
italic.addEventListener("click", (e) => {
  
    let address = addressBar.value;
   
    let [cell, cellProp]  = getActiveCell(address);

    /// cell is ui cell and cellprop is sheetdb value
    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeProp : "" ;        
    
})
underline.addEventListener("click", (e) => {
  
    let address = addressBar.value;
   
    let [cell, cellProp]  = getActiveCell(address);

    /// cell is ui cell and cellprop is sheetdb value
    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeProp : "" ;        
    
})


fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp]  = getActiveCell(address);

    cellProp.fontSize = fontSize.value; // font chaged in db
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})

fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp]  = getActiveCell(address);

    cellProp.fontFamily = fontFamily.value; // font chaged in db
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})

fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp]  = getActiveCell(address);
    
    cellProp.fontColor = fontColor.value; // font chaged in db
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})


// console.log(fontColor);

BgColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp]  = getActiveCell(address);

    cellProp.BgColor = BgColor.value;
    cell.style.backgroundColor = cellProp.BgColor;
    BgColor.value = cellProp.BgColor;

})


/// text alignment 

alignment.forEach(align => {
    align.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp]  = getActiveCell(address);
        
        switch(align.classList[0]){
            case "left":
                cellProp.alignment = "left";
                cell.style.textAlign = "left";
                align.style.backgroundColor = activeProp;
                alignment[1].style.backgroundColor = "";
                alignment[2].style.backgroundColor = "";
                break;
            case "right":
                cellProp.alignment = "right";
                cell.style.textAlign = "right";
                align.style.backgroundColor = activeProp;
                alignment[0].style.backgroundColor = "";
                alignment[1].style.backgroundColor = "";
                break;
            case "center":
                cellProp.alignment = "center";
                cell.style.textAlign = "center";
                align.style.backgroundColor = activeProp;
                alignment[0].style.backgroundColor = "";
                alignment[2].style.backgroundColor = "";
                break;
        }
    })
});

// default and applied property on clicked cell activation in gui and applied on cell 

let cell = document.querySelectorAll(".cell");



function setProp(cell){
    
    let address = addressBar.value;
    let [rid, cid] = decodeRidCidAddress(address);
    let cellProp = sheetDB[rid][cid];
    // bold
    // console.log(cell, cellProp);
    
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeProp : "" ;
    // italic
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeProp : "" ;
    // underline
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeProp : "" ;

    // font size 
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;

    // font style
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
    
    
    // alignment
    let allignment = cellProp.alignment;
    // ui activation 
    cell.style.textAlign = alignment;
    switch(allignment){
        case "left":
            alignment[0].style.backgroundColor = activeProp;
            alignment[1].style.backgroundColor = "";
            alignment[2].style.backgroundColor = "";

            break;
        case "center":
            alignment[0].style.backgroundColor = "";
            alignment[1].style.backgroundColor = activeProp;
            alignment[2].style.backgroundColor = "";

            break;
        case "right":
            alignment[0].style.backgroundColor = "";
            alignment[1].style.backgroundColor = "";
            alignment[2].style.backgroundColor = activeProp;

            break;
    }

    let formulaBar = document.querySelector(".formulaBar");
    
    cell.value = cellProp.value;
    formulaBar.value = cellProp.formula;
    // console.log(cellProp.formula, cell, cellProp);

    
}






function getActiveCell(address){

    let [rid, cid] = decodeRidCidAddress(address);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];    
    
}

function decodeRidCidAddress(address){

    // adress A1 --> string 
    let rid = Number(address.slice(1)) - 1;  // 1 -- > 0
    let cid = Number(address.charCodeAt(0)) - 65;
    return [rid, cid];

}



let firstCell = document.querySelector(".cell");
firstCell.click();
firstCell.focus();




















