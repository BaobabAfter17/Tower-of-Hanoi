const Game = require("./game");

const readline = require('readline');
const { stdin, stdout } = require('process');
reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const competionCallback = (reader) => {
    reader.question(
        "Again?",
        (res) => {
            if (res === 'yes') {
                const game = new Game();
                game.run(competionCallback);
            } else {
                console.log("Game over!")
                reader.close();
            }
        }
    )
}

const game = new Game();
game.run(competionCallback);