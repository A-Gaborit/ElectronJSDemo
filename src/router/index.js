import { createRouter, createWebHashHistory } from 'vue-router';
import Login from "../views/Login.vue";
import ArticleList from "../views/Articles/ArticleList.vue";
import ArticleDetail from "../views/Articles/ArticleDetail.vue";
import ArticleForm from "../views/Articles/ArticleForm.vue";

const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/articles', name: 'ArticleList', component: ArticleList },
    { path: '/article/:id', name: 'ArticleDetail', component: ArticleDetail },
    { path: '/article/:id/edit', name: 'ArticleEdit', component: ArticleForm },
    { path: '/article/create', name: 'ArticleCreate', component: ArticleForm }
];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

export default router;