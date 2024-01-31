<template>
  <nav class="nav">
    <ul class="nav__list">
      <li v-for="route in routes" :key="route.path" class="nav__link">
        <RouterLink :to="route.path">
          {{ route.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'NavBar',
  setup() {
    const routes = ref([
      { path: '/', label: 'Home' },
      { path: '/new-product', label: 'Create' },
    ]);

    return {
      routes,
    };
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/utils";


.nav {

  &__list {
    display: flex;
    gap: 64px;
  }

  &__link a {
    @extend %mont-bold-style;

    display: flex;
    align-items: center;

    height: $header-height;

    letter-spacing: 0.48px;
    font-size: 12px;
    text-transform: uppercase;
    color: $gray-secondary;

    transition: color 0.4s;

    &:hover {
      color: $gray-primary;
    }
  }

  a {
    position: relative;
  }

  a::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    right: 50%;
    width: 0;
    height: 3px;
    background-color: $gray-primary;
    transition: width $transition-duration,
      left $transition-duration,
      right $transition-duration;
  }

  a.router-link-exact-active::after {
    width: 100%;
    left: 0;
    right: auto;
  }
}
</style>