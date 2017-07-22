import * as PIXI from 'pixi.js';
import Image from 'components/image';
import SCREENUTIL from 'utils/screen';

const SCREEN = new SCREENUTIL();

export default class Scene {
  
    constructor(container, name) {
        this.container = container;
        this.name = name;
        this.scene = new PIXI.Container();
        this.started = false;
        this.active = false;

        this.init();
    }

    init() {
        console.log('scene ' + this.name + ' init');
        this.container.addChild(this.scene);
    }   
    
    start() {
        console.log('scene ' + this.name + ' start');
        this.active = true;

        if(this.started) {
            this.resume();
        } else {        
            this.started = true;
            this.image = new Image('assets/images/title.png', true);
            this.image.x = SCREEN.centerX;
            this.image.y = SCREEN.centerY;
            this.scene.addChild(this.image);
        }
    }

    pause() {
        console.log('scene ' + this.name + ' pause');
        this.active = false;
    }

    hide() {

    }
    
    resume() {
        console.log('scene ' + this.name + ' resume');
        this.active = true;
    }

    remove() {
        console.log('scene ' + this.name + ' remove');
        this.active = false;
        this.started = false;
        this.container.removeChild(this.scene);
    }

    animate() {
        if(this.active) {
            this.image.rotation += 0.09;
        }
    }

    resize() {
        SCREEN.set();
    }
    
}