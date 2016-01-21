///<reference path="game2048.ts"/>
///<reference path="renderer-pixi.ts"/>

(() => {
    var game = new Game2048(4);
    var render = new PixiGameRenderer(document, game);
    game.OnTilesUpdate.RegisterObserver(render);

    Mousetrap.bind('up', function() {
        game.ProcessInputAction(MoveDirection.Up);
    });

    Mousetrap.bind('down', function() {
        game.ProcessInputAction(MoveDirection.Down);
    });

    Mousetrap.bind('left', function() {
        game.ProcessInputAction(MoveDirection.Left);
    });

    Mousetrap.bind('right', function() {
        game.ProcessInputAction(MoveDirection.Right);
    });
})();