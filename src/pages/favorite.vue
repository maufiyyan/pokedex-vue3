<template>
  <q-page>
    <div class="row">
      <div class="col-6 offset-3 text-center">
        <q-img class="logo" width="228px" src="~/assets/logo.png" />
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
      </div>
    </div>
    <div class="content">
      <div class="row">
        <template v-if="list !== null && list.length > 0">
          <div v-for="p in list" :key="p.name" class="col-md-2 col-sm-4 col-xs-6 poke-card">
            <poke-card :payload="p" />
          </div>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import PokeCard from 'components/card.vue'

export default ({
  name: 'FavoritePage',
  components: {
    PokeCard,
  },
  setup () {
    const $q = useQuasar()
    
    const list = computed(() =>JSON.parse($q.localStorage.getItem('favorite')))
    console.log(list.value)
    return {
      list,
    }
  }
})
</script>

<style lang="scss" scoped>
.logo {
  margin-top: 40px;
  margin-bottom: 20px;
}
.q-select {
  width: 200px;
  margin-bottom: 20px;
}
.poke-card {
  padding: 5px;
  position: position-relative;
}
#bottomPage {
  position: absolute;
  bottom: 20%;
}
</style>
