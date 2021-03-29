// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)

  const [pokemon, setPokemon] = React.useState(null)

  React.useEffect(() => {
  
    // Sem pokemonName, não fazemos nada
    if(pokemonName === '') return

    // Limpando os dados do pokemon
    setPokemon(null)

    // fetchPokemon é uma função assíncrona. Essas funções podem demorar
    // mais ou menos tempo para serem executadas, e, enquanto elas são processadas,
    // a execução do programa principal continua.
    // No caso das funções assíncronas, como não sabemos quando elas terminam, é
    // necessário que elas CHAMEM DE VOLTA o programa principal quando tiverem terminado.
    // Esse processo de CHAMAR DE VOLTA é denominado CALLBACK.

    // fetchPokemon, sendo uma função assíncrona, é necessário que providenciemos
    // uma forma de ela chamar de volta quando tiver acabado. Para isso, passamos para
    // ela uma outra função que deve ser chamada de volta (callback) quando ela estiver
    // pronta. Essa função de callback é passada no parâmetro then.
    // Tecnicamente, o retorno de uma uma função assíncrona é chamado promessa (Promise).
    // Uma promise suporta dois callbacks: um será chamado (via then) quando a tarefa é
    // concluída com sucesso e o outro será chamado (via catch) quando a tarefa falha. catch
    // recebe o erro que foi reportado.
    /*
    fetchPokemon(pokemonName)
    .then(data => setPokemon(data))       // callback "do bem"
    .catch(erro => alert(erro.message))   // callback "do mal"
    */

    // Uma outra sintaxe para chamar funções assíncronas é por meio das palavras-chave
    // async e await. Nesse caso, obrigatoriamente, a chamada assíncrona deve estar dentro
    // de uma função marcada com a palavra-chave async.

    async function getPokemon() {
      try {
        // A chamada à função assíncrona é precedida pela palavra-chave await
        let data = await fetchPokemon(pokemonName)  // Chamada assíncrona
        setPokemon(data)
      }
      catch(erro) {
        alert(erro.message)
      }
    }
    // Chamada à função
    getPokemon()

  }, [pokemonName])

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this
  if(pokemonName === '') return 'Submit a pokemon'
  else if(pokemonName !== '' && pokemon === null)
    return <PokemonInfoFallback name={pokemonName} />
  else
    return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
