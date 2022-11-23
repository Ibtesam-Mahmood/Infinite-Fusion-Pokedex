
class PokemonInfo{

    constructor(){}

    static from(json){
        const parsed = Object.assign(new PokemonInfo(), json);
        parsed.id = parsed.url.split('/').reverse()[1];
        return parsed;
    }

    getID(){
        return this.id;
    }

}

class Pokemon{

    constructor(){}

    static from(json){
        const parsed = Object.assign(new Pokemon(), json);
        // console.log(parsed);
        return parsed;
    }

}

exports.PokemonInfo = PokemonInfo;
exports.Pokemon = Pokemon;