import React, { Component } from "react";
import * as PIXI from 'pixi.js';

import Image from 'components/skelo/image';
import Button from 'components/skelo/button';
import Container from 'components/skelo/container';
import { Scene1, Scene2, Scene3 } from 'components/scenes';
import { ChangeScene } from 'components/skelo/scene/utils'
import SCREENUTIL from 'components/skelo/utils/screen';

import "assets/style/skelo.css";

const SCREEN = new SCREENUTIL();
const SCENES = []; // Collection containing all App Scene

export default class PixiCanvas extends Component {

	constructor(props) {
		super(props);
		this.animate = this.animate.bind(this);
		window.addEventListener('resize', this.onResize.bind(this), true);
	}

	componentDidMount() {

		//Setup PIXI Canvas in componentDidMount
		this.canvas = new PIXI.Application(SCREEN.width, SCREEN.height, {antialias: true, transparent: true, resolution: 1, autoResize:true});
		this.appCanvas.appendChild(this.canvas.view);
		this.canvasDom = this.appCanvas.getElementsByTagName('canvas')[0];
		
		// create the root of the scene graph
		this.base = new Container();
		this.scenes = new Container();
		this.containerUI = new Container();
		this.containerUI.width = SCREEN.width;
		this.containerUI.height = SCREEN.height;

		// Create the Scenes
		this.scene1 = new Scene1(this.scenes, 'scene1', SCENES);
		this.scene2 = new Scene2(this.scenes, 'scene2', SCENES);
		this.scene3 = new Scene3(this.scenes, 'scene3', SCENES);
		
		// Add scenes to the sorter Array
		SCENES.push(this.scene1, this.scene2, this.scene3);

		// Switch Scene
		ChangeScene(SCENES, 'scene1');

		// Create sprite
		this.image = new Image('assets/images/title-bg.jpg', true);
		this.image.x = SCREEN.centerX;
		this.image.y = SCREEN.centerY;
		this.image.width = SCREEN.width;
		this.image.height = SCREEN.height;
		this.base.addChild(this.image);

		this.title = new Image('assets/images/title.png', true);
		this.title.x = SCREEN.centerX;
		this.title.y = SCREEN.height - 100;
		this.containerUI.addChild(this.title);

		// Create the Nav menu
		this.setupNav();
		
		// Add the UI
		this.canvas.stage.addChild(this.base);
		this.canvas.stage.addChild(this.scenes);
		this.canvas.stage.addChild(this.containerUI);

		// start the ticker
		this.canvas.ticker.add((delta) => this.animate(delta))
	}

	setupNav() {
		const buttonW = (SCREEN.width / 3) - 10;
		if(!this.navUI) {
			this.navUI = new Container();
			this.navUI.navButton1 = new Button(null, null, ChangeScene.bind(this, SCENES, 'scene1'));
			this.navUI.navButton2 = new Button(null, null, ChangeScene.bind(this, SCENES, 'scene2'));
			this.navUI.navButton3 = new Button(null, null, ChangeScene.bind(this, SCENES, 'scene3'));

			this.navUI.navButton1.anchor.set(0);
			this.navUI.navButton2.anchor.set(0);
			this.navUI.navButton3.anchor.set(0);
			
			this.navUI.y = 120;

			this.navUI.addChild(this.navUI.navButton1);
			this.navUI.addChild(this.navUI.navButton2);
			this.navUI.addChild(this.navUI.navButton3);
			this.containerUI.addChild(this.navUI);
		}

		this.navUI.navButton1.width = this.navUI.navButton2.width = this.navUI.navButton3.width = buttonW;
		this.navUI.navButton1.height = this.navUI.navButton2.height = this.navUI.navButton3.height = 60;
		this.navUI.navButton2.x = buttonW + 15;
		this.navUI.navButton3.x = (buttonW * 2) + 30;
	}

	animate(delta) {

		const time = Date.now() * 0.005;
		this.title.scale.x = Math.sin( time * 0.3 ) * 0.3 + 0.7;
		this.title.scale.y = Math.cos( time * 0.3 ) * 0.2 + 0.7;

		for (let i = 0; i < SCENES.length; i++) {
			SCENES[i].animate(delta);
		}
	}

	// On Window Resize.
	onResize() {
		SCREEN.set();
		for (let i = 0; i < SCENES.length; i++) {
			SCENES[i].resize();
		}

		this.containerUI.center();

		this.title.x = SCREEN.centerX;
		this.title.y = SCREEN.height - 100;
		this.containerUI.pivot.set(SCREEN.centerX, SCREEN.centerY);

		this.image.width = SCREEN.width;
		this.image.height = SCREEN.height;
		this.image.x = SCREEN.centerX;
		this.image.y = SCREEN.centerY;

		this.setupNav();

		this.canvas.renderer.resize(SCREEN.width, SCREEN.height)
	}

	render() {
		return <div className="app-canvas-container" ref={ (ref) => this.appCanvas = ref } />;
	}
}