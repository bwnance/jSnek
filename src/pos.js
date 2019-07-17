class Pos{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    eq(pos){
        return (pos.x === this.x && pos.y === this.y)
    }
    plus(pos){
        return new Pos(pos.x+self.x, pos.y+self.y);
    }
    plusArr(arr){
        return new Pos(this.x + arr[0], this.y+arr[1]);
    }
    clone(){
        return new Pos(this.x, this.y);
    }
}

module.exports = Pos;