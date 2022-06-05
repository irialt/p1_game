var player;
var burger;
var coke;
var bombs;
var cursors;
var score;
var gameOver;
var scoreText;
var scoreTime;
var scoreTimeText;
var timedEvent;

export class nivel2 extends Phaser.Scene {
    
    constructor() {
      super("nivel2");
      
    }

    preload() {
        this.load.tilemapTiledJSON("map", "public/assets/tilemaps/nivel1.json");
        this.load.image("fondo", "public/assets/images/sky.png");
        this.load.image(
          "platform",
          "public/assets/images/plataformas/atlas_plataformas.png"
        );
    }

  create() {

    score = 0
    scoreTime = 120

    timedEvent = this.time.addEvent({ 
      delay: 1000, 
      callback: this.onSecond, 
      callbackScope: this, 
      loop: true 
    });

    const map = this.make.tilemap({ key: "map" });

    const tilesetBelow = map.addTilesetImage("sky_atlas", "fondo");
    const tilesetPlatform = map.addTilesetImage(
      "atlas_plataformas",
      "platform"
    );

    const belowLayer = map.createLayer("fondo", tilesetBelow, 0, 0);
    const worldLayer = map.createLayer("plataformas", tilesetPlatform, 0, 0);
    const objectsLayer = map.getObjectLayer("objetos");

    worldLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = map.findObject("objetos", (obj) => obj.name === "dude");

    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");

    player.setBounce(0.5);
    player.setCollideWorldBounds(true);

    if ((cursors = !undefined)) {
      cursors = this.input.keyboard.createCursorKeys();
    }

    burger = this.physics.add.group();
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (type) {
        case "burger": {
          var star = burger.create(x, y, "burger");
          star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
          break;
        }
      }
    });

    coke = this.physics.add.group();
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (type) {
        case "coke": {
          var star = coke.create(x, y, "coke");
          star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
          break;
        }
      }
    });


    bombs = this.physics.add.group();
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (type) {
        case "bomb": {
          var bomb = bombs.create(x, 16, "bomb");
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
          bomb.allowGravity = false;
        }
      }
    });

    scoreText = this.add.text(30, 6, "Score: 0", {
        fontSize: "32px",
        fill: "#FFFFFF",
    });

    this.physics.add.collider(player, worldLayer);

    this.physics.add.collider(burger, worldLayer);
    this.physics.add.collider(bombs, worldLayer);

    this.physics.add.overlap(player, burger, this.collectburger, null, this);

    this.physics.add.collider(player, bombs, this.hitBomb, null, this);

    gameOver = false;
}

update() {

    if (burger.countActive(true) === 0) {
     this.scene.start("nivel3", { score: score, scoreTime : scoreTime });
    }

    if (gameOver) {
        return;
      }
  
      if (cursors.left.isDown) {
        player.setVelocityX(-160);
  
        player.anims.play("left", true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);
  
        player.anims.play("right", true);
      } else {
        player.setVelocityX(0);
  
        player.anims.play("turn");
      }
  
      if (cursors.up.isDown && player.body.blocked.down) {
        player.setVelocityY(-330);
      }
    }

    collectburger(player, burger) {
        burger.disableBody(true, true);
        score += 10;
        scoreText.setText("Score: " + score);
   }

   hitBomb(player, bombs) {
        this.physics.pause();
    
        player.setTint(0xff0000);
    
        player.anims.play("turn");
    
        gameOver = true;
    
        setTimeout(() => {
          this.scene.start("retry", { score: score });
        }, 1000);
    }

}
