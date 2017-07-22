import React, { Component } from "react";
import {TweenMax} from "gsap";
import * as PIXI from 'pixi.js';

import Image from 'components/image';
import Button from 'components/button';
import {ChangeScene, Scene1, Scene2} from 'components/scenes';
import SCREENUTIL from 'utils/screen';

import "assets/style/skelo.css";

const PARTICLES = 500;
const SCREEN = new SCREENUTIL();
const SCENES = [];

export default class PixiCanvas extends Component {

	constructor(props) {
		super(props);

		this.animate = this.animate.bind(this);
		this.createShapes = this.createShapes.bind(this);
		this.skullContainer = [];

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

		// Add the Scenes
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
		this.title.y = SCREEN.height - 200;
		this.containerUI.addChild(this.title);

		const textures = {
			default: 'assets/images/button.jpg',
			over: 'assets/images/button_over.jpg',
			down: 'assets/images/button_down.jpg'
		}
		
		this.button = new Button(textures, null, this.createShapes);
		this.button.x = SCREEN.width - 200;
		this.button.y = SCREEN.centerY;

		const navButton1 = new Button(textures, null, ChangeScene.bind(this, SCENES, 'scene1', 'scene2'));
		const navButton2 = new Button(textures, null, ChangeScene.bind(this, SCENES, 'scene2', 'scene1'));
		navButton2.x = 530;
		this.containerUI.addChild(navButton1);
		this.containerUI.addChild(navButton2);

		this.containerUI.addChild(this.button);

		// Add the UI
		this.canvas.stage.addChild(this.base);
		this.canvas.stage.addChild(this.scenes);
		this.canvas.stage.addChild(this.containerUI);

		// start the ticker
		this.canvas.ticker.add((delta) => this.animate(delta))
	}

	createShapes() {
		for (let i = 0; i < PARTICLES; i++) {
			const skull = new Image('assets/images/skull.png', true);
			const scale =  Math.random() * 0.4 + 0.1;
			skull.x = Math.random() * SCREEN.width;
			skull.y = Math.random() * SCREEN.height;
			skull.rotationSet = Math.random() * 0.04 + 0.02;
			this.skullContainer.push(skull);
			this.base.addChild(skull);
			TweenMax.fromTo(skull.scale, .8, {x:0, y:0}, { x: scale, y: scale, ease: TweenMax.Bounce.easeOut, delay: 0.006 * i})
		}
	}

	rotateBar(delta) {
		for (let i = 0; i < this.skullContainer.length; i++) {
			this.skullContainer[i].rotation += this.skullContainer[i].rotationSet * delta;
		}
	}

	animate(delta) {

		const time = Date.now() * 0.005;
		this.title.scale.x = Math.sin( time * 0.3 ) * 0.3 + 0.7;
		this.title.scale.y = Math.cos( time * 0.3 ) * 0.2 + 0.7;
		this.rotateBar(delta);

		for (let i = 0; i < SCENES.length; i++) {
			SCENES[i].animate();
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