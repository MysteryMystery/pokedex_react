import PokeAPI from "./PokeAPI";

export default class Cache {
    static instance;

    constructor() {
        this.STORAGE_KEY = "pokemon";
        this._pokemon = [];
        Cache.instance = this;
    }

    static getInstance(){
        if (this.instance === undefined)
            new this();
        return this.instance
    }

    getAllPokemon(){
        return this._pokemon
    }

    getPokemon(id){
        let loaded = this.getAllPokemon()
        return loaded[id - 1];
    }

    putPokemon(id, data){
        this._pokemon[id - 1] = data;
    }

    getSpecies(id){
        let pokemon = this.getPokemon(id);
        if (pokemon && pokemon.species && pokemon.species.url === undefined)
            return pokemon.species
        return undefined;
    }

    putSpecies(id, data){
        if (this.getPokemon(id) === undefined)
            this.putPokemon(id, {})
        let pokemon = this.getPokemon(id)
        pokemon.species = data;
        this.putPokemon(id, pokemon)
    }

    getEvolutionChain(id){
        let species = this.getSpecies(id);
        if ( species && species.evolution_chain && species.evolution_chain.url === undefined)
            return species.evolution_chain
        return undefined
    }

    putEvolutionChain(id, data){
        let pokemon = this.getPokemon(id)
        if (pokemon === undefined)
            this.putPokemon(id, {species: {}})
        pokemon = this.getPokemon(id);
        pokemon.species.evolution_chain = data;
        this.putPokemon(id, pokemon);
    }
}
