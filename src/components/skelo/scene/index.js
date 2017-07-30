import * as PIXI from 'pixi.js';
import SCREENUTIL from 'components/skelo/utils/screen';
export default class Scene {
  
    constructor(container, name, allscenes) {
        this.container = container;
        this.name = name;
        this.allscenes = allscenes;
        this.scene = new PIXI.Container();
        this.active = false;
        this.playing = false;
        this.init();
    }

    init() {
        // console.log('scene ' + this.name + ' init');
        this.container.addChild(this.scene);
    }   
    
    start() {
        // console.log('scene ' + this.name + ' start');

        if(this.playing) {
            this.resume();
        } else {        
            this.playing = true;
            this.started();
        }
        
        this.active = true;
    }

    started() {

    }

    pause() {
        // console.log('scene ' + this.name + ' pause');
        this.active = false;
    }

    hide() {
        
    }

    resume() {
        // console.log('scene ' + this.name + ' resume');
        this.active = true;
    }

    remove() {
        // console.log('scene ' + this.name + ' remove');
        this.active = false;
        this.playing = false;
        this.container.removeChild(this.scene);
    }

    centerAnchor() {
        const SCREEN = new SCREENUTIL();
        this.scene.pivot.x = SCREEN.centerX;
        this.scene.pivot.y = SCREEN.centerY;
        this.scene.x = SCREEN.centerX;
        this.scene.y = SCREEN.centerY;
    }

    animate(delta) {
        if(this.active) {
        }
    }

    resize() {
        this.centerAnchor();
        // console.log('center scene;')
    }  
    
}