<template>
  <header className="header">
    <div className="header__navigation">
      <RouterLink to="/">
        <LogoIcon />
      </RouterLink>

      <NavBar />
    </div>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';
import NavBar from './NavBar.vue';
import LogoIcon from '../assets/icons/LogoIcon.vue';

export default {
  components: {
    NavBar,
    LogoIcon
  }
}

</script>

<style lang="scss" scoped >
@import "../assets/utils";

.header {
  height: $header-height;
  display: flex;
  justify-content: space-between;
  padding-left: 24px;
  align-items: center;

  box-shadow: 0 1px 0 0 $gray-elements;

  &__navigation {
    display: flex;
    gap: $nav-gap;
    line-height: 11px;
    height: $header-height;
    align-items: center;
  }

  &__right-side-options {
    display: flex;

    & a {
      height: $header-height;
      padding: 24px;
      box-shadow: -1px 0 0 $gray-elements;

    }
  }
}
</style>