<template>
  <section class="uk-section uk-section-small uk-section-default">
    <div class="uk-container uk-container-small">
      <h2 class="uk-heading-bullet">{{ isCreate ? 'Créer un article' : 'Modifier l\'article' }}</h2>

      <div v-if="loading" class="uk-text-center uk-padding">Chargement...</div>

      <form v-else class="uk-form-stacked" @submit.prevent="onSubmit">
        <div class="uk-margin">
          <label class="uk-form-label">Titre</label>
          <div class="uk-form-controls">
            <input class="uk-input" type="text" v-model="form.title" required />
          </div>
        </div>

        <div class="uk-margin">
          <label class="uk-form-label">Auteur</label>
          <div class="uk-form-controls">
            <input class="uk-input" type="text" v-model="form.author" required />
          </div>
        </div>

        <div class="uk-margin">
          <label class="uk-form-label">Description</label>
          <div class="uk-form-controls">
            <textarea class="uk-textarea" rows="4" v-model="form.desc" required></textarea>
          </div>
        </div>

        <div class="uk-margin" v-if="isCreate">
          <label class="uk-form-label">Image URL</label>
          <div class="uk-form-controls">
            <input class="uk-input" type="url" v-model="form.imgPath" required/>
          </div>
        </div>

        <div class="uk-margin uk-flex uk-grid-small" data-uk-grid>
          <div>
            <button class="uk-button uk-button-primary" type="submit" :disabled="saving">
              <span v-if="!saving">{{ isCreate ? 'Créer' : 'Enregistrer' }}</span>
              <span v-else>Enregistrement...</span>
            </button>
          </div>
          <div>
            <button class="uk-button uk-button-default" type="button" @click="onCancel">Annuler</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticle, saveArticle } from '../../services/article'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const saving = ref(false)
const form = ref({ id: null, title: null, desc: null, author: null, imgPath: null })
const isCreate = ref(false)

onMounted(async () => {
  if (!route.params.id) {
    isCreate.value = true
    return
  }
  
  await loadArticle()
})

async function loadArticle() {
  loading.value = true
  try {
    const { data } = await getArticle(route.params.id)
    form.value = {
      id: data.id,
      title: data.title,
      desc: data.desc,
      author: data.author,
      imgPath: data.imgPath
    }
  } catch (e) {
    UIkit.notification({
      message: 'Erreur lors de la récupération de l\'article',
      status: 'danger',
      timeout: 5000
    })
  } finally {
    loading.value = false
  }
}

async function onSubmit() {
  saving.value = true
  try {
    await saveArticle(form.value)
    await router.push({ name: 'ArticleList'})
  } catch (err) {
    UIkit.notification({
      message: 'Erreur lors de la sauvegarde de l\'article',
      status: 'danger',
      timeout: 5000
    })
  } finally {
    saving.value = false
  }
}

function onCancel() {
  router.back()
}
</script>

<style scoped>

</style>
