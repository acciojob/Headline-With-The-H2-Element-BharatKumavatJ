


async function isGraphCyclicTracePath(cycleResponse){
    let [srcr, srcc] = cycleResponse;
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

    // for(let i = 0;i < rows; i++){
    //     for(let j = 0; j < cols; j++){
    //         if(visited[i][j] == false){
    //             let response = dfsCycleDetection(i, j, visited, dfsVisited);
    //             if(response) return true;
    //         }
    //     }
    // }
    let response = await dfsCycleDetectionTracePath(srcr, srcc, visited, dfsVisited);


    if(response) Promise.resolve(true);
    Promise.resolve(false);
}



function colorPromise(){

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })

}












// coloring cells for tracking 
async function dfsCycleDetectionTracePath(srcR, srcC , visited, dfsVisited){
    visited[srcR][srcC] = true;
    dfsVisited[srcR][srcC] = true;

    
    let cell = document.querySelector(`.cell[rid = "${srcR}"][cid = "${srcC}"]`);
        cell.style.backgroundColor = "lightBlue";
        await colorPromise();
        

    for(let i = 0; i < graphComponentMatrix[srcR][srcC].length; i++){
        let [crid, ccid] = graphComponentMatrix[srcR][srcC][i];
        if(visited[crid][ccid] == false){
            let response = await dfsCycleDetectionTracePath(crid, ccid, visited, dfsVisited);
            if(response == true){
                cell.style.backgroundColor = "transparent";
                await colorPromise();
                return Promise.resolve(true);
            }
        }else if(visited[crid][ccid] && dfsVisited[crid][ccid]){
            let cyclicCell = document.querySelector(`.cell[rid = "${crid}"][cid = "${ccid}"]`);

          
                cyclicCell.style.backgroundColor = "pink";
                await colorPromise();

                cyclicCell.style.backgroundColor = "transparent";
                await colorPromise();

                cell.style.backgroundColor = "transparent";
                await colorPromise();
            
            return Promise.resolve(true);
            
        }   

    }

    dfsVisited[srcR][srcC] = false;
    return Promise.resolve(false)

}