export default props => {
    let pokemon = props.pokemon

    return <div className={"m-3"}>
        { pokemon.moves.map(move => <div> {move.move.name} </div> ) }
    </div>
}
