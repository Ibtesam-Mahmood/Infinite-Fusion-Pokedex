
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
}

export class EvolutionInfo{
    constructor(){}

    static from(json){
        const parsed = Object.assign(new EvolutionInfo(), json);
        // console.log(parsed);
        return parsed;
    }
}