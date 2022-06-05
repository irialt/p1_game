export class Preloads extends Phaser.Scene {
  constructor() {
    // key
    super("Preloads");
  }

  preload() {
    this.load.image("logo", "public/assets/images/logo.png");
    this.load.image("mainmenu", "public/assets/images/mainmenu.png");
    this.load.image("sky", "public/assets/images/sky.png");
    this.load.image("bomb", "public/assets/images/bomb.png");
    this.load.image("burger", "public/assets/images/burger.png");
    this.load.image("coke", "public/assets/images/coke.png");
    this.load.image("victory", "public/assets/images/victory.png");
    this.load.image("victoryfondo", "public/assets/images/victoryfondo.png");
    this.load.image("gameover", "public/assets/images/gameover.png");
    this.load.image("gameoverfondo", "public/assets/images/gameoverfondo.png");
    this.load.spritesheet("dude", "public/assets/images/dude2.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start("MainMenu");
  }
}
