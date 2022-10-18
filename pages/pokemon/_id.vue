<script>
export default {
  data: () => ({
    pokemon: null,
  }),
  computed: {
    displayName() {
      return (
        this.$route.params.id[0].toUpperCase() + this.$route.params.id.slice(1)
      )
    },
  },
  async mounted() {
    const pokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        return data
      })

    this.pokemon = pokemon
  },
}
</script>

<template>
  <div>
    <h1>Pokemon: {{ displayName }}</h1>
    <pre>{{ pokemon }}</pre>
  </div>
</template>

<style></style>
