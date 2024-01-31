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
// header {
//   line-height: 1.5;
//   max-height: 100vh;
// }

// nav {
//   width: 100%;
//   font-size: 12px;
//   text-align: center;
//   margin-top: 2rem;
// }

// nav a.router-link-exact-active {
//   color: var(--color-text);
// }

// nav a.router-link-exact-active:hover {
//   background-color: transparent;
// }

// nav a {
//   display: inline-block;
//   padding: 0 1rem;
//   border-left: 1px solid var(--color-border);
// }

// nav a:first-of-type {
//   border: 0;
// }

// @media (min-width: 1024px) {
//   header {
//     display: flex;
//     place-items: center;
//     padding-right: calc(var(--section-gap) / 2);
//   }

//   .logo {
//     margin: 0 2rem 0 0;
//   }

//   header .wrapper {
//     display: flex;
//     place-items: flex-start;
//     flex-wrap: wrap;
//   }

//   nav {
//     text-align: left;
//     margin-left: -1rem;
//     font-size: 1rem;

//     padding: 1rem 0;
//     margin-top: 1rem;
//   }
// }
</style>