import React, { Component } from "react";
import * as PIXI from 'pixi.js';

import Image from 'components/skelo/image';
import Button from 'components/skelo/button';
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
		this.canvas = new PIXI.Application(SCREEN.width, SCREEN.height, {antialias: true, transparent: true, resolution: 1});
		this.appCanvas.appendChild(this.canvas.view);
		
		// create the root of the scene graph
		this.base = new PIXI.Container();
		this.scenes = new PIXI.Container();
		this.containerUI = new PIXI.Container();
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
		const navUI = new PIXI.Container();
		const buttonW = (SCREEN.width / 3) - 10;
		const navButton1 = new Button(null, null, ChangeScene.bind(this, SCENES, 'scene1'));
		const navButton2 = new Button(null, null, ChangeScene.bind(this, SCENES, 'scene2'));
		const navButton3 = new Button(null, null, ChangeScene.bind(this, SCENES, 'scene3'));

		navButton1.anchor.set(0);
		navButton2.anchor.set(0);
		navButton3.anchor.set(0);
		navButton1.width = navButton2.width = navButton3.width = buttonW;
		navButton1.height = navButton2.height = navButton3.height = 60;
		navButton2.x = buttonW + 15;
		navButton3.x = (buttonW * 2) + 30;
		navUI.y = 120;

		navUI.addChild(navButton1);
		navUI.addChild(navButton2);
		navUI.addChild(navButton3);
		this.containerUI.addChild(navUI);
		
		// Add the UI
		this.canvas.stage.addChild(this.base);
		this.canvas.stage.addChild(this.scenes);
		this.canvas.stage.addChild(this.containerUI);

		// start the ticker
		this.canvas.ticker.add((delta) => this.animate(delta))
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

		this.canvas.width = SCREEN.width;
		this.canvas.height = SCREEN.height;
	}

	render() {
		return <div className="app-canvas-container" ref={ (ref) => this.appCanvas = ref } />;
	}
}