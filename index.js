import { room, player } from "./objects.js";
const maze = document.querySelector(".maze");
const remainDiv = document.querySelector("#left");
const numPlayer = document.getElementById("player-num");
const numCard = document.getElementById("card-num");
const button = document.getElementById("btn");
const startScreen = document.getElementById("start-screen");
const mainGame = document.getElementById("main-game");
const positionOfRooms = [];
const fixedPositions = [];
const dynamicPosition = [];
const AllRooms = Array(51);
let numberOfPlayers = 2;
let numberOfTreasuresPerPlayer;
let allTreasures;
const pColor = ["red", "blue", "black", "green"];
const pStartID = [1, 4, 13, 16];
const players = [];
let possibleRoom = [];
numPlayer.addEventListener("input", Preload);
function Preload() {
  numberOfPlayers = parseInt(numPlayer.value);
  numCard.setAttribute("max", 24 / numberOfPlayers);
  numCard.setAttribute("value", 24 / numberOfPlayers);
}

button.addEventListener("click", loadGame);
function loadGame() {
  numberOfPlayers = parseInt(numPlayer.value);
  numberOfTreasuresPerPlayer = parseInt(numCard.value);
  startScreen.hidden = true;
  mainGame.hidden = false;
  allTreasures = numberOfPlayers * numberOfTreasuresPerPlayer;
  initTreasureArr();
  initGraph();
  initMaze();
  makeRemainPieceDraggable();
  initPlayerArr();
  spawnPlayers();
}
//  numberOfTreasuresPerPlayer = Math.floor(
//   Math.random() * (24 / numberOfPlayers - 1) + 1
// );
// numberOfTreasuresPerPlayer = 2;

console.log("tr", numberOfTreasuresPerPlayer);
console.log("num of tre", allTreasures);
const treasureArr = [];
const treasure2 = [];
// TODO INIT TREASURE ARRAY
function initTreasureArr() {
  for (let i = 1; i <= allTreasures; i++) {
    treasureArr.push(i);
  }
  treasureArr.sort((a, b) => Math.random() * 4 - 2);
  console.log("arr tre", treasureArr);
  treasureArr.forEach((e) => {
    treasure2.push(e);
  });
}

// TODO INIT PALYER ARRAY
function initPlayerArr() {
  for (let i = 0; i < numberOfPlayers; i++) {
    const its = treasure2.slice(
      i * numberOfTreasuresPerPlayer,
      i * numberOfTreasuresPerPlayer + numberOfTreasuresPerPlayer
    );
    const pl = new player(its, genId(), pColor[i], pStartID[i]);
    players.push(pl);
  }
  console.log("arr of player", players);
}

let slideIDs = [];
let dragged;
let ID = 0;
let graph;
let previousX = -1,
  previousY = -1;
function initGraph() {
  graph = new Array(7);
  for (let i = 0; i < graph.length; i++) {
    graph[i] = new Array(7);
  }
}
let remainRoom;
let remainPiece;

function genGUIRoom(r, x, y) {
  const img = document.createElement("div");
  img.style.background = `url(./img/${r.type}.png)`;
  img.id = r.id;
  img.classList.add("room");
  img.style.transform += `rotate(${r.ang}deg)`;
  img.style.top = `${x}px`;
  img.style.left = `${y}px`;
  img.style.fontSize = "20px";
  if (r.treasure != undefined) img.innerHTML += `<p>${r.treasure}</p>`;
  return img;
}
const fixedRooms = [
  ["bend", 1],
  ["t-shape", 2],
  ["t-shape", 2],
  ["bend", 2],

  ["t-shape", 1],
  ["t-shape", 1],
  ["t-shape", 2],
  ["t-shape", 3],

  ["t-shape", 1],
  ["t-shape", 0],
  ["t-shape", 3],
  ["t-shape", 3],

  ["bend", 0],
  ["t-shape", 0],
  ["t-shape", 0],
  ["bend", 3],
];

function initMaze() {
  for (let i = 0; i < 7; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      row.push({ x: i * 100, y: j * 100 });
      if (i % 2 == 0 && j % 2 == 0) {
        fixedPositions.push({ x: i * 100, y: j * 100 });
      } else dynamicPosition.push({ x: i * 100, y: j * 100 });
    }
    positionOfRooms.push(row);
  }

  fixedRooms.forEach((e, i) => {
    const xPos = fixedPositions[i].x;
    const yPos = fixedPositions[i].y;
    const r = new room(e[0], e[1], genId());
    AllRooms[r.id] = r;
    maze.append(genGUIRoom(r, xPos, yPos));
    console.log(r);
    const x = fixedPositions[i].x / 100;
    const y = fixedPositions[i].y / 100;
    graph[x][y] = r;
  });
  const rid = [];
  for (let i = 0; i < 13; i++) {
    rid.push("straight");
  }
  for (let i = 0; i < 15; i++) {
    rid.push("bend");
  }
  for (let i = 0; i < 6; i++) {
    rid.push("t-shape");
  }
  rid.sort((a, b) => Math.random() * 4 - 2);
  console.log(rid);
  remainRoom = new room(rid.pop(), 0, genId(), treasureArr.pop());
  AllRooms[remainRoom.id] = remainRoom;
  remainDiv.append(genGUIRoom(remainRoom, 0, 0));
  console.log(rid);
  console.log(dynamicPosition);
  rid.forEach((e, i) => {
    const xPos = dynamicPosition[i].x;
    const yPos = dynamicPosition[i].y;
    const r =
      Math.random() < 0.5
        ? new room(e, Math.random() * 4, genId(), treasureArr.pop())
        : new room(e, Math.random() * 4, genId());
    AllRooms[r.id] = r;
    maze.append(genGUIRoom(r, xPos, yPos));
    const x = xPos / 100;
    const y = yPos / 100;
    graph[x][y] = r;
  });
}
// console.log("graph", graph);
function genId() {
  ID = ID + 1;
  return ID;
}

remainDiv.addEventListener("click", rotateIMG);
function rotateIMG(event) {
  const t = event.target;
  if (!t.matches(".room")) return;
  t.style.transform += "rotate(90deg)";
  remainRoom.beRotated();
  // console.log(remainPiece.door);
}
// TODO make extend piece draggable
function makeRemainPieceDraggable() {
  const obj = remainDiv.firstElementChild;
  // console.log(obj)
  if (obj) {
    obj.setAttribute("draggable", "true");
  }
}
// TODO drag and drop event
document.addEventListener(
  "dragstart",
  function (event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    console.log(event.target);
    event.target.style.opacity = 0.5;
    if (dragged.className.includes("player")) {
      //  TODO implement bfs
      bfs();
    }
  },
  false
);

document.addEventListener(
  "dragend",
  function (event) {
    // reset the transparency
    event.target.style.opacity = "";
    if (dragged.className.includes("player")) {
      possibleRoom.forEach((e) => {
        e.style.opacity = "";
      });
      possibleRoom = [];
    }
  },
  false
);

/* events fired on the drop targets */
document.addEventListener(
  "dragover",
  function (event) {
    // prevent default to allow drop
    const t = event.target;
    if (
      (t.matches(".dropable") && dragged.className.includes("room")) ||
      (t.matches(".room") && dragged.className.includes("player"))
    )
      event.preventDefault();
    else return;
    // console.log(t)
  },
  false
);

document.addEventListener(
  "dragenter",
  function (event) {
    // highlight potential drop target when the draggable element enters it
    if (
      event.target.className.includes("dropable") &&
      dragged.className.includes("room")
    ) {
      event.target.style.boxShadow = "0px 0px 10px 3px #FAFF00";
    }
  },
  false
);

document.addEventListener(
  "dragleave",
  function (event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className.includes("dropable")) {
      event.target.style.border = "";
      event.target.style.boxShadow = "";
    }
  },
  false
);

function getStartCoord(arrow) {
  const data = arrow.dataset;
  let x, y;
  if (data.type === "row") {
    x = +data.x;
    if (data.dir === "left") y = +data.y + 100;
    if (data.dir === "right") y = +data.y - 100;
  }
  if (data.type === "col") {
    y = +data.y;
    if (data.dir === "up") x = +data.x + 100;
    if (data.dir === "down") x = +data.x - 100;
  }
  return [x, y];
}
function moveTo(element, x, y) {
  element.style.top = `${x}px`;
  element.style.left = `${y}px`;
}

// TODO the DROP
document.addEventListener(
  "drop",
  function (event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (
      event.target.className.includes("dropable") &&
      dragged.className.includes("room")
    ) {
      event.target.style.border = "";
      event.target.style.boxShadow = "";
      let data = event.target.dataset;
      let x, y;
      [x, y] = getStartCoord(event.target);
      // TODO prevent the undo
      if (!validMove(x, y)) return;
      else {
        previousX = x;
        previousY = y;
      }
      // TODO remove img from remaind div
      dragged.parentNode.removeChild(dragged);
      // TODO set the x and y of new img
      // console.log(x,y);
      moveTo(dragged, x, y);
      // console.log(dragged);
      // TODO insert img to maze
      dragged.setAttribute("draggable", "false");
      maze.appendChild(dragged);
      // TODO make slide animmation
      collectIDs(event.target);
      slideIDs.push(dragged.id);
      console.log("slideIDS", slideIDs);
      console.log("remain piece", remainPiece);
      shiftRooms(slideIDs, data.type, data.dir);
      // TODO delete the img remain
      // reset the coordinate of remain piece
      moveTo(remainPiece, 0, 0);
      console.log("remain piece", remainPiece);
      // TODO MOVE REMAIN IMG TO REMAINDIV
      remainDiv.appendChild(remainPiece);
      // TODO move the playing piece if it is out
      Array.from(remainPiece.children).forEach((child) => {
        if (child.className.includes("player")) {
          const t = child;
          comeToNewRoom(t, dragged);
        }
      });
      makeRemainPieceDraggable();
    }
    if (
      event.target.className.includes("room") &&
      dragged.className.includes("player")
    ) {
      if (possibleRoom.includes(event.target)) {
        //   dragged.parentNode.removeChild(dragged);
        //   event.target.appendChild(dragged);
        //   const khobau = parseInt(event.target.innerText);
        //   const currentPlayer = players.filter(
        //     (e) => e.id === parseInt(dragged.id)
        //   )[0];
        //   currentPlayer.curId = parseInt(event.target.id);
        //   if (currentPlayer.items.includes(khobau)) {
        //     const index = currentPlayer.items.indexOf(khobau);
        //     currentPlayer.items.splice(index, 1);
        //     console.log(currentPlayer.items);
        //     AllRooms[parseInt(event.target.id)].beCapture();
        //   }
        //   console.log(players.map((e) => e.curId));
        //   checkWIN();
        comeToNewRoom(dragged, event.target);
      }
    }
    //  console.log("graph after drop", graph);
  },
  false
);
// TODO get id of whole row or col which need to shift
function collectIDs(arrow) {
  const data = arrow.dataset;
  console.log(data);
  if (data.type === "row") {
    const r = data.x / 100;
    graph[r].forEach((e, i) => {
      slideIDs.push(+e.id);
    });
    changeGraph(data.type, data.dir, r);
  }
  if (data.type === "col") {
    const c = data.y / 100;
    graph.forEach((row, i) => {
      slideIDs.push(+row[c].id);
    });
    changeGraph(data.type, data.dir, c);
  }
  if (data.dir === "up" || data.dir === "left")
    remainPiece = document.getElementById(slideIDs[0]);
  else remainPiece = document.getElementById(slideIDs[slideIDs.length - 1]);
}
// TODO GUI room coor
function getRoomCoor(room) {
  let x = parseInt(room.style.top.replace("px", ""));
  let y = parseInt(room.style.left.replace("px", ""));
  return [x, y];
}

// TODO a function which is shift whole row or collumn
function shiftRooms(IdArray, type, dir) {
  const rooms = IdArray.map((e) => document.getElementById(e));
  let deltaX, deltaY;
  if (type === "row") {
    deltaX = 0;
    if (dir === "right") deltaY = 100;
    else deltaY = -100;
  }
  if (type === "col") {
    deltaY = 0;
    if (dir === "up") deltaX = -100;
    else deltaX = 100;
  }
  rooms.forEach((e, i) => {
    let x, y;
    [x, y] = getRoomCoor(e);
    moveTo(e, x + deltaX, y + deltaY);
  });

  slideIDs = [];
}

function changeGraph(type, dir, num) {
  if (type === "row") {
    if (dir === "right") {
      let temp = graph[num].pop();
      graph[num].unshift(remainRoom);
      remainRoom = temp;
    } else {
      let temp = graph[num].shift();
      graph[num].push(remainRoom);
      remainRoom = temp;
    }
  }
  if (type === "col") {
    if (dir === "up") {
      let temp = graph[0][num];
      for (let i = 1; i < 7; i++) {
        graph[i - 1][num] = graph[i][num];
      }
      graph[6][num] = remainRoom;
      remainRoom = temp;
    } else {
      let temp = graph[6][num];
      for (let i = 6; i > 0; i--) {
        graph[i][num] = graph[i - 1][num];
      }
      graph[0][num] = remainRoom;
      remainRoom = temp;
    }
  }
}
function validMove(x, y) {
  console.log("x", x, "y", y, "prex", previousX, "prey", previousY);
  let ans = true;
  if (x === previousX) {
    if (y + previousY === 600 && y * previousY < 0) ans = false;
  }
  if (y === previousY) {
    if (x + previousX === 600 && x * previousX < 0) ans = false;
  }
  return ans;
}

// TODO put player in start position
function spawnPlayers() {
  players.forEach((p, i) => {
    const r = document.getElementById(p.curId);
    r.appendChild(p.gui);
  });
}
function inRange(x, y) {
  return 0 <= x && x < 7 && 0 <= y && y < 7;
}
// TODO breadth first search
function bfs() {
  const e = [-1, 0, 1, 0];
  const f = [0, 1, 0, -1];
  let isVisited = new Array(100);
  let q = [];
  for (let i = 0; i < isVisited.length; i++) {
    isVisited[i] = false;
  }
  let v, xPos, yPos;
  v = dragged.parentNode;
  [xPos, yPos] = getRoomCoor(v);
  xPos /= 100;
  yPos /= 100;
  //   console.log(v);
  //   console.log("x", xPos, "y", yPos);
  q.push({ v, x: xPos, y: yPos });
  possibleRoom.push(v);
  isVisited[v.id] = true;
  while (q.length > 0) {
    let top = q.shift();
    //  console.log("top", top);
    //  top.v the GUI element
    const r = AllRooms[top.v.id];
    //  console.log("r", r);
    r.door.forEach((d, i) => {
      if (d) {
        let newX = top.x + e[i];
        let newY = top.y + f[i];
        //   console.log(newX,newY);
        if (inRange(newX, newY)) {
          if (graph[newX][newY].door[(i + 2) % 4]) {
            //   console.log('possible',graph[newX][newY]);
            const newRoom = graph[newX][newY];
            if (!isVisited[newRoom.id]) {
              isVisited[newRoom.id] = true;
              const u = document.getElementById(newRoom.id);
              possibleRoom.push(u);
              q.push({ v: u, x: newX, y: newY });
              // u.style.opacity="0.5";
            }
          }
        }
      }
    });
  }
  possibleRoom.forEach((e) => {
    e.style.opacity = "0.5";
  });
}
function checkWIN() {
  players.forEach((e) => {
    if (e.curId === e.startId && e.items.length === 0)
      alert("Player " + e.color + " is the winner!!!");
  });
}
function comeToNewRoom(player, newRoom) {
  player.parentNode.removeChild(player);
  newRoom.appendChild(player);
  const khobau = parseInt(newRoom.firstElementChild.innerText);
  const currentPlayer = players.filter((e) => e.id === parseInt(player.id))[0];
  currentPlayer.curId = parseInt(newRoom.id);
  if (currentPlayer.items.includes(khobau)) {
    const index = currentPlayer.items.indexOf(khobau);
    currentPlayer.items.splice(index, 1);
    console.log(currentPlayer.items);
    AllRooms[parseInt(newRoom.id)].beCapture();
  }
  //   console.log(players.map((e) => e.curId));
  checkWIN();
}
