const roomTypes = {
  bend: [true, true, false, false],
  straight: [false, true, false, true],
  "t-shape": [true, true, false, true],
};
class room {
  constructor(type, num, id,treasure) {
    this.type = type;
    this.id = id;
    this.treasure=treasure;
    this.door = Array.from(roomTypes[this.type]);
    // console.log(Math.round(num))
    this.num = Math.floor(num);
    this.ang = 0;
    for (let i = 0; i < this.num; i++) {
      // console.log(this.door)
      this.ang += 90;
      this.ang %= 360;
      let d = this.door.pop();
      this.door.unshift(d);
      // console.log(this.door)
    }
  }
  beRotated() {
    const d = this.door.pop();
    this.door.unshift(d);
  }
  beCapture(){
      this.treasure=undefined;
      const p = document.getElementById(this.id);
      p.innerText=undefined;
  }
}
class player {
    constructor(items,id,color,startId){
        this.items=items;
        this.id=id; // id of the player element;
        this.color=color;
        this.startId=startId; // id of the starting room
        this.curId = startId; // id of the current room
    }
    genPlayer()
    {
        const p = document.createElement('div')
        p.style.backgroundColor=this.color;
        p.id=this.id;
        p.classList.add('player');
    }
    getStandingRoom()
    {
        return document.getElementById(this.curId);
    }
    getPlayer()
    {
        return document.getElementById(this.id);
    }
}
export { room ,player};
