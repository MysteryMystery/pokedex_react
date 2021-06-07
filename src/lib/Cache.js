import PokeAPI from "./PokeAPI";

export default class Cache {
    static instance;

    constructor() {
        this._pokemon = [];
        this._pointer = 0;
        Cache.instance = this;
    }

    static getInstance(){
        if (this.instance === undefined)
            new this();
        return this.instance
    }

    getPokemon(id){
        return this._pokemon[id];
    }

    putPokemon(id, data){
        this._pokemon[id] = data;
    }

    getSpecies(id){
        if (this._pokemon[id] && this._pokemon[id].species && this._pokemon[id].species.url === undefined)
            return this._pokemon[id].species
        return undefined;
    }

    putSpecies(id, data){
        if (this._pokemon[id] === undefined)
            this._pokemon[id] = {}
        this._pokemon[id].species = data;
    }

    getEvolutionChain(id){
        let species = this.getSpecies(id);
        if ( species && species.evolution_chain && species.evolution_chain.url === undefined)
            return species.evolution_chain
        return undefined
    }

    putEvolutionChain(id, data){
        if (this._pokemon[id] === undefined)
            this._pokemon[id] = {species: {}}
        this._pokemon[id].species.evolution_chain = data;
    }

    [Symbol.iterator]() {
        return this.next();
    }

    next() {
        let done = this._pointer >= this._pokemon.length - 1;

        return {
            done: done,
            value: this._pokemon[this._pointer++]
        }
    }
}
