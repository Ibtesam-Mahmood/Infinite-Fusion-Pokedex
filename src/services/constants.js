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

// TypeEffectivenessList[defender][attacker]
const TypeEffectivenessList = [
    [1, 1, 1, 1, 1, 0.5, 2, 2, 1, 0.5, 0.5, 1, 1, 1, 1, 2, 1, 1, 1], // 1 bug
    [2, 0.5, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], // 2 dark
    [1, 1, 2, 0.5, 2, 1, 0.5, 1, 1, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 0.5], // 3 dragon
    [1, 1, 1, 0.5, 1, 1, 1, 0.5, 1, 1, 2, 1, 1, 1, 1, 1, 0.5, 1, 1], // 4 electric
    [0.5, 0.5, 0, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1], // 5 fairy
    [0.5, 0.5, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 0.5, 1, 1, 1], // 6 fighting
    [0.5, 1, 1, 1, 0.5, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 1, 1, 2, 0.5, 1, 2], // 7 fire
    [0.5, 1, 1, 2, 1, 0.5, 1, 1, 1, 0.5, 0, 2, 1, 1, 1, 2, 1, 1, 1], // 8 flying
    [0.5, 2, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 0, 0.5, 1, 1, 1, 1, 1], // 9 ghost
    [1, 1, 1, 0.5, 1, 1, 2, 2, 1, 0.5, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5], // 10 grass
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0.5, 1, 0.5, 1, 1, 2], // 11 ground
    [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 2, 1, 1], // 12 ice
    [1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 13 normal
    [0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 2, 1, 1, 0.5, 2, 1, 1, 1, 1], // 14 poison
    [2, 2, 1, 1, 1, 0.5, 1, 1, 2, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 1], // 15 psychic
    [1, 1, 1, 1, 1, 2, 0.5, 0.5, 1, 2, 2, 1, 0.5, 0.5, 1, 1, 2, 1, 2], // 16 rock
    [0.5, 1, 0.5, 1, 0.5, 2, 2, 0.5, 1, 0.5, 2, 0.5, 0.5, 0, 0.5, 0.5, 0.5, 1, 1], // 17 steel
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 18 unknown
    [1, 1, 1, 2, 1, 1, 0.5, 1, 1, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 0.5], // 19 water
];
export class TypeEffectiveness{
    static getTypeIndex(type){
        if(type == null) return -1;
        return typeNames.indexOf(type.toLowerCase());
    }

    static getEffectiveness({types = [null, null], attack = null}){

        const [typeOne, typeTwo] = types ?? [null, null];

        if(types == null || types == [null, null]){
            return TypeEffectivenessList;
        }
        else{
            let effectiveness = TypeEffectivenessList[17]; //unknown default
            if(typeOne != null && typeTwo != null){
                const [typeOneList, typeTwoList] = [
                    TypeEffectivenessList[TypeEffectiveness.getTypeIndex(typeOne)], 
                    TypeEffectivenessList[TypeEffectiveness.getTypeIndex(typeTwo)]
                ];
                effectiveness = typeOneList.map((value, index) => value * typeTwoList[index]);
            }
            else{
                effectiveness = TypeEffectivenessList[TypeEffectiveness.getTypeIndex(typeOne ?? typeTwo)];
            }

            if(attack != null){
                return effectiveness[TypeEffectiveness.getTypeIndex(attack)]; // gets the effectiveness of the attack
            }
            
            return effectiveness; // gets the effectiveness of the pokemon type
        }
    }

    static sortEffectiveness(effectiveness){
        let sorted = {
            x4: [],
            x2: [],
            x1: [],
            x0_5: [],
            x0_25: [],
            x0: []
        };

        for (let i = 0; i < effectiveness.length; i++) {
            const value = effectiveness[i];
            const type = typeNames[i];
            if(value == 4){
                sorted.x4.push(type);
            }
            else if(value == 2){
                sorted.x2.push(type);
            }
            else if(value == 1){
                sorted.x1.push(type);
            }
            else if(value == 0.5){
                sorted.x0_5.push(type);
            }
            else if(value == 0.25){
                sorted.x0_25.push(type);
            }
            else if(value == 0){
                sorted.x0.push(type);
            }
        }

        return sorted;
    }
}


export const TypeImages = TypeImagesMap;
export const TypeNames = typeNames;
export const TypeApiIndecies = TypeIndeciesMap;
// export default {
//     TypeNames: typeNames,
//     TypeImages: TypeImagesMap
// };