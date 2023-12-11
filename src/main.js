import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/bootstrap.min.css";
import "./assets/css/atlantis.css";
import "./assets/css/smartpaginator.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_BASE_URL } from "./config.js";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Paginate from "vuejs-paginate-next";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

const app = createApp(App);

app.config.globalProperties.$showConfirmationDialog = function (message) {
  return this.$swal.fire({
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  });
};
app.component("PaginateMo", Paginate);
app.component("v-select", vSelect);
app.config.globalProperties.$showAlertThen = function (
  message,
  icon,
  callback
) {
  this.$swal
    .fire({
      html: message,
      icon: icon,
      confirmButtonText: "確定",
      confirmButtonColor: "#3085d6",
    })
    .then(callback)
    .catch((error) => {
      console.log(error);
    });
};

app.config.globalProperties.$apiBaseUrl = API_BASE_URL;
app
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(VueSweetalert2)
  .mount("#app");

store.dispatch("initializeStore");
