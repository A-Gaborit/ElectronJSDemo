<template>
  <div class="uk-container">
    <nav class="uk-navbar-container uk-navbar-transparent uk-flex" uk-navbar>
      <div class="uk-navbar-left">
        <router-link to="/" class="uk-navbar-item uk-logo">ElectronJS</router-link>
      </div>

      <div class="uk-navbar-right">
        <ul class="uk-tab uk-margin-remove-bottom">
          <li v-if="!isAuthenticated" :class="{ 'uk-active': $route.path === '/' }">
            <router-link to="/" class="uk-text-bold uk-link-muted">Connexion</router-link>
          </li>
          <li v-else>
            <button @click="logoutUser" class="uk-button uk-button-link uk-text-bold uk-link-muted">
              Se déconnecter
            </button>
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
import { useRouter } from 'vue-router'
import { useAuthStore } from '../services/auth'

const router = useRouter()
const { isAuthenticated, logout } = useAuthStore()

const logoutUser = () => {
  logout()
  router.push('/')
}
</script>