import SCREENUTIL from 'components/skelo/utils/screen';
import {TweenMax} from "gsap";
import Scene from 'components/skelo/scene';
import Font from 'components/skelo/font';
import {FONTSTYLE} from 'config';
const SCREEN = new SCREENUTIL();

export default class SceneContainer extends Scene {
    
    started() {
        this.centerAnchor();

        this.text = new Font('THIS IS \nSCENE 2', FONTSTYLE);

        this.text.x = SCREEN.centerX;
        this.text.y = SCREEN.centerY;
        this.text.anchor.set(0.5);
        this.scene.addChild(this.text);

        TweenMax.set(this.scene.scale, {x:0, y:0});
        this.resume();
    }

    animate() {
        if(this.active) {
            this.text.rotation -= 0.009;
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