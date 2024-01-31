<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import { useStore } from 'vuex';

const store = useStore();
const searchQuery = ref('');
const sortBy = ref('title');
const router = useRouter();

const filteredProducts = computed(() => {
  return store.state.products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const sortProducts = () => {
  store.state.products = [...store.state.products].sort((a, b) => {
    if (sortBy.value === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy.value === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });
};

const goToProductDetails = (productId) => {
  router.push(`/product/${productId}`);
};

watch(sortBy, () => {
  sortProducts();
});
</script>

<template>
  <div class="home">
    <div class="search-sort-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by product name"
        class="search-sort__name"
      />
      <select v-model="sortBy" @change="sortProducts">
        <option value="title">Sort by Title</option>
        <option value="rating">Sort by Rating</option>
      </select>
    </div>
    <div class="products-container">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @click="goToProductDetails(product.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.home {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-sort-container {
    width: fit-content;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0 , .1);

    display: flex;
    gap: 20px;
}

.search-sort__name {
  width: 200px;
  border: solid 1px #ddddddd7;
  border-radius: 5px;
  line-height: 25px;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 270px), 1fr));
  gap: 1rem;

  align-items: center; /* Center items vertically */
  justify-items: center;

  @media (max-width: 571px) {
    margin: 0 auto;
  }
}

select {
  color: #7b7b7b;
  background-color: transparent;
  border: solid 1px #ddddddd7;
  border-radius: 5px;
  line-height: 25px;
  padding: 0 1em 0 0;
  margin: 0;
}
</style>