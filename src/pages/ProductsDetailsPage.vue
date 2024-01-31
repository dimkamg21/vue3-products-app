<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getPriceWithDiscount } from '../helpers/getPriceWithDiscount';
import FormModal from '@/components/FormModal.vue';

export default {
  name: 'ProductDetailsView',
  components: {
    FormModal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const product = ref({});
    const currentPhoto = ref('');
    const actualPrice = ref(0);
    const isModalOpen = ref(false);

    const handlePhotoClick = (photoUrl) => {
      currentPhoto.value = photoUrl;
    };


    const toggleModal = () => {
      isModalOpen.value = !isModalOpen.value;
    };

    const handleDeleteClick = () => {
      fetch(`https://dummyjson.com/products/${product.value.id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(() => {
          store.commit('delete', product.value.id);
          router.push('/');
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    };

    onMounted(async () => {
      const id = parseInt(router.currentRoute.value.params.id) || 0;
      const foundProduct = store.state.products.find(item => item.id === id) || {};

      product.value = foundProduct;
      currentPhoto.value = foundProduct.images ? foundProduct.images[0] : '';

      actualPrice.value = getPriceWithDiscount(product.value.price, product.value.discountPercentage);

    });

    return {
      product,
      currentPhoto,
      actualPrice,
      isModalOpen,
      handlePhotoClick,
      handleDeleteClick,
      toggleModal,
    };
  },
};
</script>

<template>
  <article class="details">

    <div class="details__main">
      <div class="details__main__photos">
        <div class="details__main__photos__block">
          <div v-for="photo in product.images" :key="photo" class="details__main__photos__block__container"
            :class="{ 'details__main__photos__block__container--active': currentPhoto === photo }">
            <img :src="photo" alt="More photos" class="details__main__photos__block__container-item"
              @click="handlePhotoClick(photo)" />
          </div>
        </div>

        <div class="details__main__main-photo">
          <img :src="currentPhoto" alt="Product photo" class="details__main__main-photo-img" />
        </div>
      </div>

      <div class="details__main-info-position">
        <div class="details__main__info">
          <h3 class="details__main__title">
            {{ product.title }}
          </h3>
          <p class="details__main__info-description">
            {{ product.description }}
          </p>
          <div class="details__main__info__category">
            <p class="details__main__info__category-text">Category:</p>
            <p class="details__main__info__category-value">{{ product.category }}</p>
          </div>
          <div class="details__main__info__brand">
            <p class="details__main__info__brand-text">Brand:</p>
            <p class="details__main__info__brand-value">{{ product.brand }}</p>
          </div>
          <div class="details__main__info__rating">
            <p class="details__main__info__rating-text">Rating:</p>
            <p class="details__main__info__rating-value">{{ product.rating }}</p>
          </div>
          <div class="details__main__info__stock">
            <p class="details__main__info__stock-text">Stock:</p>
            <p class="details__main__info__stock-value">{{ product.stock }}</p>
          </div>
          <div class="details__main__info__price">
            <p class="details__main__info__price-text">Price:</p>
            <div class="details__main__info__price-prices">
              <p v-if="product.price !== actualPrice" class="details__main__info__price-prices-old">{{ `$${product.price}`
              }}</p>
              <p class="details__main__info__price-prices-discount">{{ `$${actualPrice}` }}</p>
            </div>
          </div>
        </div>
        <div class="details__bottom__buttons">
          <button type="button" class="details__bottom__buttons-button" @click.prevent="toggleModal">
            Update
          </button>
          <button type="button" class="details__bottom__buttons-button details__bottom__buttons-button--delete"
            @click.prevent="handleDeleteClick">
            Delete
          </button>
        </div>
      </div>
    </div>

    <FormModal :product="product" v-if="isModalOpen" :isEditing="true" @close="toggleModal" />
  </article>
</template>

<style lang="scss">
@import "../assets/utils";


.details {
  margin-block: 40px;
  margin-inline: 10px;

  &__bottom {
    display: flex;

    &__buttons {
      display: flex;
      justify-content: right;

      gap: 16px;

      &-button {
        padding-inline: 18px;
        height: 32px;
        border: none;
        font-size: 14px;
        color: #fff;
        background-color: $gray-primary;
        ;
        @extend %mont-semibold-style;

        text-transform: uppercase;
        transition: all $transition-duration;

        &:hover {
          box-shadow: 0 0.5px 5px 0 $green;
        }

        &--delete {
          color: red;
          background-color: $color-light;

          &:hover {
            box-shadow: 0 0.5px 5px 0 red;
          }
        }
      }
    }
  }

  &__main {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-top: 16px;

    @include on-mobile {
      flex-direction: column;
    }

    &-info-position {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__photos {
      display: flex;
      gap: 16px;

      @include on-mobile {
        flex-direction: column-reverse;
      }

      &__block {
        display: flex;
        flex-direction: column;
        gap: 8px;

        @include on-mobile {
          flex-direction: row;
          justify-content: center;
        }

        &__container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 100px;
          padding: 8px;
          border: 1px solid $gray-elements;

          transition: all $transition-duration;

          &--active {
            border-color: $gray-primary;
          }

          &-item {
            max-width: 100%;
            max-height: 100%;
          }

          &:hover {
            border-color: $gray-primary;
          }
        }
      }
    }

    &__main-photo {
      width: 100%;

      &-img {
        width: 100%;
        height: auto;
        max-height: 500px;
      }
    }

    &__title {
      @extend %mont-bold-style;

      font-size: 24px;
      font-weight: 700;
      text-align: left;
    }

    &__info {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 360px;

      @include on-mobile {
        width: 100%;
      }

      &-description {
        margin-bottom: 18px;
        font-size: 16px;
        text-align: left;

        @extend %mont-style;
      }

      &__category,
      &__brand,
      &__rating,
      &__stock,
      &__price {
        display: flex;
        justify-content: space-between;

        @extend %body-text;
        text-transform: uppercase;

        &-text {
          font-size: 14px;
        }

        &-value {
          font-size: 16px;
          font-weight: 700;
        }
      }

      &__price {
        margin-bottom: 8px;

        &-prices {
          display: flex;
          gap: 8px;

          &-old {
            font-size: 16px;
            font-weight: 400;
            text-decoration: line-through;
            color: $gray-secondary;
          }

          &-discount {
            font-size: 16px;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>