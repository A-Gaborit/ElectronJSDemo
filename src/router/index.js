import { createRouter, createWebHashHistory } from 'vue-router';
import PageOne from "../views/PageOne.vue";
import PageTwo from "../views/PageTwo.vue";
import Login from "../views/Login.vue";

const routes = [
    { path: '/', name: 'PageOne', component: PageOne },
    { path: '/page-2', name: 'PageTwo', component: PageTwo },
    { path: '/login', name: 'Login', component: Login }
];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

export default router;