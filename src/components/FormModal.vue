<template>
    <div class="modal" :class="{ 'update--position': isEditing }">
    <div class="modal-content">
      <h2 class="modal__title">{{ isEditing ? 'Update product' : 'Add new product' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="modal__main-part">
          <div class="modal__firt-part">
            <div class="form-group">
              <label for="title">Title:</label>
              <input id="title" type="text" v-model="editedProduct.title" placeholder="Title" minlength="3" />
            </div>

            <div class="form-group">
              <label for="description">Description:</label>
              <textarea id="description" v-model="editedProduct.description" placeholder="Description" minlength="10" />
            </div>
            <label for="price">Price:</label>
            <input id="price" type="number" v-model="editedProduct.price" placeholder="Price" />
            <div class="form-group">
              <label for="discountPercentage">Discount Percentage:</label>
              <input id="discountPercentage" type="number" v-model="editedProduct.discountPercentage" step="any"
                placeholder="Discount Percentage" />
            </div>
          </div>
          <div class="modal__second-part">
            <div class="form-group">
              <label for="rating">Rating:</label>
              <input id="rating" type="number" v-model="editedProduct.rating" placeholder="Rating" step="any" />
            </div>

            <div class="form-group">
              <label for="stock">Stock:</label>
              <input id="stock" type="number" v-model="editedProduct.stock" placeholder="Stock" />
            </div>



            <div class="form-group">
              <label for="brand">Brand:</label>
              <input id="brand" type="text" v-model="editedProduct.brand" placeholder="Brand" />
            </div>

            <div class="form-group">
              <label for="category">Category:</label>
              <input id="category" type="text" v-model="editedProduct.category" placeholder="Category" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="thumbnail">Thumbnail URL:</label>
          <input id="thumbnail" type="text" v-model="editedProduct.thumbnail" placeholder="Thumbnail URL" />
        </div>

        <div class="form-group">
          <div v-for="(image, index) in editedProduct.images" :key="index">
            <label for="image-url">Image URL:</label>
            <input id="image-url" type="text" v-model="editedProduct.images[index]" placeholder="Image URL" />
          </div>
        </div>


        <button type="submit">Submit</button>
      </form>
      <button v-if="isEditing" @click="closeModal" class="close-button">Close</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { store } from '@/store/store';
import { useRouter } from 'vue-router';


export default {
  name: 'FormModal',
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const isModalOpen = ref(true);
    const router = useRouter();
    const editedProduct = ref({ ...props.product });

    console.log(`here${props.isEditing}`)

    const handleSubmit = async () => {
      try {
        const endpoint = props.isEditing ? `https://dummyjson.com/products/${editedProduct.value.id}` : 'https://dummyjson.com/products/add';
        const method = props.isEditing ? 'PUT' : 'POST';
        const action = props.isEditing ? 'update' : 'create';

        await fetch(endpoint, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editedProduct.value),
        });


        store.commit(action, editedProduct.value);
        emit('close');
        router.push('/');
      } catch (error) {
        console.error('Error updating product:', error);
      }
    };


    const closeModal = () => {
      emit('close');
    };

    return {
      isModalOpen,
      editedProduct,
      handleSubmit,
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/utils";

.update--position {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.584);
}

.modal {
  // position: fixed;

  overflow: auto;
  background-color: #fefefe;


  padding-block: 16px;
  border: 1px solid $gray-elements;


  &__main-part {
    margin-top: 10px;
    display: flex;
    gap: 5px
  }

  &__first-part,
  &__second-part {
    flex: 1;
  }

  &__title {
    @extend %mont-bold-style;
  }

  &-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
}


.close-button {
  color: #aaa;
  float: right;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background: none;
  cursor: pointer;
  background-color: #fff;
  margin-bottom: 10px;
  opacity: 1;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

input[type="text"],
input[type="number"],
textarea {
  height: 35px;
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
  @extend %mont-style;
  resize: none;
}

input[type="text"]:focus,
input[type="number"]:focus,
textarea:focus {
  background-color: #ddd;
  outline: none;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity: 1;
}

label {
  @extend %mont-style;
}
</style>