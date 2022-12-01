import infiniteFusionConstants from "../services/infiniteFusionConstants";
import {TypeApiIndecies} from '../services/constants'
// import {EncounterLocations} from '../scripts/encounterLocations'

export class PokemonInfo{

    constructor(){
        this.objectType = 'PokemonInfo';
    }

    static from(json){
        if(json.objectType === 'PokemonInfo'){
            return json;
        }

        const parsed = Object.assign(new PokemonInfo(), json);
        parsed.id = parseInt(parsed.url.split('/').reverse()[1]);

        if(infiniteFusionConstants.nameFix[parsed.name] != null){
            parsed.name = infiniteFusionConstants.nameFix[parsed.name];
        }

        return parsed;
    }

    getID(){
        return this.id;
    }

    getGameID(){
        return infiniteFusionConstants.gameIDRemap[this.getID()] ?? 'NA';
    }

    isInGame(){
        return infiniteFusionConstants.gameIDRemap[this.getID()] != null;
    }

}

export class Pokemon{

    constructor(){
        this.objectType = 'Pokemon';
    }

    static from(json){
        if(json.objectType === 'Pokemon'){
            return json;
        }

        const parsed = Object.assign(new Pokemon(), json);
        
        if(infiniteFusionConstants.nameFix[parsed.name] != null){
            parsed.name = infiniteFusionConstants.nameFix[parsed.name];
        }

        parsed.moves = Pokemon.getFixedMoves(parsed);
        parsed.stats = Pokemon.getFixedStats(parsed);
        parsed.types = Pokemon.getFixedTypes(parsed);
        parsed.abilities = Pokemon.getFixedAbilities(parsed);

        return parsed;
    }

    static getFixedStats(pokemon){
        let stats = pokemon.stats;
        const fixed = infiniteFusionConstants.statFix[pokemon.getGameID()];
        if(fixed != null){
            for (let i = 0; i < stats.length; i++) {
                const stat = stats[i];
                const fixedStat = fixed[stat.stat.name];
                if(fixedStat != null){
                    stat.base_stat = fixedStat;
                }
            }
            // console.log(stats);
        }
        return stats;
    }

    static getFixedTypes(pokemon){
        let types = pokemon.types;
        const fixed = infiniteFusionConstants.typeFix[pokemon.getGameID()];
        if(fixed != null){
            types = [];
            fixed.forEach((e, i) => {
                types.push({
                    slot: i + 1,
                    type: {
                        name: e,
                        url: `https://pokeapi.co/api/v2/type/${TypeApiIndecies.get(e) ?? ''}`
                    }
                })
            });
            // console.log(types);
        }
        return types;
    }

    static getFixedAbilities(pokemon){
        let abilities = pokemon.abilities;
        const fixed = infiniteFusionConstants.abilityFix[pokemon.getGameID()];
        if(fixed != null){
            abilities = [];
            fixed.forEach((e, i) => {
                const abilityName = e["ability"]["name"] ?? '';
                abilities.push({
                    slot: i + 1,
                    is_hidden: e["is_hidden"] ?? false,
                    ability: {
                        name: abilityName,
                        url: `https://pokeapi.co/api/v2/ability/${infiniteFusionConstants.abilityIDMap[abilityName] ?? ''}`
                    }
                })
            });
            // console.log(abilities);
        }

        if(infiniteFusionConstants.abilitySwap[pokemon.getGameID()] != null && abilities.length > 1){
            abilities[0].slot = 2;
            abilities[1].slot = 1;
            [abilities[0], abilities[1]] = [abilities[1], abilities[0]];
        }
        return abilities;
    }

    static getFixedMoves(pokemon){
        const newMovesList = [];

        pokemon.moves.forEach(move => {
            
            for (let i = move.version_group_details.length - 1; i >= 0; i--) {
                const details = move.version_group_details[i];
                if(details.version_group.name === 'ultra-sun-ultra-moon' || details.version_group.name === 'sun-moon'){
                    newMovesList.push({
                        move: move.move,
                        details: details
                    });
                    break;
                }
            }

        });
        // console.log(newMovesList);
        return newMovesList;
    }

    getGameID(){
        return infiniteFusionConstants.gameIDRemap[this.id] ?? 'NA';
    }

    isInGame(){
        return infiniteFusionConstants.gameIDRemap[this.id] != null;
    }

    getSpeciesID(){
        return parseInt(this.species.url.split('/').reverse()[1]);
    }
    
    getFirstType(){
        return this.types[0].type.name;
    }

    getSecondType(){
        return this.types.length > 1 ? this.types[1].type.name : null;
    }

    getAbilityObjectAtIndex(index){
        return this.abilities[Math.min(index, this.abilities.length - 1)];
    }

    getHiddenAbility(index = 0){
        const hiddenAbilityList = this.abilities.filter(ability => ability.is_hidden);
        return hiddenAbilityList.length > 0 ? hiddenAbilityList[Math.min(index, hiddenAbilityList.length - 1)] : null;
    }

    getTypeObjectAtIndex(index){
        return this.types[Math.min(index, this.types.length - 1)];
    }

}

export class PokemonSpecies{
    constructor(){
        this.objectType = 'PokemonSpecies';
    }

    static from(json){
        if(json.objectType === 'PokemonSpecies'){
            return json;
        }

        const parsed = Object.assign(new PokemonSpecies(), json);
        // console.log(parsed);

        parsed.description = PokemonSpecies.getDescription(parsed);
        
        return parsed;
    }
    
    static getDescription(species){
        const enteries = species.flavor_text_entries;
        for (let index = enteries.length - 1; index >= 0; index--) {
            const flavor = enteries[index];
            if(flavor.language.name === 'en'){
                return flavor.flavor_text;
            }
        }
        return '';
    }

    getEvolutionID(){
        return parseInt(this.evolution_chain.url.split('/').reverse()[1]);
    }

    getPokemonID(){
        return parseInt(this.varieties[0].pokemon.url.split('/').reverse()[1]);
    }

    getGameID(){
        return infiniteFusionConstants.gameIDRemap[this.getPokemonID()] ?? 'NA';
    }

    isInGame(){
        return infiniteFusionConstants.gameIDRemap[this.getPokemonID()] != null;
    }
}

export class EvolutionInfo{
    constructor(){
        this.objectType = 'EvolutionInfo';
    }

    static from(json){
        if(json.objectType === 'EvolutionInfo'){
            return json;
        }

        const parsed = Object.assign(new EvolutionInfo(), json);
        // console.log(parsed);
        parsed.chain = EvolutionInfo.getEvolutionChain(parsed);
        return parsed;
    }

    static getEvolutionChain(info){
        const chain = [];
        let current = [info.chain];
        while(current != null){

            const chainLayer = [];
            current.forEach(e => {
                chainLayer.push({
                    ...e.species,
                    speciesID: parseInt(e.species.url.split('/').reverse()[1]),
                    details: e.evolution_details != null ? e.evolution_details[0] : null
                })
            });
            
            if(chainLayer.length > 0){
                chain.push(chainLayer);
            }
            current = current[0]?.evolves_to;
        }
        // console.log('PARSED');
        // console.log(info.chain);
        // console.log(chain);
        return chain;
    }

    getSpeciesIDs(){
        const ids = [];
        this.chain.forEach(e => {
            e.forEach(e => {
                ids.push(e.speciesID);
            });
        });
        return ids;
    }
}

export class MoveInfo{
    constructor(){
        this.objectType = 'MoveInfo';
    }

    static from(json){
        if(json.objectType === 'MoveInfo'){
            return json;
        }

        const parsed = new MoveInfo();
        
        parsed.id = json.id;
        parsed.name = json.name;
        parsed.accuracy = json.accuracy;
        parsed.priority = json.priority;
        parsed.power = json.power;
        parsed.pp = json.pp;
        parsed.stat_changes = json.stat_changes;
        parsed.target = json.target;
        parsed.type = json.type;
        parsed.damage_class = json.damage_class;
        parsed.meta = json.meta;
        parsed.description = json.flavor_text_entries.filter(e => e.language.name === 'en').reverse()[0].flavor_text;

        return parsed;
    }

}

export class AbilityInfo{
    constructor(){
        this.objectType = 'AbilityInfo';
    }

    static from(json){
        if(json.objectType === 'AbilityInfo'){
            return json;
        }

        const parsed = new AbilityInfo();
        
        parsed.id = json.id;
        parsed.name = json.name;
        parsed.description = json.effect_entries.filter(e => e.language.name === 'en').reverse()[0].effect;

        return parsed;
    }

}

export class Fusemon{

    constructor(){
        this.objectType = 'Fusemon';
        this.pokemonBaseInfo = [{}, {}];
    }

    static fuse(pokemon1, pokemon2){

        if(pokemon1 == null || pokemon2 == null){
            return null;
        }

        const fused = new Fusemon();

        fused.id = Fusemon.getID(pokemon1, pokemon2);
        fused.name = Fusemon.getName(pokemon1, pokemon2);
        fused.abilities = Fusemon.getAbilities(pokemon1, pokemon2);
        fused.moves = Fusemon.getMoves(pokemon1, pokemon2);
        fused.sprites = Fusemon.getSprites(pokemon1, pokemon2);
        fused.stats = Fusemon.getStats(pokemon1, pokemon2);
        fused.types = Fusemon.getTypes(pokemon1, pokemon2);
        fused.pokemonBaseInfo = [
            Fusemon.getFuseInfo(pokemon1),
            Fusemon.getFuseInfo(pokemon2),
        ];

        return fused;
    }

    getGameID(){
        return `[${parseInt(this.pokemonBaseInfo[0].gameID)}-${parseInt(this.pokemonBaseInfo[1].gameID)}]`;
    }

    isInGame(){
        return infiniteFusionConstants.gameIDRemap[this.pokemonBaseInfo[0].id] != null && infiniteFusionConstants.gameIDRemap[this.pokemonBaseInfo[1].id] != null;
    }

    getSpeciesID(){
        return parseInt(this.species.url.split('/').reverse()[1]);
    }
    
    getFirstType(){
        return this.types[0].type.name;
    }

    getSecondType(){
        return this.types.length > 1 ? this.types[1].type.name : null;
    }

    static getID(pokemon1, pokemon2){
        return `[${parseInt(pokemon1.id)}-${parseInt(pokemon2.id)}]`;
    }

    static getName(pokemon1, pokemon2){
        const name1 = pokemon1.name.substring(0, pokemon1.name.length / 2);
        const name2 = pokemon2.name.substring(pokemon2.name.length / 2);
        return name1 + name2;
    }

    static getAbilities(pokemon1, pokemon2){
        let abilityList = [
            pokemon1.getAbilityObjectAtIndex(0),
            pokemon2.getAbilityObjectAtIndex(1),
            pokemon1.getHiddenAbility(),
        ];

        //Filter duplicate abilities and nulls
        const nameMap = {};
        abilityList.forEach(e => {
            if(e != null){
                nameMap[e.ability.name] = true;
            }
        });
        abilityList = abilityList.filter(e => {
            if(nameMap[e?.ability?.name ?? ''] == 1){
                nameMap[e.ability.name] = true;
                return true;
            }

            return false;
        });

        return abilityList;
    }

    static getMoves(pokemon1, pokemon2){
        return [
            ...pokemon1.moves,
            ...pokemon2.moves,
        ];
    }

    static getSprites(pokemon1, pokemon2){

        const headID = pokemon1.getGameID();
        const pictureID = `${headID}.${pokemon2.getGameID()}.png`;

        return {
            front_default: `https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/${pictureID}`, //Get custom sprite
            front_fallback: `https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/${headID}/${pictureID}`, //Get fallback sprite
        }
    }

    static getStats(pokemon1, pokemon2){
        const bodyAdvStat = {
            attack: true,
            defense: true,
            speed: true,
        };

        // Get base stats for both pokemon
        const [stats1, stats2] = [{}, {}];
        for (let i = 0; i < pokemon1.stats.length; i++) {
            const poke1Stat = pokemon1.stats[i];
            const poke2Stat = pokemon2.stats[i];
            stats1[poke1Stat.stat.name] = {...poke1Stat};
            stats2[poke2Stat.stat.name] = {...poke2Stat};
        }

        const fusedStats = {...stats1};
        Object.keys(fusedStats).forEach(key => {
            // Combine the pokemon stats
            const advantageStat = bodyAdvStat[key] == true ? stats2[key] : stats1[key];
            const disadvantageStat = bodyAdvStat[key] == true ? stats1[key] : stats2[key];


            const statValue = Math.floor((2 * advantageStat.base_stat) / 3) + Math.floor(disadvantageStat.base_stat / 3);
            fusedStats[key].base_stat = statValue;
        });

        return Object.values(fusedStats);
    }

    static getTypes(pokemon1, pokemon2){
        let typesList = [
            pokemon1.getTypeObjectAtIndex(0),
            pokemon2.getTypeObjectAtIndex(1),
        ];

        // Remove null and duplicate types
        typesList = typesList.filter(e => e != null);
        if(typesList[0].type.name === typesList[1]?.type?.name){
            typesList.pop();
        }

        return typesList;
    }

    static getFuseInfo(pokemon){
        return {
            id: pokemon.id,
            name: pokemon.name,
            species: pokemon.species,
            gameID: pokemon.getGameID(),
        }
    }

}