"user strict"

const Sprite = function(ctx) {
    const sprite = {};
    sprite.color;
    
    sprite.height;
    sprite.width;
    
    sprite.pos_x;
    sprite.pos_y;
    
    sprite.left   = {"key": 65, "action": false};
    sprite.right  = {"key": 68, "action": false};
    sprite.down   = {"key": 83, "action": false};
    sprite.up     = {"key": 87, "action": false};
    sprite.speed  = 6;
    
    sprite.update = function() {
        if (sprite.right.action) { console.log("move right"); sprite.pos_x += sprite.speed };
        if (sprite.left.action) { console.log("move left"); sprite.pos_x -= sprite.speed };
        if (sprite.down.action) { console.log("move down"); sprite.pos_y += sprite.speed };
        if (sprite.up.action) { console.log("move up"); sprite.pos_y -= sprite.speed };

        ctx.fillStyle = sprite.color;
        ctx.fillRect(sprite.pos_x, sprite.pos_y, sprite.width, sprite.height);
    };

    return sprite;
}

const Player = function(screen) {
    const player = {};
    player.sprite = new Sprite(screen.ctx);
    player.sprite.color = "red";
    player.sprite.height = 50;
    player.sprite.width = 50;

    player.sprite.pos_x = screen.width / 2  - player.sprite.width / 2;
    player.sprite.pos_y = screen.height / 2 - player.sprite.height / 2;

    addEventListener("keydown", (key) => { player.movement(key.keyCode, true); });
    addEventListener("keyup", (key) => { player.movement(key.keyCode, false); });

    player.movement = function(key, value) {
        if (key == player.sprite.right.key) { player.sprite.right.action = value};
        if (key == player.sprite.left.key) { player.sprite.left.action = value};
        if (key == player.sprite.down.key) { player.sprite.down.action = value};
        if (key == player.sprite.up.key) { player.sprite.up.action = value};
    };

    return player;
};

const Game = function() {
    const screen = {};
    screen.canvas = document.querySelector(".screen");
    screen.ctx = screen.canvas.getContext("2d");
    screen.height = screen.canvas.height = 600;
    screen.width = screen.canvas.width = 1000;

    const player = new Player(screen);

    const update = function() {
        screen.ctx.clearRect(0, 0, screen.width, screen.height)

        player.sprite.update();


        window.requestAnimationFrame(update);
    };
    window.requestAnimationFrame(update);
};


window.onload = new Game();