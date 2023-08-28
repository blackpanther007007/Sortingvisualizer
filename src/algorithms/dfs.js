// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
function dfs2(grid,startNode,finishNode,visitedNodesInOrder,path)
{   
  
    if(startNode.col===finishNode.col&&startNode.row===finishNode.row)
     {
       finishNode.isVisited=true;
      
        return [finishNode];
     }
     if(startNode.isWall)
     {
        return [];
    }
   if(startNode.isVisited){
      return [] ;
    }
    if(finishNode.isVisited)
    {
        return [];
    }
    startNode.isVisited=true;
   visitedNodesInOrder.push(startNode);
    const  nb=getUnvisitedNeighbors(startNode,grid);
    let arr=[];
    for(let r in nb)
    {
        path.push(nb[r]);
        let x=dfs2(grid,nb[r],finishNode,visitedNodesInOrder,path);
        path.pop();
        if(x.length>0)
         {
           arr.push(startNode);
           for(let i in x)
           {
            arr.push(x[i]);
           }
           console.log(arr);
         }
     }
     return arr;

}
export function dfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
  
    const path=[];
      console.log(startNode)
    const allpath=dfs2(grid,startNode,finishNode,visitedNodesInOrder,path);
    return allpath;
  }
  
 
  
  
  function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  function getAllNodes(grid) {
    const nodes = []; 
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  export function getNodespath(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
  