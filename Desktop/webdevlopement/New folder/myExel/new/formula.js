//

// 



for(let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
        let cell = document.querySelector(`.cell[rid = "${i}"][cid = "${j}"]`);
        
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [cell, cellProp] = getActiveCell(address);
            
            if(cellProp.value != cell.innerText){
                cellProp.value = cell.innerText;
                removeChildFromParent(address);
                cellProp.formula = "";
                updateChildrenCell(address);
            }
            

            
        });
        
        cell.addEventListener("focus", (e) => {
            // console.log("i got focused");

            addressBar.value = String.fromCharCode(65 + j) + (i + 1) ;
            
            setProp(cell);
        });

    }
}



let formulaBar = document.querySelector(".formulaBar");

formulaBar.addEventListener("keydown", async  (e) =>  {
    let formula = formulaBar.value;
    if(e.key === "Enter" && formula){
        let address = addressBar.value;
        
        
        
        let [cell, cellProp] = getActiveCell(address);
        
        let presentFormula = cellProp.formula;

        
        
        if(presentFormula != formula && presentFormula){
            console.log("formula enter");
           
            removeChildFromParent(address);    
        }
        addChildToGraphComponent(address, formula);
        let cycleResponse = isGraphCyclic();
        if(cycleResponse){
            // alert("Your formula is cyclic please enter valid formula ");
            let response = confirm("Your Formula is Cyclic, Do you want to trace our path ");
            while(response === true){
                console.log(response);
                // keep on tracing color until user wants 
                await isGraphCyclicTracePath(cycleResponse);
                response = confirm("Your Formula is Cyclic, Do you want to trace our path ");

            }
            removeChildFromGraphComponent(formula);
            return;
        }
        

        addChildToParenet(formula, address); 

        let evalutedFormula = evaluateFormula(formula); 
        setUIandDB(cell, cellProp, evalutedFormula);
        
        cellProp.formula = formula;
        
        updateChildrenCell(address);
        // console.log(sheetDB);
        console.log(graphComponentMatrix);
        
    }
    
})

function removeChildFromGraphComponent(formula){

  
    // A1 = B1 + C1 
    let encodedFormula = formula.split(" "); // B1 ,  + , C1
    
    for(let i = 0; i < encodedFormula.length; i++){
        let ascii = encodedFormula[i].charCodeAt(0);
        if(ascii >= 65 && ascii <= 90) {

            let [prid, pcid] = decodeRidCidAddress(encodedFormula[i]); // 0 1 
            graphComponentMatrix[prid][pcid].pop();
            
        }
    }


}




function addChildToGraphComponent(childAdress, formula){

    
    // console.log("i got exe");
    let [ccid, crid] = decodeRidCidAddress(childAdress);
    // A1 = B1 + C1 
    let encodedFormula = formula.split(" "); // B1 ,  + , C1
    
    for(let i = 0; i < encodedFormula.length; i++){
        let ascii = encodedFormula[i].charCodeAt(0);
        if(ascii >= 65 && ascii <= 90) {

            let [prid, pcid] = decodeRidCidAddress(encodedFormula[i]); // 0 1 
            graphComponentMatrix[prid][pcid].push([ccid, crid]);
            
        }
    }


}
function updateChildrenCell(parentCell){

    let [parentNode, parentProp] = getActiveCell(parentCell);
    
    let childrenList = parentProp.children;

    for(let i = 0; i < childrenList.length; i++){

        let [childNode, childProp] = getActiveCell(childrenList[i]);
        let evalutedFormula = evaluateFormula(childProp.formula);  
        setUIandDB(childNode, cellProp, evalutedFormula);  
        childNode.formula = evalutedFormula;

        updateChildrenCell(childrenList[i]);
    }
    
    
}

function addChildToParenet(formula, address){
    
    let nodes = formula.split(" "); // B1 = [ ( , A1,  + , A2, )]
    
    
    for(let i = 0; i < nodes.length; i++){
        let ascii = nodes[i].charCodeAt(0) ;
        
        if(ascii >= 65 && ascii <= 90){
            [cell, cellProp]  = getActiveCell(nodes[i]);
            cellProp.children.push(address);
            

        }
    }
}
function removeChildFromParent(adress){
    [cell, cellProp] = getActiveCell(adress);
    let presentFormula = cellProp.formula;
    let nodes = presentFormula.split(" ");

    for(let i = 0; i < nodes.length; i++){
        let ascii = nodes[i].charCodeAt(0) ;
        
        if(ascii >= 65 && ascii <= 90){
            [cell, cellProp]  = getActiveCell(nodes[i]);
            
            let index = cellProp.children.indexOf(nodes[i]);
            cellProp.children.splice(index, 1);

        }
    }

}

function setUIandDB(cell, cellProp, evalutedFormula){
    cell.innerText = evalutedFormula;

    cellProp.value = evalutedFormula;
    
}

function evaluateFormula(formula){
    // if user have been given 
    // one constrain formula must be space separated 
    // (A1 + 10)

    let encodedFormula = formula.split(" "); // [ ( , A1,  + , 10, )]

    
    for(let i = 0; i < encodedFormula.length; i++){
        let ascii = encodedFormula[i].charCodeAt(0) ;
        
        if(ascii >= 65 && ascii <= 90){
            // console.log(encodedFormula[i]);
            [cell, cellProp]  = getActiveCell(encodedFormula[i]);
            // console.log(cellProp.value);
            encodedFormula[i] = cellProp.value;
        }
    }
    let formula1 = encodedFormula.join(" ");
    // console.log(formula1)
    return eval(formula1); // evaluate arithmatic expression
}


for(let i = 0; i < cell.length; i++){
    cell[i].addEventListener("click", (e) => setProp(cell[i]));
}