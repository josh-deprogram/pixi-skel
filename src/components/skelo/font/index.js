import * as PIXI from 'pixi.js';

export default (text, style) => {
    
    const customText = new PIXI.Text(text, style);

    return customText;
}