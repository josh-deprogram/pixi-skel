<p align="center"><img src="https://raw.githubusercontent.com/josh-deprogram/skelo/master/public/assets/images/skelo.png" width="150" style='width:30%;'>
</p>

SKELO is a 'skeleton project' to get up and running quickly with an interactive app, utilising PixiJS (v4) & React & Create-React-App. 

CRA was chosen due it being great as a base for a react project (imo). 
CRA has been ejected with WebPack modifications. Base components of the project are abractions to PixiJS features

The aim of all this to provide a super useful base for interactive canvas projects, with functionailty to easily implement multiple scenes, navs, and other useful app structure stuff packaged in a SPA container, as I have repeated recreating such a structured app on multiple occasions.


## Launch SKELO Project
Clone down files, removes git ref so new a clean project, 
and get all dependcies installed.... Make some magic

```js
git clone https://github.com/josh-deprogram/skelo && rm -rf skelo/.git
cd skelo
yarn install
yarn start
```

### FEATURES
* Scene Manager (WIP)
* Abstracted components
* Screen Utils
* GSAP
* Pixi Renderer
* CreateReactApp base - React / WebPack / HotReload / CSS Modules etc 

### TODO
* More base component elements (Fonts, Animated Sprites, Masks etc)
* Audio triggers
* Better resize handler


This is all very much WIP so it will be changing ALOT!