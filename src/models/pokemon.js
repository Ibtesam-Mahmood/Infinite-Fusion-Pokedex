import infiniteFusionConstants from "../services/infiniteFusionConstants";
import {TypeApiIndecies} from '../services/constants'

export class PokemonInfo{

    constructor(){}

    static from(json){
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

    constructor(){}

    static from(json){
        const parsed = Object.assign(new Pokemon(), json);
        
        if(infiniteFusionConstants.nameFix[parsed.name] != null){
            parsed.name = infiniteFusionConstants.nameFix[parsed.name];
        }

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

}

export class PokemonSpecies{
    constructor(){}

    static from(json){
        const parsed = Object.assign(new PokemonSpecies(), json);
        // console.log(parsed);
        
        return parsed;
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
    constructor(){}

    static from(json){
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