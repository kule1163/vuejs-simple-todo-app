<template>
  <header>
    <nav class="container">
      <div class="branding">
        <img src="../assets/logo.svg" alt="logo" />
        <h1>Vue Todos</h1>
      </div>
      <ul class="nav-routes">
        <RouterLink to="/">Home</RouterLink>
      </ul>
    </nav>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
header {
  background-color: #f1f1f1;
  nav {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    .branding {
      display: flex;
      align-items: center;
      gap: 8px;
      img {
        max-height: 30px;
      }

      h1 {
        font-size: 24px;
        text-wrap: nowrap;
      }
    }

    .nav-routes {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      gap: 12px;
      list-style: none;

      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }
}
</style>
