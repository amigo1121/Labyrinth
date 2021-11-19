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

function genImg(r,x,y)
{
   const img = document.createElement('img');
   img.src=`./img/${r.type}.png`
   img.id = r.id;
   img.classList.add('room');
   img.style.transform+=`rotate(${r.ang}deg)`;
   img.style.top=`${x}px`;
   img.style.left=`${y}px`;
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
      const r = new room( e[0], e[1],genId());
      maze.append(genImg(r,xPos,yPos))
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
   leftPiece = new room(rid.pop(),0,50)
   leftP.append(genImg(leftPiece,0,0));
   console.log(rid)
   console.log(dynamicPosition)
   rid.forEach((e,i)=>{
      const xPos = dynamicPosition[i].x;
      const yPos =dynamicPosition[i].y;
      const r = new room(e,Math.random()*4,genId());
      maze.append(genImg(r,xPos,yPos))
      const x= xPos/100;
      const y= yPos/100;
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
// get ids from an row


