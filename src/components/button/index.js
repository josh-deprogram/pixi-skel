import * as PIXI from 'pixi.js';

export default (textures, container, onTap, onHover, onOut) => {
    
    // create the textures
    const textureButton = PIXI.Texture.fromImage(textures.default);
    const textureButtonDown = PIXI.Texture.fromImage(textures.down);
    const textureButtonOver = PIXI.Texture.fromImage(textures.over);

    const button = new PIXI.Sprite(textureButton);
    button.buttonMode = true;
    button.anchor.set(0.5);
    button.interactive = true;

    button
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);

    
    function onButtonDown() {
        this.isdown = true;
        this.texture = textureButtonDown;
        this.alpha = 1;

        if (onTap) onTap();
    }

    function onButtonUp() {
        this.isdown = false;
        if (this.isOver) {
            this.texture = textureButtonOver;
        }
        else {
            this.texture = textureButton;
        }
    }

    function onButtonOver() {
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        this.texture = textureButtonOver;

        if (onHover) onHover();
    }

    function onButtonOut() {
        this.isOver = false;
        if (this.isdown) {
            return;
        }
        this.texture = textureButton;

        if (onOut) onOut();
    }

    return button;
}