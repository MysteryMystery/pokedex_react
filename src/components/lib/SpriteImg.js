import React from "react";

export default (props) => {
    let secondary = props.secondary ? true : false;

    const classes = "mx-1 shadow-inner-lg m-2 " + (secondary ? "bg-gray-500 rounded-3xl" : "bg-white rounded-full") + " " + props.className
    const styles = {
        //backgroundImage: "url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }

    if (props.pokemon){
        let p = props.pokemon;
        return <img className={classes} style={styles} src={p.sprites.front_default} alt={p.name}/>
    }
    return <img className={classes} style={styles} src={props.url} alt={props.alt}/>
}
