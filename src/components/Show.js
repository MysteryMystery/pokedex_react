import React, {useState} from "react";
import PokeAPI from "../lib/PokeAPI";
import SpriteImg from "./lib/SpriteImg";
import Loading from "./lib/Loading";
import StatsPane from "./StatsPane";
import FlexCard from "./lib/FlexCard";
import Badge from "./lib/Badge";
import {ucfirst} from "../lib/util/StringOps";
import MoveListPane from "./lib/MoveListPane";

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
            let urlspl = obj.species.url.split("/")
            let pid = parseInt(urlspl[urlspl.length - 2])
            let pokemon = await PokeAPI.getInstance().getPokemon(pid)

            saved.push(pokemon)
            obj = obj.evolves_to[0]
        }

        return saved;
    }

    render() {
        let pokemon = this.state.pokemon;
        let evoChain = this.state.evo_chain;

        if (pokemon === undefined || evoChain === undefined)
            return <Loading></Loading>

        return <div className={"flex justify-center"}>
            <div className={"w-full lg:w-5/6 shadow-inner-lg bg-gray-500 p-4"}>
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4"}>
                    <div className={"order-first"}>
                        <FlexCard>
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
                        </FlexCard>

                        <FlexCard className={"bg-gray-200 justify-center"}>
                            { this.state.evo_chain.map(p =>
                                <div key={p.id} className={""}>
                                    <SpriteImg url={p.sprites.front_default} alt={p.id} secondary={true} />
                                    <div className={"mb-3"}>
                                        { p.types.map(type => <Badge key={type.type.name} type={type.type.name}>
                                            {ucfirst(type.type.name)}</Badge>
                                        ) }
                                    </div>
                                </div>
                            ) }
                        </FlexCard>
                    </div>
                    <div className={"order-2 md:order-3"}>
                        <FlexCard>
                            <StatsPane pokemon={pokemon} showValue={true}/>
                        </FlexCard>
                    </div>
                    <div className={"order-last"}>
                        <FlexCard>
                            <MoveListPane pokemon={pokemon}/>
                        </FlexCard>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Show;
