import React, {useState} from "react";
import PokeAPI from "../lib/PokeAPI";
import Badge from "./lib/Badge";
import PokemonTypeColourMap from "../lib/PokemonTypeColourMap";
import StatsPane from "./StatsPane";
import SpriteImg from "./lib/SpriteImg";
import {ucfirst} from "../lib/util/StringOps";
import SearchBar from "./lib/SearchBar";
import Loading from "./lib/Loading";
import * as SVGLoaders from "svg-loaders-react";

export class Browse extends React.Component {
    state = {
        pokemon: [],
        expanded_pokemon: 0,
        is_loading_pokemon: false,
    }
    BATCH_SIZE = 50;

    componentDidMount() {
        this.loadNextPokemonBatch(151)
    }

    loadNextPokemonBatch(batchSize = this.BATCH_SIZE){
        let api = PokeAPI.getInstance();
        let lowerBound = this.state.pokemon.length;
        this.setState({is_loading_pokemon: true});

        (async () => {
            for (let i = lowerBound + 1; i <= lowerBound + batchSize; i++){
                if (i > api.NUMBER_OF_POKEMON)
                    break;
                api.getPokemon(i).then(x => {
                    //this.state.pokemon.push(x);
                    //this.state.pokemon.sort((o, t) => o.id > t.id)
                    this.state.pokemon.splice(i - 1, 0, x)
                })
            }
        })().then(() => {
            this.state.is_loading_pokemon = false;
            this.setState(this.state);
        })
    }

    isSelected(pokemon) {
        return pokemon.id === this.state.expanded_pokemon;
    }

    render() {
        const {pokemon} = this.state;

        return <div>
            <SearchBar pokemon={pokemon}/>
            <div className="flex flex-wrap browse justify-center">
                { pokemon.map(p =>
                    <div key={p.id}
                         className={"card shadow-inner-lg text-center bg-gray-800 hover:bg-gray-500 p-4 " + (this.state.expanded_pokemon === p.id ? "expanded" : "" )}
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
                                    {ucfirst(type.type.name)}</Badge>
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
                >{ this.state.is_loading_pokemon ?  <SVGLoaders.TailSpin/> : "Load More..."}</button>
            </div>
        </div>

    }
}

export default Browse;
