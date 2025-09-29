<template>

  <!--  Navigation-->
  <ul uk-tab>
    <li>
      <router-link to="/login">Login</router-link>
    </li>
    <li class="uk-active">
      <router-link to="/">Page One</router-link>
    </li>
    <li>
      <router-link to="/page-2">Page Two</router-link>
    </li>
  </ul>
  <router-view/>
</template>

<script setup lang="ts">
</script>