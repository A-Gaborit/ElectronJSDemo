<template>
  <div class="uk-container">
    <nav class="uk-navbar-container uk-navbar-transparent uk-flex" uk-navbar>
      <div class="uk-navbar-left">
        <router-link to="/" class="uk-navbar-item uk-logo">ElectronJS</router-link>
      </div>

      <div class="uk-navbar-right">
        <ul class="uk-tab uk-margin-remove-bottom">
          <li :class="{ 'uk-active': $route.path === '/' }">
            <router-link to="/" class="uk-text-bold uk-link-muted">Connexion</router-link>
          </li>
          <li :class="{ 'uk-active': $route.path.startsWith('/articles') }">
            <router-link to="/articles" class="uk-text-bold uk-link-muted">Articles</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup>
// Aucun style personnalisé, uniquement des classes UIkit
</script>

<style scoped>
</style>