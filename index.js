import { room } from "./objects.js";
const maze = document.querySelector('.maze');
const leftP = document.querySelector('#left');
const positionOfRooms = [];
const fixedPositions = [];
const dynamicPosition = [];
let ID =0;
let graph ;
function initGraph(){
   graph = new Array(7);
   for (let i = 0; i < graph.length; i++) {
      graph[i]=new Array(7);
   }
}
initGraph()
let leftPiece ;
// console.log(positionOfRooms)

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
      const r = new room(fixedPositions[i].x, fixedPositions[i].y, e[0], e[1],genId());
      r.render();
      maze.append(r.gui)
      console.log(r)
      const x = fixedPositions[i].x/100;
      const y = fixedPositions[i].y/100;
      graph[x][y]=r;
   })
   const rid =[];
   for(let i =0;i<13;i++)
   {
      rid.push('straight');
   }
   for(let i =0;i<15;i++)
   {
      rid.push('bend');
   }
   for(let i =0;i<6;i++)
   {
      rid.push('t-shape');
   }
   rid.sort((a,b)=>(Math.random()*4-2));
   console.log(rid)
   leftPiece = new room(0,0,rid.pop(),0,50)
   leftP.append(leftPiece.gui)
   console.log(rid)
   console.log(dynamicPosition)
   rid.forEach((e,i)=>{
      const r = new room(dynamicPosition[i].x,dynamicPosition[i].y,e,Math.random()*4,genId());
      r.render();
      maze.append(r.gui)
      const x= dynamicPosition[i].x/100;
      const y= dynamicPosition[i].y/100;
      graph[x][y]=r;
   })

}
initMaze();
console.log(graph)
function genId()
{
   ID++;
   return ID;
}

leftP.addEventListener('click',rotateIMG)
function rotateIMG(event)
{
   const t = event.target;
   if(!t.matches('img'))
   return;
   t.style.transform+='rotate(90deg)';
   leftPiece.beRotated();
   // console.log(leftPiece.door);
}

