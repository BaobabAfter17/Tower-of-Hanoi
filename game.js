
function Game() {
    this.towers = [ [3, 2, 1], [], [] ];
}

Game.prototype.promtMove = function(callbackAfterReceivingPromt) {
    this.print();
    reader.question(
        "Which disc you want move FROM?",
        (res) => {
            let startTowerIndex = parseInt(res);
            reader.question(
                "Which dis you want move TO?",
                (res) => {
                    let endTowerIndex = parseInt(res);
                    callbackAfterReceivingPromt(startTowerIndex, endTowerIndex);
                }
            )
        }
    );
}

Game.prototype.isValidMove = function(startTowerIndex, endTowerIndex) {
    let startTowerLength = this.towers[startTowerIndex].length;
    let endTowerLength = this.towers[endTowerIndex].length;
    if (startTowerLength === 0) {
        return false;
    } else if (endTowerLength === 0) {
        return true;
    } else {
        if (this.towers[startTowerIndex][startTowerLength - 1]
            < this.towers[endTowerIndex][endTowerLength - 1]) {
            return true;
        } else {
            return false;
        }
    }
}

Game.prototype.move = function(startTowerIndex, endTowerIndex) {
    if (this.isValidMove(startTowerIndex, endTowerIndex)) {
        this.towers[endTowerIndex].push(
            this.towers[startTowerIndex].pop()
        );
        return true;
    } else {
        return false;
    }
}

Game.prototype.print = function() {
    console.log(this.towers);
}

Game.prototype.isWon = function() {
    return this.towers[0].length === 0
        && (this.towers[1].length === 0
            || this.towers[2].length === 0);
}

Game.prototype.run = function(completionCallback) {
    this.promtMove((startTowerIndex, endTowerIndex) => {
        let moved = this.move(startTowerIndex, endTowerIndex);
        if (!moved) {
            console.log("Move unsuccessful!")
        }
        if (this.isWon()) {
            this.print();
            console.log("You won!");
            completionCallback(reader);
        } else {
            this.run(completionCallback);
        }
    });
}

module.exports = Game;
