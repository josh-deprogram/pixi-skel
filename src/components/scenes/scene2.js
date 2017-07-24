import * as PIXI from 'pixi.js';
import Image from 'components/image';
import SCREENUTIL from 'utils/screen';
import Scene from './scene';

const SCREEN = new SCREENUTIL();

export default class SceneContainer extends Scene {
  
    constructor(container, name) {
        super(container, name);
    }

    
    started() {
        this.image = new Image('assets/images/title.png', true);
        this.image.x = SCREEN.centerX;
        this.image.y = SCREEN.centerY;
        this.scene.addChild(this.image);
    }

    animate() {
        if(this.active) {
            this.image.rotation += 0.09;
        }
    }

    hide(){
        this.scene.alpha = 0;
    }

    resume(){
        this.scene.alpha = 1;
    }

    resize() {
        SCREEN.set();
    }
    
}