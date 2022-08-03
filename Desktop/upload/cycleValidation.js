


// storage 2d matrix 
let graphComponentMatrix  = [];

for(let i = 0; i < rows; i++){
    let row = [];
    for(let j = 0; j < cols; j++){

        // use to store children that can be more then one
        row.push([]); 
    }
    graphComponentMatrix.push(row);
}

// console.log(graphComponentMatrix);

// true = cycle is present 
function isGraphCyclic(){
    // dependency 
    //stack trace 
    let dfsVisited = [];
    // visited
    let visited = [];

    for(let i = 0; i < rows; i++){
       
        let visitedrow = [];
        let dfsVisitedRow = [];
        for(let j = 0; j < cols; j++){
           visitedrow.push(false);
           dfsVisitedRow.push(false);
        }
        visited.push(visitedrow);
        dfsVisited.push(dfsVisitedRow);
    }

    for(let i = 0;i < rows; i++){
        for(let j = 0; j < cols; j++){
            if(visited[i][j] == false){
                let response = dfsCycleDetection(i, j, visited, dfsVisited);
                if(response) return [i, j]; // this cell would be src point from where cycle get started
            }
        }
    }
    return null;
}


// start -> vis true dfsvis = true

// perfrom dfs on all tthe children

// if already visited not visit again
// if response == true means cycle is there 
// dfsvis == vis == true : cycle  
// end -> dfsVis =  false


function dfsCycleDetection(srcR, srcC , visited, dfsVisited){
    visited[srcR][srcC] = true;
    dfsVisited[srcR][srcC] = true;
    for(let i = 0; i < graphComponentMatrix[srcR][srcC].length; i++){
        let [crid, ccid] = graphComponentMatrix[srcR][srcC][i];
        if(visited[crid][ccid] == false){
            let response = dfsCycleDetection(crid, ccid, visited, dfsVisited);
            if(response == true) return true;
        }else if(visited[crid][ccid] && dfsVisited[crid][ccid]){
            return true;
        }   

    }
    dfsVisited[srcR][srcC] = false;
    return false;
}

