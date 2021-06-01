import React, {useState} from "react";
import PokeAPI from "../lib/PokeAPI";
import SpriteImg from "./lib/SpriteImg";
import Loading from "./lib/Loading";

export class Show extends React.Component {
    state = {
        pokemon: undefined,
        evo_chain: undefined,
    }

    componentDidMount() {
        let pokemon = this.props.match.params.pokemon;
        PokeAPI.getInstance()
            .getPokemon(pokemon)
            .then(pokemon => this.setState({pokemon: pokemon}))
        this.formatEvoChain()
            .then(chain => this.setState({evo_chain:chain}))
    }

    async formatEvoChain() {
        let evoChain = await PokeAPI.getInstance()
            .getEvolutionChainFromSpecies(this.props.match.params.pokemon)

        // {sprite: "", "name" : "", id : 2 }
        let saved = []
        let obj = evoChain.chain
        while (obj && obj.species){
            let response = await fetch(obj.species.url)
            response = response.json()
            let pokemon = await PokeAPI.getInstance().getPokemon(obj.species.name)

            saved.push({
                id: pokemon.id,
                sprite: pokemon.sprites.front_default,
                name: pokemon.name
            })
            obj = obj.evolves_to[0]
            console.log(obj)
        }

        return saved;
    }

    render() {
        let pokemon = this.state.pokemon;
        let evoChain = this.state.evo_chain;

        if (pokemon === undefined || evoChain === undefined)
            return <Loading></Loading>

        return <div className={"flex justify-center"}>
            <div className={"w-full md:w-5/6 shadow-inner bg-gray-500 p-4"}>
                <div className={"flex flex-wrap bg-gray-800 rounded w-full md:2/3 lg:w-1/3"}>
                    <div>
                        <SpriteImg pokemon={pokemon}/>
                    </div>
                    { Object.entries(pokemon.sprites)
                        .filter(([k, v]) => v !== null && typeof v !== "object")
                        .sort((a, b) => b[0].localeCompare(a[0]))
                        .map(([name, source]) =>
                            <div key={name}>
                                <SpriteImg url={source} alt={name} secondary={true} />
                            </div>
                        ) }
                </div>

                <div className={"flex flex-wrap justify-center"}>
                    { this.state.evo_chain.map(p =>
                        <div key={p.id}>
                            <SpriteImg url={p.sprite} alt={p.id} secondary={true} />
                        </div>
                    ) }
                </div>
            </div>
        </div>
    }
}

export default Show;
