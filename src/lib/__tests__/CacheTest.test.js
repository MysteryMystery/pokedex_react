import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
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
})
