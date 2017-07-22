import _ from 'lodash';

// Handle Scene Changes
export default (SCENES, nextScene, prevScene, hidePrev) => {
    const newScene = _.find(SCENES, {'name':nextScene});
    newScene.start();

    // Pause previos Scene if provided
    if(prevScene) {
        const oldScene = _.find(SCENES, {'name': prevScene});
        oldScene.pause();
    }

    if(hidePrev) {
        const oldScene = _.find(SCENES, {'name': prevScene});
        oldScene.hide();
    }
}