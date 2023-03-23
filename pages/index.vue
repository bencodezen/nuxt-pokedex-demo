<script setup>
const { data: pokeData } = useAsyncData('pokedex', async () => {
  const pokedex = await fetch('https://pokeapi.co/api/v2/pokedex/kanto')
    .then((res) => res.json())
    .then((data) => {
      return Promise.all(
        data.pokemon_entries.map(async (pokemon) => {
          const pokemonName = pokemon.pokemon_species.name

          const sprite = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
          )
            .then((res) => res.json())
            .then((data) => {
              return data?.sprites?.front_default
            })

          return {
            ...pokemon,
            sprite,
          }
        })
      )
    })

  return { pokedex }
})
</script>

<template>
  <main>
    <h1>Kanto Pokedex</h1>
    <ul class="pokedex">
      <li
        v-for="(pokemon, index) in pokeData.pokedex"
        :key="index"
        class="pokedex-card"
      >
        <div>#{{ pokemon.entry_number }}</div>
        <img
          :src="pokemon.sprite"
          :alt="`${pokemon.pokemon_species.name} sprite`"
        />
        <div>
          <nuxt-link :to="`/pokemon/${pokemon.pokemon_species.name}`">
            {{ pokemon.pokemon_species.name }}
          </nuxt-link>
        </div>
      </li>
    </ul>
  </main>
</template>

<style>
.pokedex {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  list-style: none;
  margin: 0;
  padding: 0;
}

.pokedex-card {
  text-align: center;
  border: 1px solid black;
}
</style>
