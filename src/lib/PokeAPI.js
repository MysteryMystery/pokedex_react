class PokeAPI {
    static instance;

    constructor() {
        this.endpoint = "https://pokeapi.co/api/v2/";
        this.NUMBER_OF_POKEMON = 932;
        this.BASE_STAT_MAX = 255;
        PokeAPI.instance = this;
    }

    static getInstance(){
        if (this.instance === undefined)
            new this();
        return this.instance
    }

    async getPokemon(idOrName){
        return fetch(this.endpoint + "pokemon/" + idOrName).then(t => t.json())
    }

    async getEvolutionChainFromSpecies(idOrName){
        return fetch(this.endpoint + "pokemon-species/" + idOrName)
            .then(t => t.json())
            .then(x =>
                fetch(x.evolution_chain.url)
                    .then(t => t.json())
            )
    }

    baseStatToPercentage(value){
        return (value / this.BASE_STAT_MAX) * 100
    }
}

export default PokeAPI;
