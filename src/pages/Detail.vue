<template>
  <q-page>
    <div v-if="data" class="row">
      <div class="col-12 left-side text-center">
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="white"
          navigation
          padding
          arrows
          class="bg-secondary text-white shadow-1 rounded-borders"
        >
          <q-carousel-slide v-if="data.sprites.front_default" name="front" class="column no-wrap flex-center">
            <q-img class="b-img" :src="data.sprites.front_default" />
          </q-carousel-slide>
          <q-carousel-slide v-if="data.sprites.back_default" name="back" class="column no-wrap flex-center">
            <q-img class="b-img" :src="data.sprites.back_default" />
          </q-carousel-slide>
          <q-carousel-slide v-if="data.sprites.front_shiny" name="front-shine" class="column no-wrap flex-center">
            <q-img class="b-img" :src="data.sprites.front_shiny" />
          </q-carousel-slide>
          <q-carousel-slide v-if="data.sprites.back_shiny" name="back-shine" class="column no-wrap flex-center">
            <q-img class="b-img" :src="data.sprites.back_shiny" />
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="col-12">
        <div class="details">
          <h5>Base State</h5>
          <ul>
            <li v-for="s in data.stats" :key="s.base_stat + '-' + s.stat.name"> 
              {{ s.stat.name }} : {{ s.base_stat }}
            </li>
          </ul>
          <h5>Abilities</h5>
          <ul>
            <li v-for="a in data.abilities" :key="a.ability.name"> 
              {{ a.ability.name }}
            </li>
          </ul>
          <h5>Moves</h5>
          <ul>
            <li v-for="m in data.moves" :key="m.move.name"> 
              {{ m.move.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import { api } from 'boot/axios'
import { useRoute } from 'vue-router'

export default ({
  name: 'IndexPage',
  setup () {
    const state = reactive({
      data: null,
    })
    const route = useRoute()
    api.get('/pokemon/' + route.params.name)
      .then((s) => {
        if (s.status === 200) {
          state.data = s.data
        }
      })
      .catch((e) => {
        console.log(e)
      })
    return {
      ...toRefs(state),
      slide: ref('front'),
    }
  }
})
</script>

<style lang="scss" scoped>
.details {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin: 30px 15px;
  h5 {
    margin: 15px 0;
  }
  ul {
    margin-top: 0;
  }
}
.b-img {
  width: 100%;
  @media screen and (min-width: 1024px) {
    width: 30%;
  }
}
</style>
