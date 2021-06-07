import Cache from "./Cache";

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

    async getAllPokemon(){
        return fetch(this.endpoint + "pokemon/?limit=" + this.NUMBER_OF_POKEMON)
            .then(t => t.json());
    }

    async getPokemon(id){
        let p = this.cache.getPokemon(id)
        if (p === undefined){
            p = fetch(this.endpoint + "pokemon/" + id).then(t => t.json())
            this.cache.putPokemon(id, p)
        }
        return p;
    }

    async getEvolutionChainFromSpecies(id){
        /*
        return fetch(this.endpoint + "pokemon-species/" + id)
            .then(t => t.json())
            .then(x =>
                fetch(x.evolution_chain.url)
                    .then(t => t.json())
            )
         */

        let species = await this.getSpecies(id)
        console.log(species)
        let evoChain = this.cache.getEvolutionChain(id)
        if (evoChain === undefined){
            evoChain = await fetch(species.evolution_chain.url).then(j => j.json())
            this.cache.putEvolutionChain(id, evoChain)
        }
        return evoChain
    }

    async getSpecies(id){
        if(await this.cache.getSpecies(id) === undefined){
            let res = await fetch(this.endpoint + "pokemon-species/" + id)
                .then(t => t.json())
            this.cache.putSpecies(id, res)
        }
        return this.cache.getSpecies(id)
    }

    baseStatToPercentage(value){
        return (value / this.BASE_STAT_MAX) * 100
    }

    get cache(){
        return Cache.getInstance()
    }
}

export default PokeAPI;
