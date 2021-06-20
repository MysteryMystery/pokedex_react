import React from "react";
import PokemonTypeColourMap from "../../lib/PokemonTypeColourMap";

export default class Badge extends React.Component {
    render() {
        return <span className={"items-center justify-center px-2 py-1 m-1 rounded-sm text-xs font-bold border " + this.props.className}
                     style={ this.props.autoGen || this.props.autoGen === undefined ? {
                         backgroundColor:  PokemonTypeColourMap.getBG(this.props.type),
                         borderColor: PokemonTypeColourMap.getBorder(this.props.type),
                         borderWidth: "0.15rem",
                     } : {}}
        >
            {this.props.children}
        </span>
    }
}
