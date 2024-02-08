import { createRouter, createWebHistory } from "vue-router";
import TodosView from "../views/TodosView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TodosView,
    },
  ],
});

export default router;
