<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Loader from './components/Loader.vue';

const store = useStore();
const isLoading = ref(false);

onMounted(() => {
  if (store.state.products.length === 0) {
    isLoading.value = true;
    store.dispatch('fetchProducts').finally(() => {
      isLoading.value = false;
    });
  }
});

watch(() => store.state.products.length, (newLength) => {
  isLoading.value = newLength === 0;
});
</script>

<template>
  <Header />

  <main class="container">
    <Loader v-if="isLoading" />
    <RouterView v-else />
  </main>
</template>

<style lang="scss" scoped >
@import "./assets/utils";
.container {
  // width: $container-width;

  max-width: $container-width;
  margin: 0 auto;
}

</style>
