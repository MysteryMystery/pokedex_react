import {ucHyphenatedWords} from "../../lib/util/StringOps";

export default props => {
    let pokemon = props.pokemon

    return <div className={"m-3 w-full"}>
        <div className={"grid grid-cols-3 m-1 p-1 bg-gray-700 text-gray-700 font-bold rounded-t-md"}>
            <div className={"mx-auto rounded-full bg-gray-200 px-2"}>Move</div>
            <div className={"mx-auto rounded-full bg-gray-200 px-2"}>Level</div>
            <div className={"mx-auto rounded-full bg-gray-200 px-2"}>Learn Method</div>
        </div>
        { pokemon.moves
            .sort((a, b) => {
                if (a.move.name < b.move.name)
                    return -1;
                if (a.move.name > b.move.name)
                    return 1;
                return 0;
            })
            .map(
                move =>
                    <div key={move.move.name} className={"grid grid-cols-3 m-1 p-1 bg-gray-700"}>
                        <div className={"mx-auto"}>{ucHyphenatedWords(move.move.name)}</div>
                        <div className={"mx-auto"}>{ move.version_group_details[0].level_learned_at }</div>
                        <div className={"mx-auto"}>{ ucHyphenatedWords(move.version_group_details[0].move_learn_method.name) }</div>
                    </div>
            )
        }
    </div>
}
