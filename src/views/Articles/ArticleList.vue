<template>
  <section class="uk-section uk-section-small uk-section-default uk-padding-remove-bottom">
    <div class="uk-container uk-container-expand uk-margin-large-bottom">

      <div v-if="loading" class="uk-text-center uk-padding">Chargement...</div>
      <div v-else-if="error" class="uk-alert-danger" data-uk-alert>{{ error }}</div>

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
          <div class="uk-card uk-card-small uk-card-default" @click="$router.push(`/article/${article.id}`)" style="cursor: pointer;">
            <div class="uk-card-header">
              <div class="uk-grid uk-grid-small uk-text-small" data-uk-grid>
                <div class="uk-width-expand">
                  <span class="cat-txt">Article</span>
                </div>
                <div class="uk-width-auto uk-text-right uk-text-muted">
                  <span data-uk-icon="icon:clock; ratio: 0.8"></span> 3 min.
                </div>
              </div>
            </div>
            <div class="uk-card-media">
              <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
                <img class="lazy" :data-src="article.imgPath" data-width="400" data-height="300"
                     data-uk-img alt="" :src="article.imgPath">
                <div class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-primary">
                  <span data-uk-icon="icon:heart; ratio: 0.8"></span> 12.345 <span
                  data-uk-icon="icon:comment; ratio: 0.8"></span> 12.345
                </div>
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
                  <a data-uk-tooltip="title: Drag this card" href="#" class="uk-icon-link drag-icon"
                     data-uk-icon="icon:move; ratio: 1"></a>
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

const articles = ref([])
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/articles')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    if (!json || !Array.isArray(json.data)) throw new Error('Réponse invalide')
    articles.value = json.data
  } catch (e) {
    error.value = e?.message || String(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
#site-head {
	padding: 10px 0;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 99;
	background-color: white;
	border-bottom: 1px solid rgba(0,0,0,0.06);
}
#site-foot {
	position: fixed;
	z-index: 3;
	bottom: 0;
	left: 0;
	right: 0;
	font-size: 0.8rem;
}
.uk-section-xsmall {
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
}
.uk-logo img {
	width: 50px;
}
.spacer {
	height: 60px;
}
.uk-card {
	border-top: 2px solid;
	position: relative;
	transition: box-shadow 0.15s ease-out;
	border-radius: 3px;
}
.uk-card:hover {
	box-shadow: 0 0 0 7px rgba(0,0,0,0.045);
}
.uk-card .uk-inline {
	z-index: 99;
}
.uk-card .uk-card-footer {
	padding: 0.55rem 1rem;
}
.uk-card .uk-card-header {
	padding: 0.55rem 1rem;
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
.uk-subnav li a {
	border-radius: 3px; 
}
.uk-subnav li.uk-active:nth-child(3) a {
	background-color:#8630F0;
}
.uk-subnav li.uk-active:nth-child(4) a {
	background-color:#F03A7F;
}
.uk-subnav li.uk-active:nth-child(5) a {
	background-color:#E84DF0;
}
.nature-card .uk-card .cat-txt {
	color: #1E87F0;
}
.music-card .uk-card {
	border-top-color: #8630F0;
}
.music-card .uk-card .cat-txt {
	color: #8630F0;
}
.design-card .uk-card {
	border-top-color: #E84DF0;
}
.design-card .uk-card .cat-txt {
	color: #E84DF0;
}
.photo-card .uk-card {
	border-top-color: #F03A7F;
}
.photo-card .uk-card .cat-txt {
	color: #F03A7F;
}
.uk-card .uk-overlay-primary {
	padding:  0.5rem;
	text-align: center;
	font-size: 0.7rem;
	text-transform: uppercase;
	opacity: 0.7;
}
img[data-src][src*='data:image'] { background: rgba(0,0,0,0.1); }
.search-fld {
	border-radius: 50px;
	padding: 0 1rem;
}
.uk-dropdown.drop-nav {
	border-radius: 4px;
	box-shadow: 0 2px 24px rgba(0,0,0,.1);
	width: 300px;
}
.uk-dropdown.drop-comments {
	width: 370px;
}
.drop-nav::after {
	bottom: 100%;
	right: 4%;
	border: solid transparent;
	content: '';
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-color: rgba(255, 255, 255, 0);
	border-bottom-color: #ffffff;
	border-width: 6px;
	margin-left: -6px;
}
.uk-dropdown.uk-dropdown-right-center::after {
	right: 100%;
	top: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-color: rgba(255, 255, 255, 0);
	border-right-color: #ffffff;
	border-width: 6px;
	margin-top: -6px;
}
.uk-dropdown.uk-dropdown-left-center::after {
	left: 100%;
	top: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-color: rgba(255, 255, 255, 0);
	border-left-color: #ffffff;
	border-width: 6px;
	margin-top: -6px;
}
.message {
	font-size: 0.85rem;
	display: block;
	line-height: 1.3rem;
	padding: 0.5rem 0;
}
.uk-notification-message {
	background-color: #1e87f0;
	color:  white;
	font-size: 0.9rem;
	border-radius: 3px;
	box-shadow: 0 4px 14px rgba(0,0,0,0.1);
}
</style>