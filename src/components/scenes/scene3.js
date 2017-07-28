import Image from 'components/skelo/image';
import SCREENUTIL from 'utils/screen';
import {TweenMax} from "gsap";
import Scene from 'components/skelo/scene';

const SCREEN = new SCREENUTIL();

export default class SceneContainer extends Scene {
    
    started() {
        this.image = new Image('assets/images/skelo.png', true);
        this.image.x = SCREEN.centerX;
        this.image.y = SCREEN.centerY;
        this.scene.addChild(this.image);

        this.scene.position.x = SCREEN.width;
        this.resume();
    }

    animate() {
        if(this.active) {
            this.image.rotation += 0.009;
        }
    }

    hide(){
        TweenMax.to(this.scene.position, .4, {x:SCREEN.width});
    }

    resume(){
        this.scene.alpha = 1;
        TweenMax.to(this.scene.position, 1, {x:0});
    }

    resize() {
        SCREEN.set();
    }
    
}