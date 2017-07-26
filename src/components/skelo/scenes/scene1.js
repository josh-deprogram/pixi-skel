import * as PIXI from 'pixi.js';
import Image from 'components/skelo/image';
import SCREENUTIL from 'utils/screen';
import {TweenMax} from "gsap";
import Scene from './scene';

const SCREEN = new SCREENUTIL();

export default class SceneContainer extends Scene {
  
    constructor(container, name) {
        super(container, name);

        this.base = new PIXI.Container();
        this.ui = new PIXI.Container();

        this.createShapes = this.createShapes.bind(this);
        this.skullContainer = [];

        // Visual fx props
        this.blurFilter = new PIXI.filters.BlurFilter();
        this.particles = 200;
    }
    
    started() {    
        // Add containers to Scene
        this.scene.addChild(this.base);
        this.scene.addChild(this.ui);
        this.scene.pivot.x = SCREEN.centerX;
        this.scene.pivot.y = SCREEN.centerY;
        this.scene.x = SCREEN.centerX;
        this.scene.y = SCREEN.centerY;
        this.image = new Image('assets/images/skull.png', true);
        this.image.x = SCREEN.centerX;
        this.image.y = SCREEN.centerY;
        this.ui.addChild(this.image);
        this.createShapes();
    }

    animate(delta) {
        if(this.active) {
            this.image.rotation += 0.09;
            this.rotateSkulls(delta);
        }
    }

    hide(){
        TweenMax.to(this.blurFilter, .8, {blur:10});
        TweenMax.to(this.scene.scale, .8, {x:2, y:2});
        this.scene.filters = [this.blurFilter];
    }

    resume(){ 
        TweenMax.to(this.blurFilter, 0.2, {blur:0, overwrite:true});
        this.scene.filters = [this.blurFilter];
        TweenMax.to(this.scene.scale, .2, {x:1, y:1});
    }

    resize() {
        SCREEN.set();
    }
    
    // Generic Scene methods..

    createShapes() {
		for (let i = 0; i < this.particles; i++) {
			const skull = new Image('assets/images/skull.png', true);
			const scale =  Math.random() * 0.4 + 0.1;
			skull.x = Math.random() * SCREEN.width;
			skull.y = Math.random() * SCREEN.height;
			skull.rotationSet = Math.random() * 0.04 + 0.02;
			this.skullContainer.push(skull);
			this.base.addChild(skull);
			TweenMax.fromTo(skull.scale, .8, {x:0, y:0}, { x: scale, y: scale, ease: TweenMax.Bounce.easeOut, delay: 0.003 * i})
		}
    }
    
    rotateSkulls(delta) {
		for (let i = 0; i < this.skullContainer.length; i++) {
			this.skullContainer[i].rotation += this.skullContainer[i].rotationSet * delta;
		}
	}
}