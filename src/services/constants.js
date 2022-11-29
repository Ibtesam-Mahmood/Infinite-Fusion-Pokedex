import bugTypeImage from '../assets/types/bug.png';
import darkTypeImage from '../assets/types/dark.png';
import dragonTypeImage from '../assets/types/dragon.png';
import electricTypeImage from '../assets/types/electric.png';
import fairyTypeImage from '../assets/types/fairy.png';
import fightingTypeImage from '../assets/types/fighting.png';
import fireTypeImage from '../assets/types/fire.png';
import flyingTypeImage from '../assets/types/flying.png';
import ghostTypeImage from '../assets/types/ghost.png';
import grassTypeImage from '../assets/types/grass.png';
import groundTypeImage from '../assets/types/ground.png';
import iceTypeImage from '../assets/types/ice.png';
import normalTypeImage from '../assets/types/normal.png';
import poisonTypeImage from '../assets/types/poison.png';
import psychicTypeImage from '../assets/types/psychic.png';
import rockTypeImage from '../assets/types/rock.png';
import steelTypeImage from '../assets/types/steel.png';
import unknownTypeImage from '../assets/types/unknown.png';
import waterTypeImage from '../assets/types/water.png';


// Names of all the types
const typeNames = [
    'bug', 'dark', 'dragon', 
    'electric', 'fairy', 'fighting', 
    'fire', 'flying', 'ghost', 
    'grass', 'ground', 'ice', 
    'normal', 'poison', 'psychic', 
    'rock', 'steel', 'unknown', 'water'
];

const typeIndecies = [
    7, 17, 16,
    13, 18, 2,
    10, 3, 8,
    12, 5, 15,
    1, 4, 14,
    6, 9, 10001, 11
];

const TypeIndeciesMap = new Map(
    [...Array(typeNames.length).keys()].map(
        i => [typeNames[i], typeIndecies[i]]
    )
);

// All the images for the types
const typeImages = [
    bugTypeImage, darkTypeImage, dragonTypeImage, 
    electricTypeImage, fairyTypeImage, fightingTypeImage, 
    fireTypeImage, flyingTypeImage, ghostTypeImage, 
    grassTypeImage, groundTypeImage, iceTypeImage, 
    normalTypeImage, poisonTypeImage, psychicTypeImage, 
    rockTypeImage, steelTypeImage, unknownTypeImage, waterTypeImage
];

// Export all the image require statements for each type of pokemon
const TypeImagesMap = new Map(
    [...Array(typeNames.length).keys()].map(
        i => [typeNames[i], typeImages[i]]
    )
);

// console.log(TypeImagesMap);

const TypeEffectiveness = {
    
};

export const TypeImages = TypeImagesMap;
export const TypeNames = typeNames;
export const TypeApiIndecies = TypeIndeciesMap;
// export default {
//     TypeNames: typeNames,
//     TypeImages: TypeImagesMap
// };