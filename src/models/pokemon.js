
export class PokemonInfo{

    constructor(){}

    static from(json){
        const parsed = Object.assign(new PokemonInfo(), json);
        parsed.id = parseInt(parsed.url.split('/').reverse()[1]);
        return parsed;
    }

    getID(){
        return this.id;
    }

}

export class Pokemon{

    constructor(){}

    static from(json){
        const parsed = Object.assign(new Pokemon(), json);
        // console.log(parsed);
        return parsed;
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
}

export class EvolutionInfo{
    constructor(){}

    static from(json){
        const parsed = Object.assign(new EvolutionInfo(), json);
        console.log(parsed);
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