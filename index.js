import { room } from "./objects.js";
const maze = document.querySelector('.maze');
const leftP = document.querySelector('#left');
const positionOfRooms = [];
const fixedPositions = [];
const dynamicPosition = [];
let ID = 0;
let graph;
function initGraph() {
   graph = new Array(7);
   for (let i = 0; i < graph.length; i++) {
      graph[i] = new Array(7);
   }
}
initGraph()
let leftPiece;
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
   leftPiece = new room(rid.pop(), 0, 50)
   leftP.append(genImg(leftPiece, 0, 0));
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

leftP.addEventListener('click', rotateIMG)
function rotateIMG(event) {
   const t = event.target;
   if (!t.matches('img'))
      return;
   t.style.transform += 'rotate(90deg)';
   leftPiece.beRotated();
   // console.log(leftPiece.door);
}
// SECTION get ids from an row
function collectId(type, num) {
   let ans;
   if (type == 'row') {
      ans = graph[num].map((e) => (e.id));
   }
   else {
      ans = graph.map((e) => e[num].id);
   }
   return ans;
}

// SECTION arrow event listeners
document.addEventListener('click', arrowClickHandle)
function arrowClickHandle(e) {
   const t = e.target;
   if (!(t.matches('i') && t.parentElement.matches('.arrow-panel')))
      return;
   // console.log(t)
   // console.log(t.parentElement)
   // console.log(t.dataset)
   const data = t.dataset;
   let num;
   if (data.type === 'row')
      num = data.x / 100;
   else num = data.y / 100;
   // console.log(num)
   const Ids = collectId(data.type, num);
   console.log(Ids)
   if (data.type === 'row') {
      let delta;
      let deleteId;
      if (data.dir === 'left') {
         delta = -100;
         deleteId = Ids[0];
      }
      else { delta = 100; deleteId = Ids[Ids.length-1]; }
      Ids.map(e => document.getElementById(e)).forEach((e, i) => {

         setTimeout(() => {
            let pos = parseInt(e.style.left.replace('px', ''));
            e.style.left = `${pos + delta}px`;
         }, 0)
         setTimeout(() => {
            const d = document.getElementById(deleteId);
            console.log(typeof d)
           maze.removeChild(d);
         }, 0);
      })

   }
   else {
      let delta;
      let deleteId;
      if (data.dir === 'up') {
         delta = -100;
         deleteId = Ids[0];
      }
      else {
         delta = 100;
         deleteId = Ids[Ids.length-1];
      }
      Ids.map(e => document.getElementById(e)).forEach((e, i) => {

         setTimeout(() => {
            let pos = parseInt(e.style.top.replace('px', ''));
            e.style.top = `${pos + delta}px`;
         }, 0)
         setTimeout(() => {
            const d = document.getElementById(deleteId);
            maze.removeChild(d);
            console.log(d)
         }, 0);
      })
   }

}

