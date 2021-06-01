import React from "react";
import PokeAPI from "../lib/PokeAPI";
import ProgressBar from "./lib/ProgressBar";
import PokemonStatColourMap from "../lib/PokemonStatColourMap";

export default class StatsPane extends React.Component {
    render() {
        let pokemon = this.props.pokemon;

        return <div>
            { pokemon.stats.map(stat =>
                <div key={stat.stat.name}>
                    <ProgressBar

                        bg="bg-pink-200"
                        fg={PokemonStatColourMap.getStat(stat.stat.name)}
                        width={PokeAPI.getInstance().baseStatToPercentage(stat.base_stat)}
                    ></ProgressBar>
                </div>
            ) }
        </div>
    }
}
