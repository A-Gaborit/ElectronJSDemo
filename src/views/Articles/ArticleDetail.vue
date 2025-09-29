<template>
  <div v-if="loading" class="uk-text-center uk-padding">Chargement...</div>
  <section v-else class="uk-section uk-padding-small">
    <div class="uk-container">
      <div class="uk-grid uk-grid-medium uk-flex uk-flex-middle" data-uk-grid>
        <div class="uk-width-auto">
          <img src="https://unsplash.it/80/80/?random" alt="" class="uk-border-circle">
        </div>
        <div class="uk-width-expand">
          <h4 class="uk-margin-remove uk-text-bold">{{ article?.author }}</h4>
          <span class="uk-text-small uk-text-muted">Auteur de l'article</span>
        </div>
      </div>
    </div>
  </section>
  <!--/AUTHOR-->
  <div class="uk-container uk-container-small">
    <hr class="uk-margin-remove">
  </div>
  <!--ARTICLE-->

  <section class="uk-section uk-article uk-padding-remove-bottom uk-padding">
    <div class="uk-container uk-margin-medium-bottom uk-padding-remove">
      <div class="uk-padding-remove uk-flex uk-flex-between uk-flex-middle">
        <h2 class="uk-text-bold uk-h1 uk-margin-remove">{{ article?.title }}</h2>
        <div class="uk-flex uk-flex-middle uk-grid-small" data-uk-grid>
          <div>
            <button class="uk-button uk-button-primary" @click="onEdit" uk-tooltip="Modifier">
              <span uk-icon="icon: pencil"></span>
            </button>
          </div>
          <div>
            <button class="uk-button uk-button-danger" type="button" uk-toggle="target: #article-delete" uk-tooltip="Supprimer">
              <span uk-icon="icon: trash"></span>
            </button>
          </div>
        </div>
      </div>
      <p class="uk-text-lead">{{ article?.desc }}</p>
    

    <!-- Image -->
      <div class="uk-position-relative uk-visible-toggle uk-light uk-box-shadow-medium" 
            uk-slideshow="ratio: 7:3; animation: push; min-height: 270; velocity: 3">
        <ul class="uk-slideshow-items">
          <li>
            <img :src="article?.imgPath" :data-src="article?.imgPath" uk-img alt="" uk-cover>
            <div class="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-padding-small">
              <h3 class="uk-margin-remove">{{ article?.title }}</h3>
              <p class="uk-margin-remove uk-visible@s">{{ article?.author }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Delete Modal -->
  <div id="article-delete" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Suppression</h2>
      <p>Êtes-vous sûr de vouloir supprimer cet article ?</p>
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close uk-margin-right" type="button">Annuler</button>
        <button class="uk-button uk-button-danger uk-modal-close" type="button" @click="onDelete">Supprimer</button>
      </p>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { getArticle, deleteArticle } from '../../services/article'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const loading = ref(false)
const deleting = ref(false)

onMounted(async () => {
  await loadArticle();
})

async function loadArticle() {
  loading.value = true;
  try {
    const { data } = await getArticle(route.params.id);
    article.value = data;
  } catch (err) {
    UIkit.notification({
      message: 'Erreur lors du chargement de l\'article',
      status: 'danger',
      pos: 'top-center',
      timeout: 5000
    });
  } finally {
    loading.value = false;
  }
}

async function onDelete() {
  if (!article.value?.id) return

  deleting.value = true
  try {
    await deleteArticle(article.value.id)
    router.push({name: 'ArticleList'})
  } catch (err) {
    UIkit.notification({
      message: 'Erreur lors de la suppression de l\'article',
      status: 'danger',
      pos: 'top-center',
      timeout: 5000
    });
  } finally {
    deleting.value = false
  }
}

function onEdit() {
  if (!article.value?.id) return
  router.push({name: 'ArticleEdit', params: {id: article.value.id}})
}

</script>

<style scoped>

</style>