import React, { Component } from "react";
import * as PIXI from 'pixi.js';

import Image from 'components/image';
import Button from 'components/button';
import {ChangeScene, Scene1, Scene2} from 'components/scenes';
import SCREENUTIL from 'utils/screen';

import "assets/style/skelo.css";

const SCREEN = new SCREENUTIL();
const SCENES = [];

export default class PixiCanvas extends Component {

	constructor(props) {
		super(props);
		this.animate = this.animate.bind(this);
		window.addEventListener('resize', this.onResize.bind(this), true);
	}

	componentDidMount() {

		//Setup PIXI Canvas in componentDidMount
		this.canvas = new PIXI.Application(SCREEN.width, SCREEN.height, {antialias: true, transparent: true, resolution: 1});
		this.refs.gameCanvas.appendChild(this.canvas.view);
		
		// create the root of the scene graph
		this.base = new PIXI.Container();
		this.scenes = new PIXI.Container();
		this.containerUI = new PIXI.Container();
		this.containerUI.width = SCREEN.width;
		this.containerUI.height = SCREEN.height;

		// Create the Scenes
		this.scene1 = new Scene1(this.scenes, 'scene1');
		this.scene2 = new Scene2(this.scenes, 'scene2');
		
		// Add scenes to the sorter Array
		SCENES.push(this.scene1, this.scene2);

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

		const navButton1 = new Button(null, null, ChangeScene.bind(this, SCENES, 'scene1', 'scene2', true));
		const navButton2 = new Button(null, null, ChangeScene.bind(this, SCENES, 'scene2', 'scene1', true));
		navButton1.anchor.set(0);
		navButton2.anchor.set(0);
		navButton2.x = 500;
		console.log(navButton1)
		// navButton1.anchor = 0;
		this.containerUI.addChild(navButton1);
		this.containerUI.addChild(navButton2);

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
		return <div className="game-canvas-container" ref="gameCanvas" />;
	}
}