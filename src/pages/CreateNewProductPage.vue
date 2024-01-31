<template>
  <div class="newProductPage">
    <FormModal :product="newProduct" :isEditing="false" @close="handleModalClose" />
  </div>
</template>

<script>
import { ref } from 'vue';
import FormModal from '@/components/FormModal.vue';

export default {
  name: 'CreateNewProductPage',
  components: {
    FormModal,
  },
  setup() {
    const newProduct = ref( {
        id: 0,
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [],
      },
    );

    const handleModalClose = () => {
      newProduct.value = {};
    };

    return {
      newProduct,
      handleModalClose,
    };
  },
};
</script>