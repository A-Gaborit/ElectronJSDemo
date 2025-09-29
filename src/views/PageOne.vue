<!--UX/UI de la vue-->
<template>
  <h1>Page 1</h1>

  <button @click="callApi" class="uk-button uk-button-primary">Appeler l'api</button>

  <div v-for="movie in movies" :key="movie.title">
    {{ movie.title }}
  </div>

</template>

<!--Partie logique de la vue-->
<script setup>
import {ref} from 'vue';
import log from 'electron-log/renderer';

const movies = ref([]);

async function callApi() {
  log.info("J'ai cliqué");
  // TODO : Afficher chargement

  // Appeler api
  const res = await fetch('https://raw.githubusercontent.com/Chocolaterie/EniWebService/main/api/movies.json');

  const data = await res.json();

  // j'alimente les données dans la liste des films statefull
  movies.value = data;

  // Récupérer le jon

  // TODO : Fermer le chargement
}
</script>