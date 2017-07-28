import * as PIXI from 'pixi.js';

export default (spriteData, spriteName, frames, offset, loaded, fileExt) => {

    PIXI.loader
        .add('spritesheet', spriteData) // Sprite Json to load
        .load(onAssetsLoaded);

    function onAssetsLoaded(res) {

        // create an array to store the textures
        const spriteTextures = [];
        let i;
        let fileType = '.png';
        if(fileExt) fileType = fileExt;

        for (i = offset || 0; i < frames; i++) {
            const texture = PIXI.Texture.fromFrame(spriteName + (i+1) + fileType);
            spriteTextures.push(texture);
        }

        // create AnimatedSprite
        const sprite = new PIXI.extras.AnimatedSprite(spriteTextures);
        sprite.loaded = true;

        loaded(sprite);

        return null;
    }

}

// ___________ example useage
/*
this.movie = new Movieclip('assets/data/eyes.json', 'Eyes-Surprise_', 53, 23, (sprite) => {
    this.movie = sprite;
    this.scene.addChild(this.movie);
    this.movie.play();
    this.movie.anchor.set(0.5);
    this.movie.x = SCREEN.centerX;
    this.movie.y = SCREEN.centerY;
});
*/