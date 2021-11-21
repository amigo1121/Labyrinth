const roomTypes = {
  bend: [true, true, false, false],
  straight: [false, true, false, true],
  "t-shape": [true, true, false, true],
};
class room {
  constructor(type, num, id) {
    this.type = type;
    this.id = id;
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
}
export { room };
