import Image from 'components/skelo/image';
import SCREENUTIL from 'utils/screen';
import {TweenMax} from "gsap";
import Scene from 'components/skelo/scene';

const SCREEN = new SCREENUTIL();

export default class SceneContainer extends Scene {
    
    started() {
        this.centerAnchor();
        this.image = new Image('assets/images/title.png', true);
        this.image.x = SCREEN.centerX;
        this.image.y = SCREEN.centerY;
        this.scene.addChild(this.image);

        TweenMax.set(this.scene.scale, {x:0, y:0});
        this.resume();
    }

    animate() {
        if(this.active) {
            this.image.rotation += 0.09;
        }
    }

    hide(){
        // this.scene.alpha = 0;
        TweenMax.to(this.scene.scale, .4, {x:0, y:0});
    }

    resume(){
        TweenMax.to(this.scene.scale, .4, {x:1, y:1});
    }

    resize() {
        SCREEN.set();
    }
    
}