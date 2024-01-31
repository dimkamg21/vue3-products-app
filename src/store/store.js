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

    get(state) {
      return state.products;
    },
    delete(state, payload) {
      state.products = state.products.filter((item) => item.id !== payload);
    },
    create(state, payload) {
      state.products.unshift(payload);
    },
    update(state, payload) {
      state.products = state.products.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            ...payload,
          };
        } else {
          return item;
        }
      });
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