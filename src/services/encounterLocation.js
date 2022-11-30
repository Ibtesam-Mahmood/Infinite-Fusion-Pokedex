
class EncounterLocations {
    constructor(){
        this.encounterData = require('../assets/locations/encounters.json');
    }

    getLocationsByID(id){
        return this.encounterData?.[`${id}`] ?? [];
    }
}


class EncounterLocationsSingleton {
    constructor() {
        if (!EncounterLocationsSingleton.instance) {
            EncounterLocationsSingleton.instance = new EncounterLocations();
        }
    }
  
    static getInstance() {
        return EncounterLocationsSingleton.instance;
    }

    static getLocationsByID(id){
        return EncounterLocationsSingleton.instance.getLocationsByID(id);
    }
}

new EncounterLocationsSingleton();

export default EncounterLocationsSingleton;