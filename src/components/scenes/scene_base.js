import * as PIXI from 'pixi.js';

export default function(container) {
    
    this.scene = new PIXI.Container();
    this.active = false;
    this.started = false;
    this.name = '';

    this.init = () => {
        console.log('scene ' + this.name + ' init');
    }
    
    this.start = () => {
        console.log('scene ' + this.name + ' start');
    }

    this.pause = () => {
        console.log('scene ' + this.name + ' pause');
    }

    this.resume = () => {
        console.log('scene ' + this.name + ' resume');
    }

    this.remove = () => {
        console.log('scene ' + this.name + ' remove');
    }

    this.animate = () => {
        console.log('scene ' + this.name + ' ticker');
    }
    
    this.resize = () =>{
        
    }

    return this; 
}