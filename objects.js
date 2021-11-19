const roomTypes = {
    'bend': [true, true, false, false],
    'straight': [false, true, false, true],
    't-shape': [true, true, false, true]
}
class room {
    constructor(x, y, type, num ,id) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.id=id;
        this.door = roomTypes[this.type];
        this.gui = document.createElement('img');
        this.gui.src = `./img/${this.type}.png`
        this.gui.id=id;
        this.gui.classList.add('room');
        // console.log(Math.round(num))
        this.num=Math.floor(num);
        this.rotate(this.num);
    }

    rotate(num) {
        let ang = 0;
        for (let i = 0; i < num; i++) {
            ang += 90;
            const d = this.door.pop();
            this.door.unshift(d);
        }
        this.gui.style.transform += `rotate(${ang}deg)`;
    }

    render() {
        this.gui.style.top = `${this.x}px`;
        this.gui.style.left = `${this.y}px`;
    }

    beRotated()
    {
        const d = this.door.pop();
        this.door.unshift(d);
    }
    
}
export { room }