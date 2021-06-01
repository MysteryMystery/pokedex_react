export default class PokemonStatColourMap {
    static __stats = {
        attack: "#F08030",
        defense: "#F8D030",
        hp: "#FF0000",
        jump: "#39BD62",
        power: "#FF4131",
        skill: "#317BEE",
        "special-attack" : "#6890F0",
        "special-defense": "#78C850",
        speed: "#F85888",
        stamina: "#EECD31"
    }

    static getStat(type){
        return this.__stats[type] ?? "#333";
    }
}
