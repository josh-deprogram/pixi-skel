import SCREENUTIL from 'components/skelo/utils/screen';
import {TweenMax} from "gsap";
import Scene from 'components/skelo/scene';
import Font from 'components/skelo/font';
import Movieclip from 'components/skelo/movieclip'
// import Image from 'components/skelo/image';
import {FONTSTYLE} from 'config';
const SCREEN = new SCREENUTIL();

export default class SceneContainer extends Scene {
    
    started() {
        
        this.text = new Font('THIS IS \nSCENE 3', FONTSTYLE);

        this.text.x = SCREEN.centerX;
        this.text.y = SCREEN.centerY;
        this.text.anchor.set(0.5);
        this.scene.addChild(this.text);
       
        this.movie = new Movieclip('assets/data/eyes.json', 'Eyes-Surprise_', 53, 23, (sprite) => {
            this.movie = sprite;
            this.scene.addChild(this.movie);
            this.movie.play();
            this.movie.anchor.set(0.5);
            this.movie.x = SCREEN.centerX;
            this.movie.y = SCREEN.centerY;
        });

        this.scene.position.x = SCREEN.width;
        this.resume();
    }

    animate() {
        if(this.active) {
            this.text.rotation += 0.009;
            this.movie.rotation -= 0.009;
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