import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {dfs, getNodespath} from '../algorithms/dfs';

import styled from 'styled-components';

import './PathfindingVisualizer.css';

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Value = styled.div`
  margin-right: 10px;
`;

const SliderInput = styled.input`
  width: 200px;
`;


const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const NavbarContainer = styled.nav`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NavItem = styled.li`
  margin-left: 1.5rem;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      sliderValue: 5,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder,speed) {
    const newspeed = parseInt(speed);
    let x=parseInt(100);
    const sp=newspeed;
    x=parseInt(x/sp);
    console.log(speed);
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, x * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, x*i);
    }
  }
  animateDfs(visitedNodesInOrder, nodesInShortestPathOrder,speed) {
    const newspeed = parseInt(speed);
    let x=parseInt(100);
    const sp=newspeed;
    x=parseInt(x/sp);
    console.log(speed);
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, x * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, x*i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra(speed) {
    console.log(speed)
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder,speed);
  }
  visualizeDfs(speed) {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodespath(finishNode);
    console.log(visitedNodesInOrder);
    this.animateDfs(visitedNodesInOrder, nodesInShortestPathOrder,speed);
  }
  refresh() {
    window.location.reload();
  }
  handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    this.setState({ sliderValue: newValue });
  };
  render() {
    const {grid, mouseIsPressed} = this.state;
    const { sliderValue } = this.state;
    return (
      <>
        <NavbarContainer>
          <Logo href="/">AlgoView</Logo>
          <NavItems>
            <NavItem onClick={() => this.visualizeDfs(sliderValue)}>DFS</NavItem>
            <NavItem onClick={() => this.visualizeDijkstra(sliderValue)}>Dijkstra</NavItem>
            <NavItem onClick={() => this.refresh()}>Clear</NavItem>
            
          </NavItems>
        </NavbarContainer>
        <SliderContainer>
        <Value>Speed: {sliderValue}</Value>
        <SliderInput
          type="range"
          min={1}
          max={15}
          value={sliderValue}
          onChange={(e)=>this.handleSliderChange(e)}
        />
      </SliderContainer>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
