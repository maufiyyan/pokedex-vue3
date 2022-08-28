<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <router-link to="/">
          <q-avatar>
            <img src="~/assets/pokeball.png">
          </q-avatar>
        </router-link>
        <q-toolbar-title>
          <router-link to="/">Pokedex App</router-link>
        </q-toolbar-title>
        <q-btn to="/favorite" flat round dense icon="star" />
      </q-toolbar>
    </q-header>
    <q-page-container class="container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.q-toolbar {
  a {
    text-decoration: none;
    color: white;
  }
}
</style>
