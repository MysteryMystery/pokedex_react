export default class PokemonTypeColourMap {
    static __types = {
        normal: {
            border: "#979779",
            bg: "#a8a878",
        },
        fire: {
            border: "#9c531f",
            bg: "#f08030"
        },
        fighting : {
            border: "#7d1f1a",
            bg: "#c03028",
        },
        water: {
            border: "#445e9c",
            bg: "#6890f0"
        },
        flying: {
            border: "#6d5e9c",
            bg: "#a890f0"
        },
        grass: {
            bg: "#78c850",
            border: "#4e8234"
        },
        poison: {
            bg: "#a040a0",
            border: "#682a68"
        },
        electric: {
            bg: "#f8d030",
            border:"#a1871f"
        },
        ground: {
            bg: "#e0c068",
            border: "#968047"
        },
        psychic: {
            bg: "#f85888",
            border: "#a13959"
        }
    }

    static getBG(type){
        return this.getField(type, "bg")
    }

    static getBorder(type){
        return this.getField(type, "border")
    }

    static getField(t, f){
        try {
            return this.__types[t][f];
        } catch (e){
            return "#fff";
        }
    }
}

export const getColour = type => PokemonTypeColourMap.__types[type] || "#fff"
