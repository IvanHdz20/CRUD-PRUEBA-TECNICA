import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CrearProductoView from "../views/CrearProductoView.vue";
import EditarProductoView from "../views/EditarProductoView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/crear", name: "crear", component: CrearProductoView },
  { path: "/editar/:id", name: "editar", component: EditarProductoView, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
