import { defineStore } from 'pinia';

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorite: null,
  }),
  getters: {
    favorite: (state) => state.favorite,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
