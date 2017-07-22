import * as PIXI from 'pixi.js';
import Image from 'components/image';
// import SCREENUTIL from 'utils/screen';
// const SCREEN = new SCREENUTIL();

export default function(container, name) {
    
    this.scene = new PIXI.Container();
    this.started = false;
    this.active = false;
    this.name = '';

    this.init = () => {
        this.name = name;
        console.log('scene ' + this.name + ' init');

        container.addChild(this.scene);
    }
    
    this.start = () => {
        console.log('scene ' + this.name + ' start');
        this.active = true;

        if(this.started) {
            this.resume();
        } else {        
            this.started = true;
            this.image = new Image('assets/images/head.png', true);
            this.scene.addChild(this.image);
        }
    }

    this.pause = () => {
        console.log('scene ' + this.name + ' pause');
        this.active = false;
    }

    this.resume = () => {
        console.log('scene ' + this.name + ' resume');
        this.active = true;
    }

    this.remove = () => {
        console.log('scene ' + this.name + ' remove');
        this.active = false;
        this.started = false;
        container.removeChild(this.scene);
    }

    this.animate = () => {
        if(this.active) {
            // console.log('scene ' + this.name + ' ticker');
            this.image.rotation += 0.05;
        }
    }

    this.resize = () => {

    }
    
    return this; 
}