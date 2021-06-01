import React, {useState} from "react";
import PokeAPI from "../lib/PokeAPI";
import Badge from "./lib/Badge";
import PokemonTypeColourMap from "../lib/PokemonTypeColourMap";
import StatsPane from "./StatsPane";
import InfiniteScroll from "react-infinite-scroll-component";
import SpriteImg from "./lib/SpriteImg";

export class Browse extends React.Component {
    state = {
        pokemon: [],
        expanded_pokemon: 0,
    }
    BATCH_SIZE = 50;

    componentDidMount() {
        this.loadNextPokemonBatch(151)
    }

    loadNextPokemonBatch(batchSize = this.BATCH_SIZE){
        let api = PokeAPI.getInstance();
        let lowerBound = this.state.pokemon.length

        for (let i = lowerBound + 1; i <= lowerBound + batchSize; i++){
            if (i > api.NUMBER_OF_POKEMON)
                break;
            api.getPokemon(i).then(x => {
                this.state.pokemon.push(x);
                this.state.pokemon.sort((o, t) => o.id > t.id)
                this.setState(this.state)
            })
        }
    }

    isSelected(pokemon) {
        return pokemon.id === this.state.expanded_pokemon;
    }

    render() {
        const {pokemon} = this.state;

        return <div>
            <div className="flex flex-wrap browse justify-center">
                { pokemon.map(p =>
                    <div key={p.id}
                         className={"card shadow-inner text-center bg-gray-800 hover:bg-gray-500 p-4 " + (this.state.expanded_pokemon === p.id ? "expanded" : "" )}
                         onMouseOver={ () => this.setState({expanded_pokemon: p.id})}
                        //onMouseOut={ () => this.setState({expanded_pokemon: 0})}
                         onClick={() => this.props.history.push("/show/" + p.id)}
                    >
                        <div className={"grid grid-cols-2"}>
                            <div className={!this.isSelected(p) ? "col-span-2" : ""}>
                                <SpriteImg className={"mx-auto"} pokemon={p}/>

                                <div style={{ border: "solid 0.1rem", borderColor: PokemonTypeColourMap.getBorder(p.types[0].type.name) }} />

                                <div className="text-white">{p.name[0].toUpperCase() + p.name.slice(1)}</div>
                                { p.types.map(type => <Badge key={type.type.name} type={type.type.name}>
                                    {type.type.name[0].toUpperCase() + type.type.name.slice(1)}</Badge>
                                ) }
                            </div>
                            { this.isSelected(p) ? <StatsPane pokemon={p}/> : "" }
                        </div>
                    </div>)
                }
            </div>
            <div className={"text-center"}>
                <button className={"bg-gray-200 text-gray-800 p-3 hover:shadow-inner"}
                        onClick={() => this.loadNextPokemonBatch()}
                >Load More...</button>
            </div>
        </div>

    }
}

export default Browse;
