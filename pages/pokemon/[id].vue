<script setup>
const route = useRoute()
const pokemon = ref()

useHead({
  title: computed(() => {
    return `Pokemon: ${route.params.id}`
  }),
})

const displayName = computed(() => {
  return route.params.id[0].toUpperCase() + route.params.id.slice(1)
})

await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
  .then((res) => res.json())
  .then((data) => {
    if (data) {
      pokemon.value = data
    }
  })
</script>

<template>
  <div>
    <h1>Pokemon: {{ displayName }}</h1>
    <pre>{{ pokemon }}</pre>
  </div>
</template>

<style></style>
