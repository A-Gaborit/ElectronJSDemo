<template>
  <section class="uk-section uk-section-small uk-section-default uk-padding-remove">
    <div class="uk-container uk-margin-bottom">
      <div class="uk-flex uk-flex-right uk-margin">
        <button
          class="uk-button uk-button-primary"
          type="button"
          @click="addArticle()"
        >
          Ajouter
        </button>
      </div>
    </div>
    <div class="uk-container uk-container-expand uk-margin-large-bottom">
      <div v-if="loading" class="uk-text-center uk-padding">Chargement...</div>

      <div
        v-else
        class="uk-grid uk-grid-medium uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l  uk-child-width-1-5@xl uk-grid-match js-filter"
        data-uk-grid="masonry: true" data-uk-sortable="handle: .drag-icon">


        <!-- card -->
        <div
          v-for="article in articles"
          :key="article.id"
          class="nature-card"
          :data-tags="article.title">
          <div class="uk-card uk-card-small uk-card-default" @click="articleDetail(article.id)"
               style="cursor: pointer;">
            <div class="uk-card-header">
              <div class="uk-grid uk-grid-small uk-text-small" data-uk-grid>
                <div class="uk-width-expand">
                  <span class="cat-txt">Article</span>
                </div>
              </div>
            </div>
            <div class="uk-card-media">
              <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
                <img class="lazy" :data-src="article.imgPath" data-width="400" data-height="300"
                     data-uk-img alt="" :src="article.imgPath">
              </div>

            </div>
            <div class="uk-card-body">
              <h6 class="uk-margin-small-bottom uk-margin-remove-adjacent uk-text-bold">{{ article.title }}</h6>
              <p class="uk-text-small uk-text-muted">{{ article.desc }}</p>
            </div>
            <div class="uk-card-footer">
              <div class="uk-grid uk-grid-small uk-grid-divider uk-flex uk-flex-middle" data-uk-grid>
                <div class="uk-width-expand uk-text-small">
                  {{ article.author }}
                </div>
                <div class="uk-width-auto uk-text-right">
                  <span data-uk-tooltip="title: Drag this card" class="uk-icon-link drag-icon"
                        data-uk-icon="icon:move; ratio: 1"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getArticles } from '../../services/article'

const articles = ref([])
const loading = ref(false)
const router = useRouter();

onMounted(async () => {
  await loadArticles();
})

async function loadArticles() {
  loading.value = true;
  
  try {
    const { data } = await getArticles();
    articles.value = data;
  } catch (err) {
    UIkit.notification({
      message: 'Erreur lors du chargement des articles',
      status: 'danger',
      pos: 'top-center',
      timeout: 5000
    });
  } finally {
    loading.value = false;
  }
}

function addArticle() {
  router.push({ name: 'ArticleCreate' });
}

function articleDetail(id) {
  router.push({ name: 'ArticleDetail', params: { id } });
}

</script>

<style scoped>
.uk-card {
  border-top: 2px solid;
  position: relative;
  transition: box-shadow 0.15s ease-out;
  border-radius: 3px;
}

.uk-card:hover {
  box-shadow: 0 0 0 7px rgba(0, 0, 0, 0.045);
}

.uk-card .cat-txt {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.01em;
}

.nature-card .uk-card {
  border-top-color: #1E87F0;
}


.nature-card .uk-card .cat-txt {
  color: #1E87F0;
}

</style>