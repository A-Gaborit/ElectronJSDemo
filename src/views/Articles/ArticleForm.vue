<template>
  <section class="uk-section uk-section-small uk-section-default">
    <div class="uk-container uk-container-small">
      <h2 class="uk-heading-bullet">{{ isCreate ? 'Créer un article' : 'Modifier l\'article' }}</h2>

      <div v-if="loading" class="uk-text-center uk-padding">Chargement...</div>
      <div v-else-if="error" class="uk-alert-danger" data-uk-alert>{{ error }}</div>

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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const saving = ref(false)
const error = ref(null)
const form = ref({ id: null, title: '', desc: '', author: '', imgPath: '' })
const isCreate = ref(false)

onMounted(async () => {
  if (!route.params.id) {
    isCreate.value = true
    return
  }
  
  loading.value = true
  try {
    const res = await fetch(`http://localhost:3000/articles/${route.params.id}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    if (!json || !json.data) throw new Error('Réponse invalide')
    const a = json.data
    form.value = {
      id: a.id,
      title: a.title || '',
      desc: a.desc || '',
      author: a.author || '',
      imgPath: a.imgPath || ''
    }
  } catch (e) {
    error.value = e?.message || String(e)
  } finally {
    loading.value = false
  }
})

async function onSubmit() {
  saving.value = true
  error.value = null
  try {
    const res = await fetch('http://localhost:3000/articles/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    // Retour vers le détail ou la liste
    await router.push({ name: 'ArticleList'})
  } catch (e) {
    error.value = e?.message || String(e)
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
