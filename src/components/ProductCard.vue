<template>
  <div class="productCard">
    <router-link :to="`/product/${product.id}`">
      <img :src="product.images[0]" :alt="product.title" class="productCard__image" />
      <h3 class="productCard__title">{{ product.title }}</h3>
    </router-link>
    <div class="productCard__price">
      <span class="productCard__price-main">{{ `${actualPrice}$ ` }}</span>
      <s class="productCard__price-discount">
        {{ `$${product.price}` }}
      </s>
    </div>
    <ul class="productCard__parameters">
      <li class="productCard__text">
        <span class="productCard__text-title">Rating</span>
        <span class="productCard__text-value">{{ product.rating }}</span>
      </li>
      <li class="productCard__text">
        <span class="productCard__text-title">Available</span>
        <span class="productCard__text-value">{{ product.stock > 20 ? 'Yes' : 'No' }}</span>
      </li>
      <li class="productCard__text">
        <span class="productCard__text-title">Brand</span>
        <span class="productCard__text-value">{{ product.brand }}</span>
      </li>
    </ul>
    <div class="productCard__button">
      <button
        type="button"
        class="productCard__button-add"
        @click="$emit('click', product.id)"
      >
        Click for more
      </button>
    </div>
  </div>
</template>

<script>
import { getPriceWithDiscount } from '@/helpers/getPriceWithDiscount';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    actualPrice() {
      return getPriceWithDiscount(this.product.price, this.product.discountPercentage);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/utils";

.productCard {
  padding: 32px 32px 24px;
  width: 272px;
  border: 1px solid $gray-slider-border;

  transition: all $transition-duration;

  &:hover {
    border-color: $gray-primary;
  }

  &__image {
    text-align: center;
    height: 208px;
    width: 208px;
    min-height: 186px;
    margin-block: 8px 24px;
    object-fit: contain;
  }

  &__title {
    @extend %body-text;

    color: $gray-primary;
    min-height: 42px;
  }

  &__price {
    border-bottom: 1px solid $gray-elements;
    font-size: 22px;
    padding: 7px 0;

    &-main {
      @extend %mont-bold-style;

      font-style: bold;
      margin-right: 8px;
    }

    &-discount {
      @extend %mont-style;

      color: $gray-secondary;
    }
  }

  &__parameters {
    margin-top: 16px;
  }

  &__text {
    display: flex;
    justify-content: space-between;

    @extend %small-text;

    margin-bottom: 8px;

    &-title {
      color: $gray-secondary;
    }
  }

  &__button {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: 16px;

    &-add {
      height: 40px;
      width: 100%;
      background-color: $gray-primary;

      @extend %mont-semibold-style;

      font-size: 14px;
      border: none;
      color: #fff;
      cursor: pointer;
    }
  }
}

</style>