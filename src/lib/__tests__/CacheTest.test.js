import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import PokeAPI from "../PokeAPI";
import Cache from "../Cache";

test("PokeAPI GetAllPokemon", async () => {
    let p = await PokeAPI.getInstance().getAllPokemon();
    expect(p).not.toBeUndefined()
})

test("PokeAPI GetPokemon", async () => {
    let p = await PokeAPI.getInstance().getPokemon(6);
    let q = Cache.getInstance().getPokemon(6)
    expect(p).not.toBeUndefined()
    expect(q).not.toBeUndefined()

    p = await PokeAPI.getInstance().getPokemon(25);
    q = Cache.getInstance().getPokemon(25)
    console.log(q)
    expect(p).not.toBeUndefined()
    expect(q).not.toBeUndefined()
})
