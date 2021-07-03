<template>
  <div id="app">
    <div class="fw-bold">
      <router-link class="link-dark" to="/">Welcome</router-link> |
      <router-link class="link-dark" to="/search">Search results</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Nunito, sans-serif;
  background-color: gray;
  text-align: center;
  min-height: 100vh;
  padding-top: 2rem;
}
</style>
