const roomTypes = {
    'bend': [true, true, false, false],
    'straight': [false, true, false, true],
    't-shape': [true, true, false, true]
}
class room {
    constructor(type, num, id) {
        this.type = type;
        this.id = id;
        this.door = roomTypes[this.type];
        // console.log(Math.round(num))
        this.num = Math.floor(num);
        this.rotate(this.num);
    }

    rotate(num) {
        let ang = 0;
        for (let i = 0; i < num; i++) {
            ang += 90;
            const d = this.door.pop();
            this.door.unshift(d);
            ang %= 360;
        }
        this.ang = ang;
    }

    render() {
        this.gui.style.top = `${this.x}px`;
        this.gui.style.left = `${this.y}px`;
    }

    beRotated() {
        const d = this.door.pop();
        this.door.unshift(d);
    }

}
export { room }