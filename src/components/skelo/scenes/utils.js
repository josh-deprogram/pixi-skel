import _ from 'lodash';

// Return the current Active Scene
export const CurrentScene = (SCENES) => {
    let active = null;
    for (let i = 0; i < SCENES.length; i++) {
        if(SCENES[i].active === true)
            active = SCENES[i];
    }
    return active;
}

// Handle Scene Changes
export const ChangeScene = (SCENES, nextScene) => {
    const currentScene = CurrentScene(SCENES);
    const newScene = _.find(SCENES, {'name':nextScene});
    newScene.start();
    
    // Pause previos Scene if provided
    if(newScene !== currentScene && currentScene) {
        currentScene.pause();
        currentScene.hide();
    }
}

