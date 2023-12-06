import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import Cog1View from "../views/Cog1View.vue";
import store from "../store";
const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/cog1",
    name: "cog1",
    component: Cog1View,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  //看一下需不需要驗證，需要才判斷登錄狀態
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!chk_login()) {
      next({ name: "login" });
    } else {
      store.commit("SetRouteName", to.name);
      next();
    }
  } else {
    store.commit("SetRouteName", to.name);
    next();
  }
});
function chk_login() {
  let value = localStorage.getItem("token");
  if (value === "" || value === null || value === undefined) {
    return false;
  } else return true;
}
export default router;
