// store.js
import { createStore } from 'vuex';
import { getProducts } from '../api/getProducts';

export const store = createStore({
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const { data } = await getProducts();
        commit('setProducts', data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  },
});