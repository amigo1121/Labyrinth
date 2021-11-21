import { room } from "./objects.js";
const maze = document.querySelector('.maze');
const remainDiv = document.querySelector('#left');
const positionOfRooms = [];
const fixedPositions = [];
const dynamicPosition = [];
let dragged;
let ID = 0;
let graph;
function initGraph() {
   graph = new Array(7);
   for (let i = 0; i < graph.length; i++) {
      graph[i] = new Array(7);
   }
}
initGraph()
let remainPiece;
// console.log(positionOfRooms)

function genImg(r, x, y) {
   const img = document.createElement('img');
   img.src = `./img/${r.type}.png`
   img.id = r.id;
   img.classList.add('room');
   img.style.transform += `rotate(${r.ang}deg)`;
   img.style.top = `${x}px`;
   img.style.left = `${y}px`;
   return img;
}
const fixedRooms =
   [['bend', 1],
   ['t-shape', 2],
   ['t-shape', 2],
   ['bend', 2],

   ['t-shape', 1],
   ['t-shape', 1],
   ['t-shape', 2],
   ['t-shape', 3],

   ['t-shape', 1],
   ['t-shape', 0],
   ['t-shape', 3],
   ['t-shape', 3],

   ['bend', 0],
   ['t-shape', 0],
   ['t-shape', 0],
   ['bend', 3],
   ];
// const button = document.querySelector('button');
// const i = document.querySelector('.room');
// button.addEventListener('click',f)
// function f(e){
//    i.style.transform+='rotate(90deg)'
// }

function initMaze() {

   for (let i = 0; i < 7; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
         row.push({ x: i * 100, y: j * 100 });
         if (i % 2 == 0 && j % 2 == 0) {
            fixedPositions.push({ x: i * 100, y: j * 100 });
         }
         else dynamicPosition.push({ x: i * 100, y: j * 100 });
      }
      positionOfRooms.push(row);
   }

   fixedRooms.forEach((e, i) => {
      const xPos = fixedPositions[i].x;
      const yPos = fixedPositions[i].y;
      const r = new room(e[0], e[1], genId());
      maze.append(genImg(r, xPos, yPos))
      console.log(r)
      const x = fixedPositions[i].x / 100;
      const y = fixedPositions[i].y / 100;
      graph[x][y] = r;
   })
   const rid = [];
   for (let i = 0; i < 13; i++) {
      rid.push('straight');
   }
   for (let i = 0; i < 15; i++) {
      rid.push('bend');
   }
   for (let i = 0; i < 6; i++) {
      rid.push('t-shape');
   }
   rid.sort((a, b) => (Math.random() * 4 - 2));
   console.log(rid)
   remainPiece = new room(rid.pop(), 0, 50)
   remainDiv.append(genImg(remainPiece, 0, 0));
   console.log(rid)
   console.log(dynamicPosition)
   rid.forEach((e, i) => {
      const xPos = dynamicPosition[i].x;
      const yPos = dynamicPosition[i].y;
      const r = new room(e, Math.random() * 4, genId());
      maze.append(genImg(r, xPos, yPos))
      const x = xPos / 100;
      const y = yPos / 100;
      graph[x][y] = r;
   })

}
initMaze();
console.log(graph)
function genId() {
   ID++;
   return ID;
}

remainDiv.addEventListener('click', rotateIMG)
function rotateIMG(event) {
   const t = event.target;
   if (!t.matches('img'))
      return;
   t.style.transform += 'rotate(90deg)';
   remainPiece.beRotated();
   // console.log(remainPiece.door);
}
// get ids from an row

// TODO make extend piece draggable
function makeRemainPieceDraggable() {
   const obj = remainDiv.firstElementChild;
   // console.log(obj)
   if (obj) {
      obj.setAttribute('draggable', 'true');
   }
}
// makeRemainPieceDraggable()

// TODO
document.addEventListener("dragstart", function (event) {
   // store a ref. on the dragged elem
   dragged = event.target;
   // make it half transparent
   console.log(event.target)
   event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function (event) {
   // reset the transparency
   event.target.style.opacity = "";
}, false);


/* events fired on the drop targets */
document.addEventListener("dragover", function (event) {
   // prevent default to allow drop
   const t = event.target;
   if (!t.matches('.dropable'))
      return;
   event.preventDefault();
   // console.log(t)
}, false);

document.addEventListener("dragenter", function (event) {
   // highlight potential drop target when the draggable element enters it
   if (event.target.className.includes('dropable')) {
      event.target.style.border = "2px solid yellow";
      event.target.style.boxShadow = "0px 0px 10px yellow";
  }

}, false);

document.addEventListener("dragleave", function (event) {
   // reset background of potential drop target when the draggable element leaves it
   if (event.target.className.includes('dropable')) {
      event.target.style.border = "";
      event.target.style.boxShadow = "";
   }

}, false);

document.addEventListener("drop", function (event) {
   // prevent default action (open as link for some elements)
   event.preventDefault();
   // move dragged elem to the selected drop target
   if (event.target.className.includes('dropable'))  {
      // event.target.style.background = "";
      // dragged.parentNode.removeChild(dragged);
      // event.target.appendChild(dragged);
      console.log(object)
   }
}, false);