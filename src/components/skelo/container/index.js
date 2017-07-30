import * as PIXI from 'pixi.js';
import SCREENUTIL from 'components/skelo/utils/screen';

export default () => {
    
    const SCREEN = new SCREENUTIL();
    const container = new PIXI.Container();

    container.resize = () => {
        container.center();
    }

    container.center = () => {
        SCREEN.set();
        container.x = SCREEN.centerX;
        container.y = SCREEN.centerY;
    }

    return container;
}