<template>
  <q-card>
    <router-link :to="'/' + payload.name">
      <q-img class="p-15" :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ payload.url.slice(0, -1).split('/').pop()+'.png'" placeholder-src="~/assets/placeholder.png" :ratio="1" width="100%"/>
    </router-link>
    <q-card-section>
      <div class="text-h6">{{ format.capitalize(payload.name.split('-').join(' ')) }}</div>
    </q-card-section>
    <q-btn @click="addFavorite(isFavorite)" color="primary">
      {{ isFavorite ? 'Remove from Favorite' : 'Add to Favorite' }}
    </q-btn>
  </q-card>
</template>
<script>
import { reactive, computed, toRefs } from 'vue'
import { format, useQuasar } from 'quasar'

export default {
  name: 'PokeCard',
  props: ['payload'],
  setup (props, ctx) {
    const $q = useQuasar()
    const checkLS = computed({
      get: () => {
        const favorite = JSON.parse($q.localStorage.getItem('favorite'))
        const idx = favorite.findIndex((x) => x.name === props.payload.name)
        return idx !== -1
      }
    })

    const state = reactive({
      isFavorite: false,
    })
    
    state.isFavorite = checkLS.value
    const addFavorite = (action) => {
      const favorite = JSON.parse($q.localStorage.getItem('favorite'))
      if (!action) {
        favorite.push(props.payload)
        $q.localStorage.set('favorite', JSON.stringify(favorite))
        state.isFavorite = true
      } else {
        const idx = favorite.findIndex((x) => x.name === props.payload.name)
        favorite.splice(idx, 1)
        $q.localStorage.set('favorite', JSON.stringify(favorite))
        state.isFavorite = false
      }
    }

    return {
      format,
      addFavorite,
      ...toRefs(state),
    }
  }
}
</script>
<style lang="scss" scoped>
.q-card {
  text-align: center;
  .text-h6 {
    color: $dark;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .q-btn {
    color: white;
    margin-bottom: 10px;
  }
}
</style>
