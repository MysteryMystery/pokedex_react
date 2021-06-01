import React from "react";
import PokeAPI from "../lib/PokeAPI";
import ProgressBar from "./lib/ProgressBar";
import PokemonStatColourMap from "../lib/PokemonStatColourMap";
import {ucfirst} from "../lib/util/StringOps";

export default class StatsPane extends React.Component {
    render() {
        let pokemon = this.props.pokemon;

        return <div className={"w-full m-1 md:m-3"}>
            { pokemon.stats.map(stat =>
                <div key={stat.stat.name}>
                    {this.props.showValue ? <p><span className={"font-bold"}>{ucfirst(stat.stat.name)}:</span> {stat.base_stat}</p> : ""}
                    <ProgressBar
                        bg="bg-pink-200"
                        fg={PokemonStatColourMap.getStat(stat.stat.name)}
                        width={PokeAPI.getInstance().baseStatToPercentage(stat.base_stat)}
                    >
                    </ProgressBar>
                </div>
            ) }
        </div>
    }
}
