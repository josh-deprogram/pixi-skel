import * as PIXI from 'pixi.js';

export default (texture, center, container) => {
    const image = PIXI.Sprite.fromImage(texture)
    
    if (center) image.anchor.set(0.5);

    // Add to stage, if provided
    if (container) {
      container.addChild(image);
      return null
    } else {
      return image; 
    }
}