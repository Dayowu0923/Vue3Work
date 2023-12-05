import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/bootstrap.min.css";
import "./assets/css/atlantis.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_BASE_URL } from "./config.js";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
const app = createApp(App);
app.config.globalProperties.$apiBaseUrl = API_BASE_URL;
app
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(VueSweetalert2)
  .mount("#app");

store.dispatch("initializeStore");
