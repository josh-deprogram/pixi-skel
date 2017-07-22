import * as PIXI from 'pixi.js';

export default () => {
    const bar = new PIXI.Graphics();

    bar.beginFill(0x00ff87);
    bar.lineStyle(0, 0xffd900, 0);

    bar.drawRect(-50, -5, 100, 10);
    bar.rotationSet = Math.random() * 0.03;
    bar.endFill();

    return bar;
}