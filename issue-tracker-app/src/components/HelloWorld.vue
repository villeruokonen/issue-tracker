<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="landing">
    <h1 class="green">{{ msg }}</h1>
    <h3></h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.landing h1,
.landing h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .landing h1,
  .landing h3 {
    text-align: left;
  }
}
</style>
