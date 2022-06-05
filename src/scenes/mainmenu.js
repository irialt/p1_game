import Button from "../js/button.js";

export class MainMenu extends Phaser.Scene {

  constructor() {
    // key
    super("MainMenu");
  }

  create() {
    // menú principal
    this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "mainmenu"
      )
      .setScale(1.1);

    // Logo 
    this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY / 1.5,
      "logo"
    );

    const boton = new Button(
      this.cameras.main.centerX,
      this.cameras.main.centerY + this.cameras.main.centerY / 3,
      "Jugar",
      this,
      () => {
        this.scene.start("nivel1");
      }

    );

  }

}
