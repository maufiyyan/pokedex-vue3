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
        <div class="col">
          <q-select outlined v-model="selected" :options="filter" label="Filter by Type" />
        </div>
      </div>
      <div v-if="!loading" class="row">
        <template v-if="list !== null">
          <div v-for="p in list" :key="p.name" class="col-md-2 col-sm-4 col-xs-6 poke-card">
            <poke-card :payload="p" />
          </div>
          <div id="bottomPage" />
        </template>
      </div>
      <div v-else class="row">
        <div v-for="a in 24" :key="a" class="col-md-2 col-sm-4 col-xs-6 poke-card">
          <loading-card />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { reactive, toRefs, watch, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import PokeCard from 'components/card.vue'
import LoadingCard from 'components/loading.vue'

export default ({
  name: 'IndexPage',
  components: {
    PokeCard,
    LoadingCard,
  },
  setup () {
    const $q = useQuasar()
    if ($q.localStorage.getItem('favorite') === null) {
      $q.localStorage.set('favorite', '[]')
    }
    const state = reactive({
      loading: true,
      start: 0,
      list: [],
      filter: [],
      selected: null,
      canLoadMore: false,
      debounce: null,
      urlFrom: 'raw',
      url: '/pokemon',
    })
    const processData = async(val) => {
      const data = []
      await val.map((d) => {
          data.push({
            name: d.pokemon.name,
            url: d.pokemon.url
          })
        })
      return data
    }
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect()
      return (
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      )
    }
    const initPokemonList = (url, from) => {
      api.get(url)
      .then(async(s) => {
        if (s.status === 200) {
          console.log(s)
          if (from === 'raw') {
            state.list = state.list.concat(s.data.results)
            state.canLoadMore = s.data.count > state.list.length
            state.start = state.canLoadMore ? state.start + 30 : state.start
          } else {
            const tempData = await processData(s.data.pokemon)
            state.list = state.list.concat(tempData)
          }
          state.loading = false
        }
      })
      .catch((e) => {
        console.log(e)
      })
    }
    const initFilter = () => {
      api.get('/type')
      .then((s) => {
        if (s.status === 200) {
          s.data.results.map((d) => {
            state.filter.push({
              label: d.name,
              value: d.url
            })
          })
        }
      })
      .catch((e) => {
        console.log(e)
      })
    }
    const scroll = () => {
      window.onscroll = () => {
        let el = document.querySelector('#bottomPage')
        if (el === null) return false
        if (isElementInViewport(el) && state.canLoadMore && state.urlFrom === 'raw' ) {
          clearTimeout(state.debounce)
          state.debounce = setTimeout(() => {
            initPokemonList(state.url + '?offset=' + state.start + '&limit=30', state.urlFrom);
          }, 500)
        }
      }
  	}
    initFilter()
    initPokemonList(state.url + '?offset=' + state.start + '&limit=30', state.urlFrom)
    watch(
      () => state.selected,
      (newVal) => {
        state.loading = true
        state.list = []
        state.start = 0
        state.urlFrom = 'filtered'
        state.url = '/type/' + newVal.value.slice(0, -1).split('/').pop()
        initPokemonList(state.url + '?offset=0&limit=30', state.urlFrom)
      }
    )
    
    onMounted(() => {
      scroll()
    })
    return {
      ...toRefs(state),
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
