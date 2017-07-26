import * as PIXI from 'pixi.js';

export default class Scene {
  
    constructor(container, name) {
        this.container = container;
        this.name = name;
        this.scene = new PIXI.Container();
        this.active = false;
        this.playing = false;
        this.init();
    }

    init() {
        console.log('scene ' + this.name + ' init');
        this.container.addChild(this.scene);
    }   
    
    start() {
        console.log('scene ' + this.name + ' start');

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
        this.playing = false;
        this.container.removeChild(this.scene);
    }

    animate(delta) {
        if(this.active) {
            console.log('scene ' + this.name + ' ticker');
        }
    }

    resize() {

    }
    
}