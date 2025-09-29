<template>
  <div v-if="loading" class="uk-text-center uk-padding">Chargement...</div>
  <div v-else-if="error" class="uk-alert-danger" data-uk-alert>{{ error }}</div>
  <section v-else class="uk-section uk-section-small uk-padding-remove-top">
    <div id="author-wrap" class="uk-container uk-container-small">
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

  <section class="uk-section uk-article uk-padding-remove-bottom">
    <div class="uk-container uk-container-small">
      <h2 class="uk-text-bold uk-h1 uk-margin-remove-adjacent uk-margin-remove-top">{{ article?.title }}</h2>
      <p class="uk-text-lead">{{ article?.desc }}</p>
      <div class="uk-margin-small-top uk-flex uk-flex-left uk-flex-middle uk-grid-small" data-uk-grid>
          <div><button class="uk-button uk-button-primary" @click="onEdit">Modifier</button></div>
          <div><button class="uk-button uk-button-danger" type="button" uk-toggle="target: #article-delete">Supprimer</button></div>
      </div>

      <!-- Delete Modal -->
      <div id="article-delete" uk-modal>
          <div class="uk-modal-dialog uk-modal-body">
              <h2 class="uk-modal-title">Suppression</h2>
              <p>Êtes-vous sûr de vouloir supprimer cet article ?</p>
              <p class="uk-text-right">
                  <button class="uk-button uk-button-default uk-modal-close uk-margin-right" type="button">Annuler</button>
                  <button class="uk-button uk-button-danger uk-modal-close" type="button"  @click="onDelete">Supprimer</button>
              </p>
          </div>
      </div>
    </div>

    <!-- Image -->
    <div class="uk-container uk-section uk-padding-remove-bottom">
      <div class="uk-position-relative uk-visible-toggle uk-light"
           data-uk-slideshow="ratio: 7:3; animation: push; min-height: 270; velocity: 3">
        <ul class="uk-slideshow-items">
          <li>
            <img :data-src="article?.imgPath" data-uk-img="target: !.uk-slideshow-items" alt=""
                 data-uk-cover :src="article?.imgPath">
            <div class="uk-position-bottom uk-position-medium uk-text-center uk-light">
              <h3 class="uk-margin-remove">{{ article?.title }}</h3>
              <p class="uk-margin-remove uk-visible@s">{{ article?.author }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const loading = ref(false)
const error = ref(null)
const deleting = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch(`http://localhost:3000/articles/${route.params.id}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    if (!json || !json.data) throw new Error('Réponse invalide')
    article.value = json.data
  } catch (e) {
    error.value = e?.message || String(e)
  } finally {
    loading.value = false
  }
})

async function onDelete() {
  if (!article.value?.id) return
  deleting.value = true
  try {
    const res = await fetch(`http://localhost:3000/articles/${article.value.id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    await router.push({ name: 'ArticleList' })
  } catch (e) {
    error.value = e?.message || String(e)
  } finally {
    deleting.value = false
  }
}

function onEdit() {
  if (!article.value?.id) return
  router.push({ name: 'ArticleForm', params: { id: article.value.id } })
}

</script>

<style scoped>

</style>